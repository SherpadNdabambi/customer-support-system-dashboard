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
            let agentRatings,
                agents = [],
                avg_ratings = [],
                max_ratings = [],
                min_ratings = [];
            try {
                agentRatings = JSON.parse(result);
            }
            catch(error) {
                console.log(error);
                agentRatings = [
                    {
                        agent: "Nick Fury",
                        min_rating: 3,
                        avg_rating: 4.341463414634147,
                        max_rating: 5
                    },
                    {
                        agent: "Natasha Romanoff",
                        min_rating: 3,
                        avg_rating: 4.351851851851852,
                        max_rating: 5
                    },
                    {
                        agent: "Melinda May",
                        min_rating: 3,
                        avg_rating: 4.402985074626866,
                        max_rating: 5
                    },
                    {
                        agent: "Leo Fitz",
                        min_rating: 1,
                        avg_rating: 4.133333333333334,
                        max_rating: 5
                    },
                    {
                        agent: "Jemma Simmons",
                        min_rating: 2,
                        avg_rating: 3.842857142857143,
                        max_rating: 5
                    },
                    {
                        agent: "Daisy Johnson",
                        min_rating: 3,
                        avg_rating: 4.148351648351649,
                        max_rating: 5
                    },
                    {
                        agent: 'Antoinne "Trip" Triplett',
                        min_rating: 3,
                        avg_rating: 4,
                        max_rating: 5
                    },
                    {
                        agent: "Lance Hunter",
                        min_rating: 3,
                        avg_rating: 4.264285714285714,
                        max_rating: 5
                    },
                    {
                        agent: "Lincoln Campbell",
                        min_rating: 3,
                        avg_rating: 4.244186046511628,
                        max_rating: 5
                    },
                    {
                        agent: 'Elena "Yo-Yo" Rodriguez',
                        min_rating: 3,
                        avg_rating: 4.383561643835616,
                        max_rating: 5
                    }
                ];
            }

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
            let agentsPerTicket,
                output = [];

            try {
                agentsPerTicket = JSON.parse(result);
            }
            catch(error) {
                console.log(error);
                agentsPerTicket = [
                    {
                        number_of_agents: 1,
                        number_of_tickets: 107
                    },
                    {
                        number_of_agents: 2,
                        number_of_tickets: 74
                    }, 
                    {
                        number_of_agents: 3,
                        number_of_tickets: 196
                    }
                ];
            }

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
            try {
                resolve(JSON.parse(result));
            }
            catch(error) {
                console.log(error);
                resolve({
                    avg_resolution_time: 238.06969045,
                    max_resolution_time: 620.8939,
                    min_resolution_time: 1.9275
                });
            }
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
                resolutionTimesPerMonth;

            try {
                resolutionTimesPerMonth = JSON.parse(result);
            }
            catch(error) {
                console.log(error);
                resolutionTimesPerMonth = [
                    {
                        avg_resolution_time: 187.05890000,
                        max_resolution_time: 490.1572,
                        min_resolution_time: 32.5833,
                        month_name: "Jan"
                    },
                    {
                        avg_resolution_time: 243.75820000,
                        max_resolution_time: 575.6756,
                        min_resolution_time: 2.8372,
                        month_name: "Feb"
                    },
                    {
                        avg_resolution_time: 208.15490000,
                        max_resolution_time: 539.4922,
                        min_resolution_time: 1.9275,
                        month_name: "Mar"
                    },
                    {
                        avg_resolution_time: 277.65732308,
                        max_resolution_time: 538.0008,
                        min_resolution_time: 6.0742,
                        month_name: "Apr"
                    },
                    {
                        avg_resolution_time: 187.54847027,
                        max_resolution_time: 453.8578,
                        min_resolution_time: 18.4197,
                        month_name: "May"
                    },
                    {
                        avg_resolution_time: 279.48512619,
                        max_resolution_time: 585.0625,
                        min_resolution_time: 23.8600,
                        month_name: "Jun"
                    },
                    {
                        avg_resolution_time: 214.57615854,
                        max_resolution_time: 620.8939,
                        min_resolution_time: 15.3358,
                        month_name: "Jul"
                    },
                    {
                        avg_resolution_time: 282.42937083,
                        max_resolution_time: 595.4883,
                        min_resolution_time: 6.1817,
                        month_name: "Aug"
                    },
                    {
                        avg_resolution_time: 234.12002800,
                        max_resolution_time: 538.6525,
                        min_resolution_time: 20.4778,
                        month_name: "Sep"
                    },
                    {
                        avg_resolution_time: 302.08278333,
                        max_resolution_time: 572.1792,
                        min_resolution_time: 128.8636,
                        month_name: "Oct"
                    }
                ];
            }

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
                ticketsPerAgent,
                number_of_tickets = [];

            try {
                ticketsPerAgent = JSON.parse(result);
            }
            catch(error) {
                console.log(error);
                ticketsPerAgent = [
                    {
                        agent: 'Peggy Carter',
                        number_of_tickets: 24
                    },
                    {
                        agent: 'Howard Stark',
                        number_of_tickets: 27
                    },
                    {
                        agent: 'Daniel Sousa',
                        number_of_tickets: 26
                    },
                    {
                        agent: 'Hank Pym',
                        number_of_tickets: 20
                    },
                    {
                        agent: 'Janet Van Dyne',
                        number_of_tickets: 20
                    },
                    {
                        agent: 'Nick Fury',
                        number_of_tickets: 19
                    },
                    {
                        agent: 'Clint Barton',
                        number_of_tickets: 24
                    },
                    {
                        agent: 'Natasha Romanoff',
                        number_of_tickets: 31
                    },
                    {
                        agent: 'Phil Coulson',
                        number_of_tickets: 30
                    },
                    {
                        agent: 'Melinda May',
                        number_of_tickets: 26
                    },
                    {
                        agent: 'Leo Fitz',
                        number_of_tickets: 11
                    },
                    {
                        agent: 'Jemma Simmons',
                        number_of_tickets: 29
                    },
                    {
                        agent: 'Grant Ward',
                        number_of_tickets: 28
                    },
                    {
                        agent: 'Daisy Johnson',
                        number_of_tickets: 30
                    },
                    {
                        agent: 'Maria Hill',
                        number_of_tickets: 30
                    },
                    {
                        agent: 'John Garett',
                        number_of_tickets: 27
                    },
                    {
                        agent: 'Victoria Hand',
                        number_of_tickets: 18
                    },
                    {
                        agent: 'Eric Koenig',
                        number_of_tickets: 30
                    },
                    {
                        agent: 'Mike Peterson',
                        number_of_tickets: 23
                    },
                    {
                        agent: 'Antoinne "Trip" Triplett',
                        number_of_tickets: 18
                    },
                    {
                        agent: 'Alphonso "Mack" Mackenzie',
                        number_of_tickets: 28
                    },
                    {
                        agent: 'Lance Hunter',
                        number_of_tickets: 35
                    },
                    {
                        agent: 'Bobbi Morse',
                        number_of_tickets: 32
                    },
                    {
                        agent: 'Lincoln Campbell',
                        number_of_tickets: 27
                    },
                    {
                        agent: 'Holden Radcliffe',
                        number_of_tickets: 30
                    },
                    {
                        agent: 'Elena "Yo-Yo" Rodriguez',
                        number_of_tickets: 18
                    },
                    {
                        agent: 'Deke Shaw',
                        number_of_tickets: 21
                    },
                    {
                        agent: 'Jefferey Mace',
                        number_of_tickets: 32
                    },
                    {
                        agent: 'Billy Koenig',
                        number_of_tickets: 17
                    },
                    {
                        agent: 'Sam Koenig',
                        number_of_tickets: 23
                    },
                    {
                        agent: 'LT Koenig',
                        number_of_tickets: 17
                    },
                    {
                        agent: 'Thurston Koenig',
                        number_of_tickets: 25
                    },
                    {
                        agent: 'Ernest Hazard Koenig',
                        number_of_tickets: 20
                    },
                    {
                        agent: 'Arnim Zola',
                        number_of_tickets: 27
                    }
                ];
            }
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
