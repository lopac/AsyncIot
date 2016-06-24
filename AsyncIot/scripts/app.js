/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/highcharts/highcharts.d.ts" />
var Series = (function () {
    function Series(name) {
        this.name = name;
        this.data = new Array();
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
var CentralHeating = (function () {
    function CentralHeating() {
    }
    return CentralHeating;
}());
var Snap = (function () {
    function Snap() {
    }
    return Snap;
}());
var List = (function () {
    function List() {
        this.array = new Array();
    }
    return List;
}());
window.onload = function () {
    $.ajax({
        type: "GET",
        url: "../api/Snaps/today"
    }).done(function (snaps) {
        console.log(snaps[0]);
        var labels = new Array();
        var insideS = new Series("Inside");
        var outsideS = new Series("Outside");
        var luxS = new Series("Lux");
        var humidityS = new Series("Humidity");
        for (var i = 0; i < snaps.length; i++) {
            insideS.data.push(snaps[i].Sensor.Inside);
            outsideS.data.push(snaps[i].Sensor.Outside);
            humidityS.data.push(snaps[i].Sensor.Humidity);
            luxS.data.push(snaps[i].Sensor.Lux);
            labels.push(snaps[i].DateTime.split("T")[1].split(".")[0].substring(0, 5));
        }
        var series = new Array();
        series.push(insideS);
        series.push(outsideS);
        series.push(luxS);
        series.push(humidityS);
        var chart = new LineChart(labels, series);
    });
    var api = new WebApi();
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
