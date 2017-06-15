var game = new Game();

function init() {
  game.init()
}

function checkReadyState() {
  if (game.gameOverAudio.readyState === 4 && game.backgroundAudio.readyState === 4) {
    window.clearInterval(game.checkAudio);
    game.start();
  }
}

var imageRepository = new function() {
  // Define images
  this.background = new Image();
  this.bow = new Image();
  this.arrow = new Image();
  this.enemy = new Image();

  // Ensure all images have loaded before starting the game
  var numImages = 4;
  var numLoaded = 0;
  function imageLoaded() {
    numLoaded++;
    if (numLoaded === numImages) {
      window.init();
    }
  }
  this.background.onload = function() {
    imageLoaded();
  }
  this.bow.onload = function() {
    imageLoaded();
  }
  this.arrow.onload = function() {
    imageLoaded();
  }
  this.enemy.onload = function() {
    imageLoaded();
  }  
  // Set images src
  this.background.src = "imgs/background.jpg";
  this.bow.src = "imgs/bowarrow.png";
  this.arrow.src = "imgs/arrow.png";
  this.enemy.src = "imgs/target.png";
}

function Drawable() {
  this.init = function(x, y, width, height) {
    // Defualt variables
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  this.speed = 0;
  this.canvasWidth = 0;
  this.canvasHeight = 0;
  
  this.draw = function() {
  };
  this.move = function() {
  };
}

  function Background() {
  this.draw = function() {
    this.context.drawImage(imageRepository.background, this.x, this.y);
  };
}
Background.prototype = new Drawable();

function Arrow() { 
  this.alive = false; 

  this.spawn = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.alive = true;
  };

 //Dirty Rectangle
 this.draw = function() {
    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.x += this.speed;
    if (this.isColliding) {
      return true;
    }
    else if (this.y <= 0 - this.height) {
      return true;
    }
    else {
      this.context.drawImage(imageRepository.arrow, this.x, this.y);
    }
  };
  
  this.clear = function() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.alive = false;
    this.isColliding = false;
  };
}
Arrow.prototype = new Drawable();

//Object Pooling
function Pool(maxSize) {
  var size = maxSize; 
  var pool = [];

  this.init = function(object) {
    if (object == "arrow") {
      for (var i = 0; i < size; i++) {
        var arrow = new Arrow("arrow");
        arrow.init(0,0, imageRepository.arrow.width, imageRepository.arrow.height);
        arrow.collidableWith = "enemy";
        arrow.type = "arrow";
        pool[i] = arrow;
      }
    }
    else if (object == "enemy") {
      for (var i = 0; i < size; i++) {
        var enemy = new Enemy();
        enemy.init(0,0, imageRepository.enemy.width, imageRepository.enemy.height);
        pool[i] = enemy;
      }
    }
  };
  this.getPool = function() {
    var obj = [];
    for (var i = 0; i < size; i++) {
      if (pool[i].alive) {
        obj.push(pool[i]);
        }
      }
    return obj;
  };

  this.get = function(x, y, speed) {
    if(!pool[size - 1].alive) {
      pool[size - 1].spawn(x, y, speed);
      pool.unshift(pool.pop());
    }
  };

  this.getTwo = function(x, y, speed) {
    if(!pool[size - 1].alive) {
        this.get(x, y, speed);
       }
  };

  this.animate = function() {
    for (var i = 0; i < size; i++) {
      if (pool[i].alive) {
        if (pool[i].draw()) {
          pool[i].clear();
          pool.push((pool.splice(i,1))[0]);
        }
      }
      else
        break;
    }
  };
}

function Enemy() {
  this.alive = false;
  this.collidableWith = "arrow";
  this.type = "enemy";

  this.spawn = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.speedX = 0;
    this.speedY = speed;
    this.alive = true;
    this.leftEdge = this.x - 90;
    this.rightEdge = this.x + 90;
    this.bottomEdge = this.y + 140;
  };
  
  this.draw = function() {
    this.context.clearRect(this.x-1, this.y, this.width+1, this.height);
    this.x = 1000;
    this.y += this.speedY/2*5;
    if (this.y <= 0) {
      this.speedY = this.speed;
    }
    else if (this.y >= 660) {
      this.speedY = -this.speed;
    }
    if (!this.isColliding) {
      this.context.drawImage(imageRepository.enemy, this.x, this.y);
      return false;
    }
    else {
      game.playerScore += 50;
      game.hit.get();
      return true;
    }
  };
  
  this.clear = function() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.alive = false;
    this.isColliding = false;
  };
}
Enemy.prototype = new Drawable();

function Bow() {
  this.speed = 5;
  this.arrowPool = new Pool(15);
  this.arrowPool.init("arrow");

  var fireRate = 15;
  var counter = 0;
  
  this.draw = function() {
    this.context.drawImage(imageRepository.bow, this.x, this.y);
  };
  this.move = function() {  
    counter++;
    if (KEY_STATUS.left || KEY_STATUS.right ||
      KEY_STATUS.down || KEY_STATUS.up) {

      this.context.clearRect(this.x, this.y, this.width, this.height);
      
      if (KEY_STATUS.left) {
        this.x -= this.speed
        if (this.x <= 0) // Keep player within the screen
          this.x = 0;
      } else if (KEY_STATUS.right) {
        this.x += this.speed
        if (this.x >= this.canvasWidth - this.width)
          this.x = this.canvasWidth - this.width;
      } else if (KEY_STATUS.up) {
        this.y -= this.speed
        if (this.y <=0)
          this.y =0;
      } else if (KEY_STATUS.down) {
        this.y += this.speed
        if (this.y >= this.canvasHeight - this.height)
          this.y = this.canvasHeight - this.height;
      }
    
      this.draw();
    }
    
    if (KEY_STATUS.space && counter >= fireRate) {
      this.fire();
      counter = 0;
    }
  };
  
  this.fire = function() {
    this.arrowPool.getTwo(this.x, this.y+25, 5);
    game.arrow.get();
  }; 
}
Bow.prototype = new Drawable();

    //Quad Tree - Spacial Partioning
    function QuadTree(boundBox, lvl) {
      var maxObjects = 10;
      this.bounds = boundBox || {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      var objects = [];
      this.nodes = [];
      var level = lvl || 0;
      var maxLevels = 5;
      /*
       * Clears the quadTree and all nodes of objects
       */
      this.clear = function() {
        objects = [];
        for (var i = 0; i < this.nodes.length; i++) {
          this.nodes[i].clear();
        }
        this.nodes = [];
      };
      /*
       * Get all objects in the quadTree
       */
      this.getAllObjects = function(returnedObjects) {
        for (var i = 0; i < this.nodes.length; i++) {
          this.nodes[i].getAllObjects(returnedObjects);
        }
        for (var i = 0, len = objects.length; i < len; i++) {
          returnedObjects.push(objects[i]);
        }
        return returnedObjects;
      };
      /*
       * Return all objects that the object could collide with
       */
      this.findObjects = function(returnedObjects, obj) {
        if (typeof obj === "undefined") {
          console.log("UNDEFINED OBJECT");
          return;
        }
        var index = this.getIndex(obj);
        if (index != -1 && this.nodes.length) {
          this.nodes[index].findObjects(returnedObjects, obj);
        }
        for (var i = 0, len = objects.length; i < len; i++) {
          returnedObjects.push(objects[i]);
        }
        return returnedObjects;
      };
      /*
       * Insert the object into the quadTree. If the tree
       * excedes the capacity, it will split and add all
       * objects to their corresponding nodes.
       */
      this.insert = function(obj) {
        if (typeof obj === "undefined") {
          return;
        }
        if (obj instanceof Array) {
          for (var i = 0, len = obj.length; i < len; i++) {
            this.insert(obj[i]);
          }
          return;
        }
        if (this.nodes.length) {
          var index = this.getIndex(obj);
          // Only add the object to a subnode if it can fit completely
          // within one
          if (index != -1) {
            this.nodes[index].insert(obj);
            return;
          }
        }
        objects.push(obj);
        // Prevent infinite splitting
        if (objects.length > maxObjects && level < maxLevels) {
          if (this.nodes[0] == null) {
            this.split();
          }
          var i = 0;
          while (i < objects.length) {
            var index = this.getIndex(objects[i]);
            if (index != -1) {
              this.nodes[index].insert((objects.splice(i,1))[0]);
            }
            else {
              i++;
            }
          }
        }
      };
      /*
       * Determine which node the object belongs to. -1 means
       * object cannot completely fit within a node and is part
       * of the current node
       */
      this.getIndex = function(obj) {
        var index = -1;
        var verticalMidpoint = this.bounds.x + this.bounds.width / 2;
        var horizontalMidpoint = this.bounds.y + this.bounds.height / 2;
        // Object can fit completely within the top quadrant
        var topQuadrant = (obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint);
        // Object can fit completely within the bottom quandrant
        var bottomQuadrant = (obj.y > horizontalMidpoint);
        // Object can fit completely within the left quadrants
        if (obj.x < verticalMidpoint &&
            obj.x + obj.width < verticalMidpoint) {
          if (topQuadrant) {
            index = 1;
          }
          else if (bottomQuadrant) {
            index = 2;
          }
        }
        // Object can fix completely within the right quandrants
        else if (obj.x > verticalMidpoint) {
          if (topQuadrant) {
            index = 0;
          }
          else if (bottomQuadrant) {
            index = 3;
          }
        }
        return index;
      };
      /*
       * Splits the node into 4 subnodes
       */
      this.split = function() {
        // Bitwise or [html5rocks]
        var subWidth = (this.bounds.width / 2) | 0;
        var subHeight = (this.bounds.height / 2) | 0;
        this.nodes[0] = new QuadTree({
          x: this.bounds.x + subWidth,
          y: this.bounds.y,
          width: subWidth,
          height: subHeight
        }, level+1);
        this.nodes[1] = new QuadTree({
          x: this.bounds.x,
          y: this.bounds.y,
          width: subWidth,
          height: subHeight
        }, level+1);
        this.nodes[2] = new QuadTree({
          x: this.bounds.x,
          y: this.bounds.y + subHeight,
          width: subWidth,
          height: subHeight
        }, level+1);
        this.nodes[3] = new QuadTree({
          x: this.bounds.x + subWidth,
          y: this.bounds.y + subHeight,
          width: subWidth,
          height: subHeight
        }, level+1);
      };
    }

//Collision
function Drawable() {
  this.init = function(x, y, width, height) {
    // Defualt variables
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  this.speed = 0;
  this.canvasWidth = 0;
  this.canvasHeight = 0;
  this.collidableWith = "";
  this.isColliding = false;
  this.type = "";
  // Define abstract function to be implemented in child objects
  this.draw = function() {
  };
  this.move = function() {
  };
  this.isCollidableWith = function(object) {
    return (this.collidableWith === object.type);
  };
}

function detectCollision() {
  var objects = [];
  game.quadTree.getAllObjects(objects);
  for (var x = 0, len = objects.length; x < len; x++) {
    game.quadTree.findObjects(obj = [], objects[x]);

    for (y = 0, length = obj.length; y < length; y++) {

      // DETECT COLLISION ALGORITHM
      if (objects[x].collidableWith === obj[y].type &&
        (objects[x].x < obj[y].x + obj[y].width &&
           objects[x].x + objects[x].width > obj[y].x &&
         objects[x].y < obj[y].y + obj[y].height &&
         objects[x].y + objects[x].height > obj[y].y)) {
        objects[x].isColliding = true;
        obj[y].isColliding = true;
      }
    }
  }
};

//Sound
function SoundPool(maxSize) {
  var size = maxSize; // Max sounds allowed in the pool
  var pool = [];
  this.pool = pool;
  var currSound = 0;
  /*
   * Populates the pool array with the given sound
   */
  this.init = function(object) {
    if (object == "arrow") {
      for (var i = 0; i < size; i++) {
        // Initalize the sound
        arrow = new Audio("sounds/arrow.wav");
        arrow.volume = .12;
        arrow.load();
        pool[i] = arrow;
      }
    }
    else if (object == "hit") {
      for (var i = 0; i < size; i++) {
        var hit = new Audio("sounds/hit.wav");
        hit.volume = .1;
        hit.load();
        pool[i] = hit;
      }
    }
  };
  /*
   * Plays a sound
   */
  this.get = function() {
    if(pool[currSound].currentTime == 0 || pool[currSound].ended) {
      pool[currSound].play();
    }
    currSound = (currSound + 1) % size;
  };
}

function Game() {
  
  this.init = function() {
    // Get the canvas elements
    this.bgCanvas = document.getElementById('background');
    this.bowCanvas = document.getElementById('bow');
    this.mainCanvas = document.getElementById('main');
    
    // Test to see if canvas is supported. 
    if (this.bgCanvas.getContext) {
      this.bgContext = this.bgCanvas.getContext('2d');
      this.bowContext = this.bowCanvas.getContext('2d');
      this.mainContext = this.mainCanvas.getContext('2d');
  
      Background.prototype.context = this.bgContext;
      Background.prototype.canvasWidth = this.bgCanvas.width;
      Background.prototype.canvasHeight = this.bgCanvas.height;
      
      Bow.prototype.context = this.bowContext;
      Bow.prototype.canvasWidth = this.bowCanvas.width;
      Bow.prototype.canvasHeight = this.bowCanvas.height;
      
      Arrow.prototype.context = this.mainContext;
      Arrow.prototype.canvasWidth = this.mainCanvas.width;
      Arrow.prototype.canvasHeight = this.mainCanvas.height;

      Enemy.prototype.context = this.mainContext;
      Enemy.prototype.canvasWidth = this.mainCanvas.width;
      Enemy.prototype.canvasHeight = this.mainCanvas.height;

      // Audio files
      this.arrow = new SoundPool(10);
      this.arrow.init("arrow");
      this.hit = new SoundPool(20);
      this.hit.init("hit");
      this.backgroundAudio = new Audio("sounds/background.wav");
      this.backgroundAudio.loop = true;
      this.backgroundAudio.volume = .25;
      this.backgroundAudio.load();
      this.gameOverAudio = new Audio("sounds/gameover.wav");
      this.gameOverAudio.loop = true;
      this.gameOverAudio.volume = .25;
      this.gameOverAudio.load();
      this.checkAudio = window.setInterval(function(){checkReadyState()},1000);
      
      // Initialize the background object
      this.background = new Background();
      this.background.init(0,0);
      this.backgroundAudio.play();
      
      // Initialize the ship object
      this.bow = new Bow();
      var bowStartX = this.bowCanvas.width/4*3 - imageRepository.bow.width*2;
      var bowStartY = this.bowCanvas.height/3 + imageRepository.bow.height;
      this.bow.init(bowStartX, bowStartY, imageRepository.bow.width,
                     imageRepository.bow.height);

      this.enemyPool = new Pool(2);
      this.enemyPool.init("enemy");
      this.spawnWave();

      // Start QuadTree
      this.quadTree = new QuadTree({x:0,y:0,width:1250,height:662});      

      this.playerScore = 0; 

      // Game over
  this.gameOver = function() {
    this.backgroundAudio.pause();
    document.getElementById('game-over').style.display = "block";
    this.gameOverAudio.currentTime = 0;
    this.gameOverAudio.play();
  };
// Restart the game
  this.restart = function() {
    this.gameOverAudio.pause();
    document.getElementById('game-over').style.display = "none";
    this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
    this.bowContext.clearRect(0, 0, this.bowCanvas.width, this.bowCanvas.height);
    this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    this.quadTree.clear();
    this.background.init(0,0);
    this.bow.init(bowStartX, bowStartY, imageRepository.bow.width,
                     imageRepository.bow.height);
    this.enemyPool.init("enemy");
    this.spawnWave();
    this.playerScore = 0;
    this.backgroundAudio.currentTime = 0;
    this.backgroundAudio.play();
    this.start();
  };
    }
  };

this.spawnWave = function(){  
  var height = imageRepository.enemy.height;
  var width = imageRepository.enemy.width;
  var x = 100;
  var y = -height;
  var spacer = y * 1.5;
  for (var i = 1; i <= 18; i++) {
    this.enemyPool.get(x,y,2);
    y += height + 25;
      if (i % 6 == 0) {
        x = 100;
        y += spacer
      }
    }
  } 
  
  // Start the animation loop
  this.start = function() {
    this.bow.draw();
    animate();
  };
}

function animate() {
  game.quadTree.clear();
  game.quadTree.insert(game.bow);
  game.quadTree.insert(game.bow.arrowPool.getPool());
  game.quadTree.insert(game.enemyPool.getPool());
  detectCollision();

  document.getElementById('score').innerHTML = game.playerScore;

  if (game.enemyPool.getPool().length === 0) {
    game.gameOver();
  }

  requestAnimFrame( animate );
  game.background.draw();
  game.bow.move();
  game.bow.arrowPool.animate(); 
  game.enemyPool.animate();
}

KEY_CODES = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
}

KEY_STATUS = {};
for (code in KEY_CODES) {
  KEY_STATUS[KEY_CODES[code]] = false;
}

document.onkeydown = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
  e.preventDefault();
  KEY_STATUS[KEY_CODES[keyCode]] = true;
  }
}

document.onkeyup = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame    || 
      window.oRequestAnimationFrame      || 
      window.msRequestAnimationFrame     || 
      function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60);
      };
})(); 