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

if (isset($_POST['submit'])) {
	$id = $_POST['user'];
	$sql = "UPDATE test SET rollnumber='833222244' WHERE id=$id";

if (mysqli_query($conn, $sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

}

$conn->close();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<link rel="stylesheet" href="style1.css" type="text/css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Signika|Varela+Round">
	<title>Teacher Dashboard</title>
</head>
<body>
	<header>
	<div class="topnav">
		<ul>
  		<li><a class="active" href="admin.php">Home</a></li>
		<li><a href="dashboard.php">Dashboard</a></li>
		<li><a href="display.php">Notices</a></li>
		<li><a href="logout.php">Logout</a></li>
		</ul>
	</div>
	</header>
<content>
<div id="content" style="padding-left: 16px">
  <h2>Hello Teacher!</h2>
  <p>Check your dashboard to add new notices.</p>
  <div id="update">
  <form method="post" action="" name="update">
  <input type="number" name="user" id="user" placeholder="Enter ID to Change to Admin" required/>
  <input type="submit" class="btn" name="submit" value="Update"/>
  </form>
  </div>
</div>
</content>
	
</body>
</html>