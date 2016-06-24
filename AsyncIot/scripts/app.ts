/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/highcharts/highcharts.d.ts" />

interface ISeries<T> {
    name: string;
    data: Array<T>;
}

class Series implements ISeries<number> {
    name: string;
    data: Array<number>;

    constructor(name?: string) {
        this.name = name;
        this.data = new Array<number>();
    }
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
                layout: "vertical",
                align: "left",
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

class CentralHeating {
    Water: number;
    Dayset: number;
    Nightset: number;
}

class Snap {
    CentralHeating: CentralHeating;
    Sensor: Sensor;
    DateTime: string;
}

class List<T> {
    private array: Array<T>;

    constructor() {
        this.array = new Array<T>();
    }
}

window.onload = () => {

    $.ajax({
        type: "GET",
        url: "../api/Snaps/today"
        //contentType: "application/json"
    }).done((snaps: Array<Snap>) => {

        console.log(snaps[0]);


        let labels: Array<string> = new Array<string>();
        let insideS = new Series("Inside");
        let outsideS = new Series("Outside");
        let luxS = new Series("Lux");
        let humidityS = new Series("Humidity");

        for (let i = 0; i < snaps.length; i++) {
            insideS.data.push(snaps[i].Sensor.Inside);
            outsideS.data.push(snaps[i].Sensor.Outside);
            humidityS.data.push(snaps[i].Sensor.Humidity);
            luxS.data.push(snaps[i].Sensor.Lux);

            labels.push(snaps[i].DateTime.split("T")[1].split(".")[0].substring(0, 5));

        }

        let series = new Array<Series>();

        series.push(insideS);
        series.push(outsideS);
        series.push(luxS);
        series.push(humidityS);

        let chart = new LineChart(labels,series);

    });

    let api = new WebApi();


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