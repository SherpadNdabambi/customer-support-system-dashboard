<?php

// connect to database
require 'connectToDatabase.php';

// read from database
$query =
    'SELECT
		MIN(resolution_time) AS min_resolution_time,
		AVG(resolution_time) AS avg_resolution_time,
		MAX(resolution_time) AS max_resolution_time
	FROM
	(
		SELECT
			TIMESTAMPDIFF(SECOND, MIN(message_sent_time), MAX(message_sent_time)) / 3600 AS resolution_time
		FROM
			MESSAGE, TICKET
		WHERE
			MESSAGE.ticket_id = TICKET.ticket_id AND
			ticket_status = "resolved"
		GROUP BY MESSAGE.ticket_id
	) AS RESOLUTION_TIME_TABLE;';
$result = $sqlConnection->query($query) or die("Failed to read database: $sqlConnection->error");
$resolutionTimes = $result->fetch_assoc();

echo json_encode($resolutionTimes);

// close connection to database
$sqlConnection->close();