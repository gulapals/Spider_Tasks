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
  		<li><a href="student.php">Home</a></li>
		<li><a class="active" ref="dashboard.php">Dashboard</a></li>
		<li><a href="logout.php">Logout</a></li>
		</ul>
	</div>
	</header>

<content>
<div id="content" style="padding-left: 16px">
<h2>Check out your notices.</h2>
</div>
<?php 
session_start();
include('style1.css');
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

$sql = 'SELECT * FROM notice';
		
$query = mysqli_query($conn, $sql);

if (!$query) {
	die ('SQL Error: ' . mysqli_error($conn));
}

echo "<table><thead><tr><th colspan='3'>Notifications</th></tr><tr><th>Subject</th><th>Notice</th><th>Date</th></thead>";
while($query2=mysqli_fetch_array($query))
{
echo "<tr><td>".$query2['subject']."</td>";
echo "<td>".$query2['note']."</td>";
echo "<td>".$query2['date']."</td>";
}
?>
</ol>
</table>
</content>
	
</body>
</html>