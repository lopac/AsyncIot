/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/highcharts/highcharts.d.ts" />

interface ISeries<T> {
    name: string;
    data: Array<T>;
}

class Series implements ISeries<number> {
    name: string;
    data: number[];
}

class LineChart {
    grapChart: JQuery;

    constructor(labels: Array<string>, series: Array<ISeries<any>>) {

        this.grapChart = $("#graphChart");

        Highcharts.chart({
            chart: {
                renderTo: this.grapChart[0]
            },
            title: {
                text: "Sensors",
                x: -20
            },
            subtitle: {
                text: "24.06.2016.",
                x: -20
            },
            xAxis: {
                categories: labels
            },
            yAxis: {

                title: {
                    text: "Sensor value"
                },
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: "#808080"
                    }
                ]
            },
            tooltip: {
                valueSuffix: ""
            },
            legend: {
                layout: "horizontal",
                align: "right",
                verticalAlign: "middle",
                borderWidth: 0
            },
            series: series

        });

        $(".highcharts-container").children("svg").children("text:last").hide();
        $(".highcharts-button").hide();

    }
}

function onBoxHover(eId, id: string): void {

    /*.widget li:hover + .val{ 
    background: #3a5d96;
    color: white;
}*/

    console.log(eId);
    if (id === "in") {
        $(eId).css("background", "#3a5d96").css("color", "white");
        $(eId).children().css("background", "#3a5d96").css("color", "white");

    } else {
        $(eId).css("background", "white").css("color", "black");
        $(eId).children().css("background", "white").css("color", "black");
    }
}

window.onload = () => {

    $.ajax({
        type: "GET",
        url: "../api/Snaps/today"
        //contentType: "application/json"
    }).done((result) => {

        console.log(result);

        });

    let ba = new Array<ISeries<number>>();

    let i : ISeries<number> = new Series();

    i.name = "Inside";
    i.data = [22.3, 25.6, 26.4, 30.6];

    ba.push(i);

    let chart = new LineChart(["8:00", "8:00", "8:00", "8:00", "8:00", "8:00"],ba);

    var body = document.body;
    setTimeout(() => {
        body.classList.add("active");
    }, 200);

    $(".refresh")
        .click(() => {
            body.classList.remove("active");
            setTimeout(() => {
                body.classList.add("active");
            }, 1500);
        });



};