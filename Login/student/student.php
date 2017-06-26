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
$user= $_SESSION['user'];
$sql="SELECT * from test where username = '$user'";
$result = mysqli_query($conn, $sql);
$users=mysqli_fetch_assoc($result);
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<link rel="stylesheet" href="style1.css" type="text/css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Signika|Varela+Round">
	<title>Student Dashboard</title>
</head>
<body>
	<header>
	<div class="topnav">
		<ul>
  		<li><a class="active" href="student.php">Home</a></li>
		<li><a href="dashboard.php">Dashboard</a></li>
		<li><a href="logout.php">Logout</a></li>
		</ul>
	</div>
	</header>
<content>
<div id="content" style="padding-left: 16px">
  <h2>Hello <?php echo $users['rollnumber'];?></h2>
  <p style="font-size: 18px;">Your ID: <?php echo $users['id'];	?></br>Check your dashboard for new notices.</p>
</div>
</content>
	
</body>
</html>