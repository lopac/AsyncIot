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
function onBoxHover(eId, id) {
    /*.widget li:hover + .val{
    background: #3a5d96;
    color: white;
}*/
    console.log(eId);
    if (id === "in") {
        $(eId).css("background", "#3a5d96").css("color", "white");
        $(eId).children().css("background", "#3a5d96").css("color", "white");
    }
    else {
        $(eId).css("background", "white").css("color", "black");
        $(eId).children().css("background", "white").css("color", "black");
    }
}
window.onload = function () {
    $.ajax({
        type: "GET",
        url: "../api/Snaps/today"
    }).done(function (result) {
        console.log(result);
    });
    var ba = new Array();
    var i = new Series();
    i.name = "Inside";
    i.data = [22.3, 25.6, 26.4, 30.6];
    ba.push(i);
    var chart = new LineChart(["8:00", "8:00", "8:00", "8:00", "8:00", "8:00"], ba);
    var body = document.body;
    setTimeout(function () {
        body.classList.add("active");
    }, 200);
    $(".refresh")
        .click(function () {
        body.classList.remove("active");
        setTimeout(function () {
            body.classList.add("active");
        }, 1500);
    });
};
//# sourceMappingURL=app.js.map