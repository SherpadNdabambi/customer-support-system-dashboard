<?php

// start session
session_start();

// set database credentials
$db_hostname = "localhost";
$db_username = "mysql";
$db_password = "mysql";
$db_name = "customer_support_system";

// create connection to database
$sqlConnection = new mysqli($db_hostname, $db_username, $db_password, $db_name) or die("Failed to connect to database: $sqlConnection->connect_error");

// read from database
$query =
    'SELECT
    CONCAT(agent_first_name, " ", agent_last_name) AS agent,
    COUNT(DISTINCT MESSAGE.ticket_id) AS number_of_tickets
FROM
    AGENT,
    MESSAGE
WHERE
    AGENT.sender_id = MESSAGE.sender_id
GROUP BY MESSAGE.sender_id;';
$result = $sqlConnection->query($query) or die("Failed to read database: $sqlConnection->error");

while($row = $result->fetch_assoc()) {
    $ticketsPerAgent[] = $row;
}

echo json_encode($ticketsPerAgent);

// close connection to database
$sqlConnection->close();