<?php

// connect to database
require 'connectToDatabase.php';

// read from database
$query =
    'SELECT
        CONCAT(agent_first_name, " ", agent_last_name) AS agent,
        MIN(ticket_rating) AS min_rating,
        AVG(ticket_rating) AS avg_rating,
        MAX(ticket_rating) AS max_rating
    FROM
        AGENT,
        MESSAGE,
        TICKET
    WHERE
        AGENT.sender_id = MESSAGE.sender_id AND
        MESSAGE.ticket_id = TICKET.ticket_id AND
        (agent_id IN (6, 8, 10, 11, 12, 14, 20, 22, 24, 26))
    GROUP BY MESSAGE.sender_id;';
$result = $sqlConnection->query($query) or die("Failed to read database: $sqlConnection->error");

while($row = $result->fetch_assoc()) {
    $ratings[] = $row;
}

echo json_encode($ratings);

// close connection to database
$sqlConnection->close();