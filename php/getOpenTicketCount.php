<?php

// connect to database
require 'connectToDatabase.php';

// read from database
$query = 'SELECT COUNT(*) AS number_of_tickets FROM TICKET WHERE ticket_status = "open";';
$result = $sqlConnection->query($query) or die("Failed to read database: $sqlConnection->error");
$ticketCount = $result->fetch_assoc();

echo json_encode($ticketCount);

// close connection to database
$sqlConnection->close();