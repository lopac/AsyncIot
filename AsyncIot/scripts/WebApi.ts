class WebApi {

    time: JQuery;

    inside: JQuery;
    outside: JQuery;
    humidity: JQuery;
    lux: JQuery;
    //todo smoke : JQuery;

    outsideMin: JQuery;
    outsideMax: JQuery;
    outsideMinTime: JQuery;
    outsideMaxTime: JQuery;


    constructor() {
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

    private emptyDivs() {
        this.outside.empty();
        this.inside.empty();
        this.humidity.empty();
        this.lux.empty();
        this.outsideMin.empty();
        this.outsideMax.empty();
    }

    public drawCharts() {
        $.ajax({
            type: "GET",
            url: "../api/Snaps/today"
        }).done((snaps: Array<Snap>) => {


            let labels = new Array<string>();
            let insideS = new Series("Inside");
            let outsideS = new Series("Outside");
            let luxSeries = new Series("Lux");
            let humiditySeries = new Series("Humidity");

            for (let i = 0; i < snaps.length; i++) {
                insideS.data.push(snaps[i].Sensor.Inside);
                outsideS.data.push(snaps[i].Sensor.Outside);
                humiditySeries.data.push(snaps[i].Sensor.Humidity);
                luxSeries.data.push(snaps[i].Sensor.Lux);

                labels.push(snaps[i].DateTime.split("T")[1].split(".")[0].substring(0, 5));

            }

            let tempSeries = new Array<Series>();


            tempSeries.push(insideS);
            tempSeries.push(outsideS);
            let chart = new LineChart("tempGraph", "Temperatures", labels, tempSeries);
            let chart1 = new LineChart("humidityGraph", "Humidity", labels, [humiditySeries]);
            let chart2 = new LineChart("luxGraph", "Lux", labels, [luxSeries]);

        });
    }

    public refreshSensorData() {
        $.ajax({
            type: "GET",
            url: "../api/Sensor",
            contentType: "application/json"
        }).done((model: HomeViewModel) => {

            this.time.html(() => `TIME: ${model.Time} h`);

            this.emptyDivs();

          

            this.outside.append(`${model.Sensor.Outside}<small><sup>°</sup>C</small>`);
            this.inside.append(`${model.Sensor.Inside}<small><sup>°</sup>C</small>`);


            this.humidity.append(`${model.Sensor.Humidity}<small>%</small>`);


            this.lux.append(`${model.Sensor.Lux}<small>lux</small>`);

            this.outsideMinTime.html(() => `MIN at ${model.OutsideMinTime}`);
            this.outsideMaxTime.html(() => `MAX at ${model.OutsideMaxTime}`);

            this.outsideMin.append(`${model.OutsideMin}<small><sup>°</sup>C</small>`);
            this.outsideMax.append(`${model.OutsideMax}<small><sup>°</sup>C</small>`);

        });
    }
}