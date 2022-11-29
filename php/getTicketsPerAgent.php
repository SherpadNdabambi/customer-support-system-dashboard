<?php

// connect to database
require 'connectToDatabase.php';

// read from database
$query =
    'SELECT
        CONCAT(agent_first_name, " ", agent_last_name) AS agent,
        COUNT(DISTINCT MESSAGE.ticket_id) AS number_of_tickets
    FROM
        AGENT,
        MESSAGE,
        TICKET
    WHERE
        AGENT.sender_id = MESSAGE.sender_id AND
        MESSAGE.ticket_id = TICKET.ticket_id AND
        ticket_status = "resolved"
    GROUP BY MESSAGE.sender_id;';
$result = $sqlConnection->query($query) or die("Failed to read database: $sqlConnection->error");

while($row = $result->fetch_assoc()) {
    $ticketsPerAgent[] = $row;
}

echo json_encode($ticketsPerAgent);

// close connection to database
$sqlConnection->close();