/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/highcharts/highcharts.d.ts" />
window.onload = function () {
    var api = new WebApi();
    api.drawCharts();
    var body = document.body;
    setTimeout(function () {
        body.classList.add("active");
    }, 200);
    $(".refresh")
        .click(function () {
        body.classList.remove("active");
        api.refreshSensorData();
        api.drawCharts();
        setTimeout(function () {
            body.classList.add("active");
        }, 1500);
    });
};
//# sourceMappingURL=app.js.map