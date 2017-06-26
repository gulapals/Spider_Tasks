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
		<li><a href="dashboard.php">Dashboard</a></li>
		<li><a class="active" href="display.php">Notices</a></li>
		<li><a href="logout.php">Logout</a></li>
		</ul>
	</div>
	</header>

<content>
<div id="content" style="padding-left: 16px">
  <h2>Hello Teacher!</h2>
  <p>You can view and delete the notices here.</p>
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

echo "<table><thead><tr><th colspan='4'>Notifications</th></tr><tr><th>Subject</th><th>Notice</th><th colspan='2'>Date</th></thead>";
while($query2=mysqli_fetch_array($query))
{
echo "<tr><td>".$query2['subject']."</td>";
echo "<td>".$query2['note']."</td>";
echo "<td>".$query2['date']."</td>";
echo "<td><a href='delete.php?id=".$query2['id']."'>Delete</a></td></tr>";
}
?>
</ol>
</table>
</content>
	
</body>
</html>