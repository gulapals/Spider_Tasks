<?php
if(isset($_POST["add"])){
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO notice (subject, note) VALUES ('".$_POST["sub"]."','".$_POST["note"]."')";

if ($conn->query($sql) === TRUE) {
echo "<script type= 'text/javascript'>alert('Note Added Successfully!');</script>";
} else {
echo "<script type= 'text/javascript'>alert('Error: " . $sql . "<br>" . $conn->error."');</script>";
}

$conn->close();
}
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
  		<li><a href="admin.php">Home</a></li>
		<li><a class="active" href="dashboard.php">Dashboard</a></li>
		<li><a href="display.php">Notices</a></li>
		<li><a href="logout.php">Logout</a></li>
		</ul>
	</div>
	</header>
<content>
<div class="notice">
	<form name="add" method="post" action="dashboard.php">
		<h2>Add Notes Here</h2>
		<input type="text" name="sub" id="sub" placeholder="Add Subject" required/>
		<input type="text" name="note" id="note" placeholder="Add a New Note" required/>
		<input type="submit" name="add" class="btn" value="Click Here to Add"/>
		<input type="reset" class="btn" value="Click Here to Reset"/>
	</form> 
</div>
</content>
	
</body>
</html>