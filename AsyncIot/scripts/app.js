/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/highcharts/highcharts.d.ts" />
var Series = (function () {
    function Series() {
    }
    return Series;
}());
var LineChart = (function () {
    function LineChart(labels, series) {
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
    return LineChart;
}());
// ReSharper disable InconsistentNaming
var Sensor = (function () {
    function Sensor() {
    }
    return Sensor;
}());
var HomeViewModel = (function () {
    function HomeViewModel() {
    }
    return HomeViewModel;
}());
// ReSharper restore InconsistentNaming
var WebApi = (function () {
    function WebApi() {
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
    WebApi.prototype.emptyDivs = function () {
        this.outside.empty();
        this.inside.empty();
        this.humidity.empty();
        this.lux.empty();
        this.outsideMin.empty();
        this.outsideMax.empty();
    };
    WebApi.prototype.refreshData = function () {
        var _this = this;
        $.ajax({
            type: "GET",
            url: "../api/Sensor",
            contentType: "application/json"
        }).done(function (model) {
            _this.time.html(function () { return ("TIME: " + model.Time + " h"); });
            _this.emptyDivs();
            _this.outside.append(model.Sensor.Outside + "<small><sup>\u00B0</sup>C</small>");
            _this.inside.append(model.Sensor.Inside + "<small><sup>\u00B0</sup>C</small>");
            _this.humidity.append(model.Sensor.Humidity + "<small>%</small>");
            _this.lux.append(model.Sensor.Lux + "<small>lux</small>");
            _this.outsideMinTime.html(function () { return ("MIN at " + model.OutsideMinTime); });
            _this.outsideMaxTime.html(function () { return ("MAX at " + model.OutsideMaxTime); });
            _this.outsideMin.append(model.OutsideMin + "<small><sup>\u00B0</sup>C</small>");
            _this.outsideMax.append(model.OutsideMax + "<small><sup>\u00B0</sup>C</small>");
        });
    };
    return WebApi;
}());
window.onload = function () {
    $.ajax({
        type: "GET",
        url: "../api/Snaps/today"
    }).done(function (result) {
        console.log(result);
    });
    var api = new WebApi();
    //let ba = new Array<ISeries<number>>();
    //let i : ISeries<number> = new Series();
    //i.name = "Inside";
    //i.data = [22.3, 25.6, 26.4, 30.6];
    //ba.push(i);
    //let chart = new LineChart(["8:00", "8:00", "8:00", "8:00", "8:00", "8:00"],ba);
    var body = document.body;
    setTimeout(function () {
        body.classList.add("active");
    }, 200);
    $(".refresh")
        .click(function () {
        body.classList.remove("active");
        api.refreshData();
        setTimeout(function () {
            body.classList.add("active");
        }, 1500);
    });
};
