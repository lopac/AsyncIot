/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/highcharts/highcharts.d.ts" />


window.onload = () => {

    let api = new WebApi();

    api.drawCharts();

    const body = document.body;
    setTimeout(() => {
        body.classList.add("active");
    }, 200);

    $(".refresh")
        .click(() => {
            body.classList.remove("active");
            api.refreshSensorData();
            api.drawCharts();
            setTimeout(() => {
                body.classList.add("active");
            }, 1500);
        });



};