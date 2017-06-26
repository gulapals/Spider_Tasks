<html>
<head>
	<meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  	<link rel="stylesheet" href="style.css" type="text/css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Signika|Varela+Round">
	<title>Sign Up</title>
</head>
<body>

<div id="login">
		<form action="" method="post" autocomplete="off">
			<h2>Sign Up</h2>
			<input type="number" name="rollnumber" id="rollnum" placeholder="Enter Your Roll Number" required="required"/>
			<input type="text" name="username" id="username" placeholder="Enter Username" required="required"/>
			<input type="password" name="pass" id="password" placeholder="Enter Password" required="required"/>
			<input type="submit" name="submit" class="btn" value="Register"/>
		</form>
	</div>
<div>
<?php
if(isset($_POST["submit"])){
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
extract($_POST);

$hash = md5($pass);
$sql = "INSERT INTO test (rollnumber, username, password)
VALUES ('".$_POST["rollnumber"]."','".$_POST["username"]."','$hash')";

if ($conn->query($sql) === TRUE) {
echo "<script type= 'text/javascript'>alert('New record created successfully');</script>";
} else {
echo "<script type= 'text/javascript'>alert('Error: " . $sql . "<br>" . $conn->error."');</script>";
}

$conn->close();
}
?>
</body>
</html>