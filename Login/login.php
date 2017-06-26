<?php
session_start();
$servername = "localhost";  
$username = "root";  
$password = "";  
$dbname = "login"; 

// Connect to server
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 
      
      $username = mysqli_real_escape_string($conn,$_POST['username']);
      $password = mysqli_real_escape_string($conn,$_POST['password']); 
      $hash = md5($password);
      $sql = "SELECT * FROM test WHERE username = '$username' and password = '$hash'";
      $result = mysqli_query($conn, $sql);
      $row = mysqli_fetch_row($result);
      $role = $row[1];
      
      $count = mysqli_num_rows($result);
      
      // If result matched $myusername and $mypassword, table row must be 1 row
		
      if($count == TRUE) {
        $_SESSION['user'] = $username;
        $_SESSION['role'] = $role;
        
        if($role == "833222244"){
        	header("location: admin/admin.php");
    	}
    	else{
    		header("location:student/student.php");
    	}
      }
      else {
        echo "Your Login Name or Password is invalid";
      }
   }
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<link rel="stylesheet" href="style.css" type="text/css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Signika|Varela+Round">
	<title>Online Notice Board</title>
</head>
<body>
	<div id="login">
		<form name="login" method="post" action="login.php">
			<h2>Sign In</h2>
			<input type="text" name="username" id="username" placeholder="Enter Username"/>
			<input type="password" name="password" id="password" placeholder="Enter Password"/>
			<input type="submit" class="btn" value="Sign In"/>
			<input type="button" class="btn" value="Sign Up" onclick="window.location.href='view.php'" />
		</form> 
	</div>
</body>
</html>