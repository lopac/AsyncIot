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
    WebApi.prototype.drawCharts = function () {
        $.ajax({
            type: "GET",
            url: "../api/Snaps/today"
        }).done(function (snaps) {
            var labels = new Array();
            var insideS = new Series("Inside");
            var outsideS = new Series("Outside");
            var luxSeries = new Series("Lux");
            var humiditySeries = new Series("Humidity");
            for (var i = 0; i < snaps.length; i++) {
                insideS.data.push(snaps[i].Sensor.Inside);
                outsideS.data.push(snaps[i].Sensor.Outside);
                humiditySeries.data.push(snaps[i].Sensor.Humidity);
                luxSeries.data.push(snaps[i].Sensor.Lux);
                labels.push(snaps[i].DateTime.split("T")[1].split(".")[0].substring(0, 5));
            }
            var tempSeries = new Array();
            tempSeries.push(insideS);
            tempSeries.push(outsideS);
            var chart = new LineChart("tempGraph", "Temperatures", labels, tempSeries);
            var chart1 = new LineChart("humidityGraph", "Humidity", labels, [humiditySeries]);
            var chart2 = new LineChart("luxGraph", "Lux", labels, [luxSeries]);
        });
    };
    WebApi.prototype.refreshSensorData = function () {
        var _this = this;
        $.ajax({
            type: "GET",
            url: "../api/Sensor",
            contentType: "application/json"
        }).done(function (model) {
            _this.time.html(function () { return ("TIME: " + model.Time + " h"); });
            _this.emptyDivs();
            _this.outside.append(model.Sensor.Outside + "<small><sup>\uFFFD</sup>C</small>");
            _this.inside.append(model.Sensor.Inside + "<small><sup>\uFFFD</sup>C</small>");
            _this.humidity.append(model.Sensor.Humidity + "<small>%</small>");
            _this.lux.append(model.Sensor.Lux + "<small>lux</small>");
            _this.outsideMinTime.html(function () { return ("MIN at " + model.OutsideMinTime); });
            _this.outsideMaxTime.html(function () { return ("MAX at " + model.OutsideMaxTime); });
            _this.outsideMin.append(model.OutsideMin + "<small><sup>\uFFFD</sup>C</small>");
            _this.outsideMax.append(model.OutsideMax + "<small><sup>\uFFFD</sup>C</small>");
        });
    };
    return WebApi;
}());
//# sourceMappingURL=WebApi.js.map