var count = 0;
var one = 0;
var two = 0;
var three = 0;

function refresh() {
	one = Math.floor((Math.random()*9)+1);
	two = Math.floor((Math.random()*9)+1);
	three = Math.floor((Math.random()*9)+1);
	
	document.getElementById("digitOne").innerHTML = one;
	document.getElementById("digitTwo").innerHTML = two;
	document.getElementById("digitThree").innerHTML = three;
	
	if (one == two && one == three && one != null) {
		window.alert("You Won! Rs. " + count);     
	}
	if (one != two && one != three && one != null) {
		window.alert("You Lost Rs. " + count);     
	}
	count = 0;
}

function countClicks() {
	count = count + 1;
	document.getElementById("p2").innerHTML = count;
}