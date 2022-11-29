<?php

// connect to database
require 'connectToDatabase.php';

// read from database
$query =
    'SELECT
        month_name,
        MIN(resolution_time) AS min_resolution_time,
        AVG(resolution_time) AS avg_resolution_time,
        MAX(resolution_time) AS max_resolution_time
    FROM
        (
            SELECT
                TIMESTAMPDIFF(SECOND, MIN(message_sent_time), MAX(message_sent_time)) / 3600 AS resolution_time,
                MONTH(MIN(message_sent_time)) AS month_number,
                DATE_FORMAT(MIN(message_sent_time), "%b") AS month_name
            FROM
                MESSAGE, TICKET
            WHERE
                MESSAGE.ticket_id = TICKET.ticket_id AND
                ticket_status = "resolved"
            GROUP BY MESSAGE.ticket_id
        ) AS RESOLUTION_TIME_TABLE
    GROUP BY month_number;';
$result = $sqlConnection->query($query) or die("Failed to read database: $sqlConnection->error");

while($row = $result->fetch_assoc()) {
    $resolutionTimesPerMonth[] = $row;
}

echo json_encode($resolutionTimesPerMonth);

// close connection to database
$sqlConnection->close();