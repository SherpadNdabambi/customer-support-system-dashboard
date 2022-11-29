<?php

// connect to database
require 'connectToDatabase.php';

// read from database
$query = 'SELECT COUNT(*) AS number_of_agents FROM AGENT;';
$result = $sqlConnection->query($query) or die("Failed to read database: $sqlConnection->error");
$agentCount = $result->fetch_assoc();

echo json_encode($agentCount);

// close connection to database
$sqlConnection->close();