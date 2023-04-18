# Customer Support System Dashboard #

This project uses SQL, PHP, HTML, and JavaScript to generate reports from mock customer support data.

The Customer Support System is a customer service platform allowing customers to communicate with customer support agents to resolve customer issues.

To report an issue, a customer opens a ticket, selecting a category (Account access/Bug report/Order cancellation/Overcharged transaction/Undelivered goods/Wrong order), and leaves a message explaining the issue.

To address the issue, a customer support agent sends a message on the ticket, which the customer may reply to.

The customer and the agent exchange messages until the issue is resolved and the agent marks the ticket as resolved.

Multiple agents may be involved in the resolution of a ticket.

## Table of Contents ##

<details>

<summary>Contents</summary>

- [Entity Relationship Diagram](#entity-relationship-diagram)
- [Data Dictionary](#data-dictionary)
- [Filling the Database](#filling-the-database)
- [Reports](#reports)

</details>

## Entity Relationship Diagram ##

![Customer Support System Entity Relationship Diagram](img/Customer%20Support%20System%20ERD.jpg)

## Data Dictionary ##

### 1. TICKET Table ###

A ticket is a record of an issue reported by a customer.

#### TICKET Table Columns ####

##### 1.1. ticket_id #####

<h6>Description:</h6> An automatically generated unique identifier for each ticket.

<h6>Type:</h6> Numeric/integer.

<h6>Note:</h6> This is the primary key.

##### 1.2. customer_id #####

<h6>Description:</h6> A foreign key linking the CUSTOMER table to identify the customer who opened the ticket.

##### 1.3. ticket_category #####

<h6>Description:</h6> Describes the type of issue reported by the customer.

<h6>Type:</h6> Text containing alphabetic letters

**Possible values:** Account access/Bug report/Order cancellation/Overcharged transaction/Undelivered goods/Wrong order

##### 1.4. ticket_rating #####

<h6>Description:</h6> A numerical representation of the customer's satisfaction with the customer service during the resolution of the ticket.

<h6>Type:</h6> Numeric/integer.

**Possible values:** 1/2/3/4/5

##### 1.5. ticket_status #####

<h6>Description:</h6> Whether or not the ticket has been resolved.

<h6>Type:</h6> Text containing alphabetic letters.

**Possible values:** open/resolved

### 2. MESSAGE Table ###

A message is a communication sent by a customer or agent under a ticket.

####  Table Columns ####

##### 2.1. message_id #####

<h6>Description:</h6> An automatically generated unique identifier for each message.

<h6>Type:</h6> Numeric/integer.

<h6>Note:</h6> This is the primary key.

##### 2.2. sender_id #####

<h6>Description:</h6> A foreign key linking the SENDER table to identify the sender of the message.

##### 2.3. message_sent_time #####

<h6>Description:</h6> A timestamp generated when a sender (a customer/agent) sends a message.

<h6>Type:</h6> Date and time.

##### 2.4. message_text #####

<h6>Description:</h6> The actual text contents of the message.

<h6>Type:</h6> Text containing alphanumeric and symbolic characters.

### 3. CUSTOMER Table ###

A customer is a user of the Customer Support System who opens a help ticket to request assistance.

#### CUSTOMER Table Columns ####

##### 3.1. customer_id #####

<h6>Description:</h6> An automatically generated unique identifier for each customer.

<h6>Type:</h6> Numeric/integer

<h6>Note:</h6> This is the primary key.

##### 3.2. sender_id #####

<h6>Description:</h6> A foreign key linking the SENDER table to identify the customer when they send a message.

##### 3.3. customer_email_address #####

<h6>Description:</h6> The customer's email address.

<h6>Type:</h6> Text containing alphanumeric and symbolic characters.

##### 3.4. customer_first_name #####

<h6>Description:</h6> The customer's first name.

<h6>Type:</h6> Text containing alphabetic characters.

##### 3.5. customer_last_name #####

<h6>Description:</h6> The customer's last name.

<h6>Type:</h6> Text containing alphabetic characters.

##### 3.6. customer_phone_no #####

<h6>Description:</h6> The customer's phone number.

<h6>Type:</h6> Numeric/integer.

### 4. AGENT Table ###

A agent is a customer support represantative who acts on a help ticket by replying to the customer's messages and marking the ticket as resolved once the issue has been resolved.

#### AGENT Table Columns ####

##### 4.1. agent_id #####

<h6>Description:</h6> An automatically generated unique identifier for each agent.

<h6>Type:</h6> Numeric/integer

<h6>Note:</h6> This is the primary key.

##### 4.2. sender_id #####

<h6>Description:</h6> A foreign key linking the SENDER table to identify the agent when they send a message.

##### 4.3. agent_email_address #####

<h6>Description:</h6> The agent's email address.

<h6>Type:</h6> Text containing alphanumeric and symbolic characters.

##### 4.4. agent_first_name #####

<h6>Description:</h6> The agent's first name.

<h6>Type:</h6> Text containing alphabetic characters.

##### 4.5. agent_last_name #####

<h6>Description:</h6> The agent's last name.

<h6>Type:</h6> Text containing alphabetic characters.

##### 4.6. agent_phone_no #####

<h6>Description:</h6> The agent's phone number.

<h6>Type:</h6> Numeric/integer.

### 5. SENDER Table ###

An sender is a customer or agent who sends a message.

#### SENDER Table Columns ####

##### 5.1. sender_id #####

<h6>Description:</h6> An automatically generated unique identifier for each sender.

<h6>Type:</h6> Numeric/integer.

<h6>Note:</h6> This is the primary key.

##### 5.2. sender_type #####

<h6>Description:</h6> Whether the sender is a customer or an agent.

<h6>Type:</h6> Text containing alphabetic characters.

<h6>Possible values:</h6> agent/customer

## Filling the Database ##

I used [Mockaroo](https://www.mockaroo.com/) to generate mock data for the database. I then used [Random Sentence Generator](https://www.thewordfinder.com/random-sentence-generator/) to generate text content for the messages between customers and agents. The mock dataset contains records for:

- 34 agents.
- 123 customers.
- 377 tickets.
- 6341 messages.

## Reports ##

The following reports may be generated from our database.

### 1. Ticket Resolution Time ###

With the customer support data in our database, we can track how long it takes for a ticket to be resolved. We calculate the ticket resolution time by subtracting the timestamp of the first message from that of the last message on a resolved ticket. We use the following SQL query to calculate the minimum, average, and maximum ticket resolution times:

```sql
SELECT
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
) AS RESOLUTION_TIME_TABLE;
```

The results may be displayed on a dashboard like this:

![Ticket Resolution Time Dashboard](img/Ticket%20Resolution%20Time%20Chart.jpg)

### 2. Number of Agents Involved in a Ticket ###

Suppose that in the resolution of a ticket, more than one agent may become involved. We may wish to find out how often this occurs. We do so with the following SQL query:

```sql
SELECT
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
GROUP BY number_of_agents;
```

The results may be presented in the form of a pie chart like this:

![Number of Agents Involved in a Ticket Chart](img/Agents%20Per%20Ticket%20Chart.jpeg)

### 3. Total Number of Tickets Per Agent ###

We may write the following SQL query to show us how many resolved tickets each agent was involved in:

```sql
SELECT
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
GROUP BY MESSAGE.sender_id;
```

We may display the results in a bar graph like this:

![Total Number of Customers Per Agent Chart](img/Number%20of%20Customers%20Per%20Agent%20Chart.jpeg)

### 4. Ticket Resolution Time Per Month ###

If we wish to measure our perfomance over time by tracking how our ticket resolution time decreases or increases each month, we may write the following SQL query:

```sql
SELECT
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
GROUP BY month_number;
```

Below is the resulting graph:

![Ticket Resolution Time Per Month](img/Ticket%20Resolution%20Time%20Per%20Month%20Chart.jpeg)

### 5. Agent Ratings ###

A customer may rate the quality of the customer service they recieve during the resolution of a ticket. The rating is a number between 1 and 5. The following SQL query allows us to see the ratings recieved by each agent from customers:

```sql
SELECT
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
	MESSAGE.ticket_id = TICKET.ticket_id
GROUP BY MESSAGE.sender_id;
```

We may display the results like this:

![Agent Ratings Chart](img/Agent%20Ratings%20Chart.jpeg)

<small>This project is based on the guide "[Tracking Customer Service Metrics with SQL](https://mode.com/blog/tracking-customer-service-metrics/)."</small>