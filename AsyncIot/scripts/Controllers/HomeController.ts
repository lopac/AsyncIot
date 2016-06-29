/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/highcharts/highcharts.d.ts" />



window.onload = () => {

    let api = new WebApi();

    api.loadTilesRef();

    api.drawCharts();

    const body = document.body;
    setTimeout(() => {
        body.classList.add("active");
    }, 200);

    api.loadExtremeSnaps();

    $(".refresh")
        .click(() => {
            body.classList.remove("active");
            api.refreshSensorData();
            api.drawCharts();
            setTimeout(() => {
                body.classList.add("active");
            }, 1500);
        });


    $("#sensors-tab")
        .click(() => {
            body.classList.remove("active");
            api.onSensorsClick();
            setTimeout(() => {
                body.classList.add("active");
            }, 1500);
        });

    $("#day-extremes-tab")
        .click(() => {
            body.classList.remove("active");
            api.onDayExtremesClick();
            setTimeout(() => {
                body.classList.add("active");
            }, 1500);
        });

    $("#month-extremes-tab")
        .click(() => {
            body.classList.remove("active");
            api.onMonthExtremesClick();
            setTimeout(() => {
                body.classList.add("active");
            }, 1500);
        });

};