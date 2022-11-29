<?php

// connect to database
require 'connectToDatabase.php';

// read from database
$query = 'SELECT COUNT(*) AS number_of_customers FROM CUSTOMER;';
$result = $sqlConnection->query($query) or die("Failed to read database: $sqlConnection->error");
$customerCount = $result->fetch_assoc();

echo json_encode($customerCount);

// close connection to database
$sqlConnection->close();