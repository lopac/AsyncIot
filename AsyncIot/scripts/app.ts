﻿/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
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



// ReSharper disable InconsistentNaming
class Sensor {
    Inside: number;
    Outside: number;
    Humidity: number;
    Lux: number;
    Smoke: number;
}

class HomeViewModel {
    Time: string;
    Sensor: Sensor;
    OutsideMin: number;
    OutsideMax: number;
    OutsideMinTime: string;
    OutsideMaxTime: string;
}

// ReSharper restore InconsistentNaming

class WebApi {

    time: JQuery;

    inside: JQuery;
    outside: JQuery;
    humidity: JQuery;
    lux: JQuery;
    //todo smoke : JQuery;

    outsideMin: JQuery;
    outsideMax: JQuery;
    outsideMinTime: JQuery;
    outsideMaxTime: JQuery;


    constructor() {
        this.time = $("#time");
        this.outside = $("#out-temp");
        this.inside = $("#in-temp");
        this.humidity = $("#humidity");
        this.lux = $("#lux");

        this.outsideMin = $("#out-min");
        this.outsideMinTime = $("#out-min-time");

        this.outsideMax = $("#out-max");
        this.outsideMaxTime = $("#out-max-time");
    }

    private emptyDivs() {
        this.outside.empty();
        this.inside.empty();
        this.humidity.empty();
        this.lux.empty();
        this.outsideMin.empty();
        this.outsideMax.empty();
    }

    refreshData() {
        $.ajax({
            type: "GET",
            url: "../api/Sensor",
            contentType: "application/json"
        }).done((model: HomeViewModel) => {

            this.time.html(() => `TIME: ${model.Time} h`);

            this.emptyDivs();

          

            this.outside.append(`${model.Sensor.Outside}<small><sup>°</sup>C</small>`);
            this.inside.append(`${model.Sensor.Inside}<small><sup>°</sup>C</small>`);


            this.humidity.append(`${model.Sensor.Humidity}<small>%</small>`);


            this.lux.append(`${model.Sensor.Lux}<small>lux</small>`);

            this.outsideMinTime.html(() => `MIN at ${model.OutsideMinTime}`);
            this.outsideMaxTime.html(() => `MAX at ${model.OutsideMaxTime}`);

            this.outsideMin.append(`${model.OutsideMin}<small><sup>°</sup>C</small>`);
            this.outsideMax.append(`${model.OutsideMax}<small><sup>°</sup>C</small>`);

        });
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

    let api = new WebApi();

    //let ba = new Array<ISeries<number>>();

    //let i : ISeries<number> = new Series();

    //i.name = "Inside";
    //i.data = [22.3, 25.6, 26.4, 30.6];

    //ba.push(i);

    //let chart = new LineChart(["8:00", "8:00", "8:00", "8:00", "8:00", "8:00"],ba);

    const body = document.body;
    setTimeout(() => {
        body.classList.add("active");
    }, 200);

    $(".refresh")
        .click(() => {
            body.classList.remove("active");
            api.refreshData();
            setTimeout(() => {
                body.classList.add("active");
            }, 1500);
        });



};