$(document).ready(async function() {
    setFooterYear();
    const agentRatings = await getAgentRatings();
    const agentsPerTicket = await getAgentsPerTicket();
    const resolutionTimes = await getResolutionTime();
    const resolutionTimesPerMonth = await getResolutionTimePerMonth();
    const ticketsPerAgent = await getTicketsPerAgent();
    displayCharts(agentRatings, agentsPerTicket, resolutionTimes, resolutionTimesPerMonth, ticketsPerAgent);
});

function displayCharts(agentRatings, agentsPerTicket, resolutionTimes, resolutionTimesPerMonth, ticketsPerAgent) {
    displayAgentRatingsBoard(agentRatings);
    displayAgentsPerTicketChart(agentsPerTicket);
    displayResolutionTimeChart(resolutionTimes);
    displayResolutionTimePerMonthChart(resolutionTimesPerMonth);
    displayTicketsPerAgentChart(ticketsPerAgent);
}

function displayAgentRatingsBoard(agentRatings) {
    const agentRatingsChart = Highcharts.chart("agentRatingsBoard", {

        chart: {
            type: "column"
        },

        exporting: {
            fallbackToExportServer: false,
            libUrl: "js/vendor/"
        },

        series: [
            {
                name: "minimum",
                data: agentRatings.min_ratings
            },
            {
                name: "maximum",
                data: agentRatings.max_ratings
            },
            {
                name: "average",
                data: agentRatings.avg_ratings
            }
        ],

        title: {
            text: "Agent Ratings"
        },

        xAxis: {
            categories: agentRatings.agents
        },

        yAxis: {
            max: 5,
            tickInterval: 1,
            title: "Rating"
        }
    });
}

function displayAgentsPerTicketChart(agentsPerTicket) {
    const agentsPerTicketChart = Highcharts.chart("agentsPerTicketBoard", {

        chart: {
            type: "pie"
        },

        exporting: {
            fallbackToExportServer: false,
            libUrl: "js/vendor/"
        },

        legend: {
            align: "left",
            layout: "vertical",
            verticalAlign: "bottom",
            title: {
                text: "No. of Agents"
            }
        },

        plotOptions: {
            pie: {
                cursor: "pointer",
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
            }
        },

        series : [{
            minPointSize: 10,
            innerSize: "0",
            zMin: 0,
            name: "Number of Tickets",
            data: agentsPerTicket
        }],

        title: {
            text: "Number of Agents Involved in a Ticket"
        }
    });
}

function displayResolutionTimeChart(resolutionTimes) {
    $("#avgResolutionTime").empty();
    $("#maxResolutionTime").empty();
    $("#minResolutionTime").empty();
    $("#avgResolutionTime").append(round(parseFloat(resolutionTimes.avg_resolution_time)));
    $("#maxResolutionTime").append(round(parseFloat(resolutionTimes.max_resolution_time)));
    $("#minResolutionTime").append(round(parseFloat(resolutionTimes.min_resolution_time)));
}

function displayResolutionTimePerMonthChart(resolutionTimesPerMonth) {
    const resolutionTimePerMonthChart = Highcharts.chart("resolutionTimePerMonthBoard", {

        exporting: {
            fallbackToExportServer: false,
            libUrl: "js/vendor/"
        },

        series: [
            {
                name: "min",
                data: resolutionTimesPerMonth.min_resolution_times
            },
            {
                name: "avg",
                data: resolutionTimesPerMonth.avg_resolution_times
            },
            {
                name: "max",
                data: resolutionTimesPerMonth.max_resolution_times
            }
        ],

        title: {
            text: "Ticket Resolution Time Per Month"
        },

        xAxis: {
            categories: resolutionTimesPerMonth.month_names
        },

        yAxis: {
            title: {
                text: "Resolution Time<br>(in hours)"
            },
        }
    });
}

function displayTicketsPerAgentChart(ticketsPerAgent) {
    const ticketsPerAgentChart = Highcharts.chart("ticketsPerAgentBoard", {

        chart: {
            type: "column"
        },

        exporting: {
            fallbackToExportServer: false,
            libUrl: "js/vendor/"
        },

        legend: {
            enabled: false
        },

        series: [{
            name: "Number of Tickets",
            data: ticketsPerAgent.number_of_tickets
        }],

        title: {
            text: "Total Number of Tickets Per Agent"
        },

        xAxis: {
            categories: ticketsPerAgent.agents
        },

        yAxis: {
            title: {
                text: "No. of Tickets"
            }
        }
    });
}

function getAgentRatings() {
    return new Promise((resolve) => {
        $.get("php/getAgentRatings.php", (result) => {

            // declare local variables
            let agents = [],
                avg_ratings = [],
                max_ratings = [],
                min_ratings = [],
                agentRatings = JSON.parse(result);

            agentRatings.forEach((row) => {
                agents.push(row.agent);
                avg_ratings.push(parseFloat(row.avg_rating));
                max_ratings.push(parseFloat(row.max_rating));
                min_ratings.push(parseFloat(row.min_rating));
            });

            resolve({
                agents: agents,
                avg_ratings: avg_ratings,
                max_ratings: max_ratings,
                min_ratings: min_ratings
            });
        });
    });
}

function getAgentsPerTicket() {
    return new Promise((resolve) => {
        $.get("php/getAgentsPerTicket.php", (result) => {

            // declare local variables
            let agentsPerTicket = JSON.parse(result),
                output = [];

            agentsPerTicket.forEach((row) => {
                output.push({
                    name: row.number_of_agents,
                    y: parseFloat(row.number_of_tickets)
                });
            });
            resolve(output);
        });
    });
}

function getResolutionTime() {
    return new Promise((resolve) => {
        $.get("php/getResolutionTime.php", (result) => {
            resolve(JSON.parse(result));
        });
    });
}

function getResolutionTimePerMonth() {
    return new Promise((resolve) => {
        $.get("php/getResolutionTimePerMonth.php", (result) => {

            // declare local variables
            let avg_resolution_times = [],
                max_resolution_times = [],
                min_resolution_times = [],
                month_names = [],
                resolutionTimesPerMonth = JSON.parse(result);

            resolutionTimesPerMonth.forEach((row) => {
                avg_resolution_times.push(parseFloat(row.avg_resolution_time));
                max_resolution_times.push(parseFloat(row.max_resolution_time));
                min_resolution_times.push(parseFloat(row.min_resolution_time));
                month_names.push(row.month_name);
            });

            resolve({
                avg_resolution_times: avg_resolution_times,
                max_resolution_times: max_resolution_times,
                min_resolution_times: min_resolution_times,
                months: month_names
            });
        });
    });
}

function getTicketsPerAgent() {
    return new Promise((resolve) => {
        $.get("php/getTicketsPerAgent.php", (result) => {

            // declare local variables
            let agents = [],
                ticketsPerAgent = JSON.parse(result),
                number_of_tickets = [];

            ticketsPerAgent.forEach((row) => {
                agents.push(row.agent);
                number_of_tickets.push(parseInt(row.number_of_tickets));
            });

            resolve({
                agents: agents,
                number_of_tickets: number_of_tickets
            });
        });
    });
}

function round(number) {
    return ((number < 10) ? Math.round(number * 100) / 100 : Math.round(number * 10) / 10);
}

function setFooterYear() {
    let date = new Date(), year = date.getFullYear();
    $("#footerYear").text(year.toString());
}
