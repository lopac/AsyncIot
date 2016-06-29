var LineChart = (function () {
    function LineChart(id, title, labels, series) {
        this.grapChart = $("#" + id);
        this.grapChart.empty();
        Highcharts.chart({
            chart: {
                renderTo: this.grapChart[0]
            },
            title: {
                text: title,
                x: -20
            },
            subtitle: {
                text: "",
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
                        width: .8,
                        color: "#808080"
                    }
                ]
            },
            tooltip: {
                valueSuffix: ""
            },
            legend: {
                layout: "vertical",
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
//# sourceMappingURL=LineChartController.js.map