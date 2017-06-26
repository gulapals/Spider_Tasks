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
if(isset($_GET['id']))
{
$id=$_GET['id'];
$query=mysqli_query($conn, "DELETE from notice where id='$id'");
if($query)
{
header('location:display.php');
}
}
?>