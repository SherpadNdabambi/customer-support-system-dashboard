<?php

// connect to database
require 'connectToDatabase.php';

// read from database
$query =
    'SELECT
    	number_of_agents,
	    COUNT(number_of_agents) AS number_of_tickets
    FROM
        (
            SELECT
                COUNT(DISTINCT MESSAGE.sender_id) AS number_of_agents
            FROM
                MESSAGE,
                SENDER,
                TICKET
            WHERE
                MESSAGE.sender_id = SENDER.sender_id AND
                sender_type = "agent" AND
                MESSAGE.ticket_id = TICKET.ticket_id AND
                ticket_status = "resolved"
            GROUP BY MESSAGE.ticket_id
        ) AS AGENT_COUNT_TABLE
    GROUP BY number_of_agents;';
$result = $sqlConnection->query($query) or die("Failed to read database: $sqlConnection->error");

while($row = $result->fetch_assoc()) {
    $agentsPerTicket[] = $row;
}

echo json_encode($agentsPerTicket);

// close connection to database
$sqlConnection->close();