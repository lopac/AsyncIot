/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/highcharts/highcharts.d.ts" />
window.onload = function () {
    var api = new WebApi();
    api.loadTilesRef();
    api.drawCharts();
    var body = document.body;
    setTimeout(function () {
        body.classList.add("active");
    }, 200);
    api.loadExtremeSnaps();
    $(".refresh")
        .click(function () {
        body.classList.remove("active");
        api.refreshSensorData();
        api.drawCharts();
        setTimeout(function () {
            body.classList.add("active");
        }, 1500);
    });
    $("#sensors-tab")
        .click(function () {
        body.classList.remove("active");
        api.onSensorsClick();
        setTimeout(function () {
            body.classList.add("active");
        }, 1500);
    });
    $("#day-extremes-tab")
        .click(function () {
        body.classList.remove("active");
        api.onDayExtremesClick();
        setTimeout(function () {
            body.classList.add("active");
        }, 1500);
    });
    $("#month-extremes-tab")
        .click(function () {
        body.classList.remove("active");
        api.onMonthExtremesClick();
        setTimeout(function () {
            body.classList.add("active");
        }, 1500);
    });
};
//# sourceMappingURL=app.js.map