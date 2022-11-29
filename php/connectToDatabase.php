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