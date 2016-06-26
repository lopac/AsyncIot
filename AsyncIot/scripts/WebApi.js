var WebApi = (function () {
    function WebApi() {
        this.time = $("#time");
    }
    WebApi.prototype.loadTilesRef = function () {
        this.tiles = new Array();
        for (var i = 0; i < 6; i++) {
            this.tiles.push(new Tile(i + 1));
        }
    };
    WebApi.prototype.refreshTiles = function () {
        $(".refresh").hide();
        for (var i = 0; i < 6; i++) {
            this.tiles[i].title.empty();
            this.tiles[i].body.empty();
        }
    };
    WebApi.prototype.loadExtremeSnaps = function () {
        var _this = this;
        $.ajax({
            type: "GET",
            url: "../api/extremes"
        })
            .done(function (snap) {
            _this.extremeSnaps = snap;
        });
        $.ajax({
            type: "GET",
            url: "../api/extremes/month"
        })
            .done(function (snap) {
            _this.monthExtremeSnaps = snap;
        });
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
            _this.time.show();
            $(".refresh").show();
            _this.refreshTiles();
            _this.tiles[0].title.html(function () { return "Outside"; });
            _this.tiles[1].title.html(function () { return "Inside"; });
            _this.tiles[2].title.html(function () { return "Humidity"; });
            _this.tiles[3].title.html(function () { return "Lux"; });
            _this.tiles[4].title.html(function () { return "Sunrise"; });
            _this.tiles[5].title.html(function () { return "Sunset"; });
            _this.tiles[0].body.append(model.Sensor.Outside + "<small><sup>o</sup>C</small>");
            _this.tiles[1].body.append(model.Sensor.Inside + "<small><sup>o</sup>C</small>");
            _this.tiles[2].body.append(model.Sensor.Humidity + "<small>%</small>");
            _this.tiles[3].body.append(model.Sensor.Lux + "<small>lux</small>");
            _this.tiles[4].body.append((model.SunriseTime == null ? "N/A" : model.SunriseTime) + " <small>h</small>");
            _this.tiles[5].body.append((model.SunsetTime == null ? "N/A" : model.SunsetTime) + " <small>h</small>");
        });
    };
    WebApi.prototype.onSensorsClick = function () { this.refreshSensorData(); };
    WebApi.prototype.onDayExtremesClick = function () {
        var _this = this;
        if (this.extremeSnaps == null) {
            this.loadExtremeSnaps();
        }
        this.refreshTiles();
        this.time.hide();
        this.tiles[0].title.html(function () { return (_this.extremeSnaps[0].Id + " on " + _this.extremeSnaps[0].Time); });
        this.tiles[1].title.html(function () { return (_this.extremeSnaps[1].Id + " on " + _this.extremeSnaps[1].Time); });
        this.tiles[2].title.html(function () { return (_this.extremeSnaps[2].Id + " on " + _this.extremeSnaps[2].Time); });
        this.tiles[3].title.html(function () { return (_this.extremeSnaps[3].Id + " on " + _this.extremeSnaps[3].Time); });
        this.tiles[4].title.html(function () { return (_this.extremeSnaps[4].Id + " on " + _this.extremeSnaps[4].Time); });
        this.tiles[5].title.html(function () { return (_this.extremeSnaps[5].Id + " on " + _this.extremeSnaps[5].Time); });
        this.tiles[0].body.append(this.extremeSnaps[0].Value + "<small><sup>o</sup>C</small>");
        this.tiles[1].body.append(this.extremeSnaps[1].Value + "<small><sup>o</sup>C</small>");
        this.tiles[2].body.append(this.extremeSnaps[2].Value + "<small><sup>o</sup>C</small>");
        this.tiles[3].body.append(this.extremeSnaps[3].Value + "<small><sup>o</sup>C</small>");
        this.tiles[4].body.append(this.extremeSnaps[4].Value + "<small>%</small>");
        this.tiles[5].body.append(this.extremeSnaps[5].Value + "<small>%</small>");
    };
    WebApi.prototype.onMonthExtremesClick = function () {
        var _this = this;
        if (this.monthExtremeSnaps == null) {
            this.loadExtremeSnaps();
        }
        this.refreshTiles();
        this.time.hide();
        this.tiles[0].title.html(function () { return (_this.monthExtremeSnaps[0].Id + " on " + _this.monthExtremeSnaps[0].Time); });
        this.tiles[1].title.html(function () { return (_this.monthExtremeSnaps[1].Id + " on " + _this.monthExtremeSnaps[1].Time); });
        this.tiles[2].title.html(function () { return (_this.monthExtremeSnaps[2].Id + " on " + _this.monthExtremeSnaps[2].Time); });
        this.tiles[3].title.html(function () { return (_this.monthExtremeSnaps[3].Id + " on " + _this.monthExtremeSnaps[3].Time); });
        this.tiles[4].title.html(function () { return (_this.monthExtremeSnaps[4].Id + " on " + _this.monthExtremeSnaps[4].Time); });
        this.tiles[5].title.html(function () { return (_this.monthExtremeSnaps[5].Id + " on " + _this.monthExtremeSnaps[5].Time); });
        this.tiles[0].body.append(this.monthExtremeSnaps[0].Value + "<small><sup>o</sup>C</small>");
        this.tiles[1].body.append(this.monthExtremeSnaps[1].Value + "<small><sup>o</sup>C</small>");
        this.tiles[2].body.append(this.monthExtremeSnaps[2].Value + "<small><sup>o</sup>C</small>");
        this.tiles[3].body.append(this.monthExtremeSnaps[3].Value + "<small><sup>o</sup>C</small>");
        this.tiles[4].body.append(this.monthExtremeSnaps[4].Value + "<small>%</small>");
        this.tiles[5].body.append(this.monthExtremeSnaps[5].Value + "<small>%</small>");
    };
    return WebApi;
}());
//# sourceMappingURL=WebApi.js.map