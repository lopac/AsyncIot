class WebApi {

    time: JQuery;

    extremeSnaps: Array<ExtremeSnap>;
    monthExtremeSnaps: Array<ExtremeSnap>;
    tiles: Array<Tile>;

    constructor() {
        this.time = $("#time");
    }

    loadTilesRef() {
        this.tiles = new Array<Tile>();
        for (let i = 0; i < 6; i++) {
            this.tiles.push(new Tile(i+1));
        }
    }

    private refreshTiles() {

        $(".refresh").hide();

        for (let i = 0; i < 6; i++) {
            const containerColor = (i + 1) % 2 ? "#22375A" : "#D05340";

            this.tiles[i].container.css("background", containerColor);
            this.tiles[i].title.css("color", "white");
            this.tiles[i].body.css("color", "white");

            this.tiles[i].title.empty();
            this.tiles[i].body.empty();
        }
    }

    public loadExtremeSnaps() {
        $.ajax({
                type: "GET",
                url: "../api/extremes"
            })
            .done((snap: Array<ExtremeSnap>) => {
                this.extremeSnaps = snap;
            });

        $.ajax({
                type: "GET",
                url: "../api/extremes/month"
            })
            .done((snap: Array<ExtremeSnap>) => {
                this.monthExtremeSnaps = snap;
            });
    }


    public drawCharts() {
        $.ajax({
            type: "GET",
            url: "../api/chart",
            contentType: "application/json"
        }).done((model: ChartView) => {


            // ReSharper disable WrongExpressionStatement
            new LineChart("tempGraph", model.Charts[0].Title, model.Labels, model.Charts[0].Series);
            new LineChart("humidityGraph", model.Charts[1].Title, model.Labels, model.Charts[1].Series);
            new LineChart("luxGraph", model.Charts[2].Title, model.Labels, model.Charts[2].Series);

        });
    }

    public refreshSensorData() {
        $.ajax({
            type: "GET",
            url: "../api/Sensor",
            contentType: "application/json"
        }).done((model: HomeViewModel) => {

            this.time.html(() => `TIME: ${model.Time} h`);
            this.time.show();

            $(".refresh").show();

            this.refreshTiles();
            for (let i = 0; i < 4; i++) {
                this.tiles[i].container.css("background", "white");
                this.tiles[i].title.css("color", "black");
                this.tiles[i].body.css("color", "black");


            }

            this.tiles[4].container.css("background", "#21b2ea");
            this.tiles[5].container.css("background", "#a31c15");

            

            this.tiles[0].title.html(() => `Outside`);
            this.tiles[1].title.html(() => `Inside`);
            this.tiles[2].title.html(() => `Humidity`);
            this.tiles[3].title.html(() => `Lux`);
            this.tiles[4].title.html(() => `Sunrise`);
            this.tiles[5].title.html(() => `Sunset`);
          

            this.tiles[0].body.append(`${model.Sensor.Outside}<small><sup>o</sup>C</small>`);
            this.tiles[1].body.append(`${model.Sensor.Inside}<small><sup>o</sup>C</small>`);
            this.tiles[2].body.append(`${model.Sensor.Humidity}<small>%</small>`);
            this.tiles[3].body.append(`${model.Sensor.Lux}<small>lux</small>`);

            this.tiles[4].body.append(`${model.SunriseTime == null ? "N/A" : model.SunriseTime} <small>h</small>`);
            this.tiles[5].body.append(`${model.SunsetTime == null ? "N/A" : model.SunsetTime} <small>h</small>`);

        });
    }

    public onSensorsClick(){this.refreshSensorData();}
   
    public onDayExtremesClick() {
        if (this.extremeSnaps == null) {
            this.loadExtremeSnaps();
        }

        this.refreshTiles();
        this.time.hide();

        this.tiles[0].title.html(() => `${this.extremeSnaps[0].Id} on ${this.extremeSnaps[0].Time}`);
        this.tiles[1].title.html(() => `${this.extremeSnaps[1].Id} on ${this.extremeSnaps[1].Time}`);
        this.tiles[2].title.html(() => `${this.extremeSnaps[2].Id} on ${this.extremeSnaps[2].Time}`);
        this.tiles[3].title.html(() => `${this.extremeSnaps[3].Id} on ${this.extremeSnaps[3].Time}`);
        this.tiles[4].title.html(() => `${this.extremeSnaps[4].Id} on ${this.extremeSnaps[4].Time}`);
        this.tiles[5].title.html(() => `${this.extremeSnaps[5].Id} on ${this.extremeSnaps[5].Time}`);


         this.tiles[0].body.append(`${this.extremeSnaps[0].Value}<small><sup>o</sup>C</small>`);
         this.tiles[1].body.append(`${this.extremeSnaps[1].Value}<small><sup>o</sup>C</small>`);
         this.tiles[2].body.append(`${this.extremeSnaps[2].Value}<small><sup>o</sup>C</small>`);
         this.tiles[3].body.append(`${this.extremeSnaps[3].Value}<small><sup>o</sup>C</small>`);

         this.tiles[4].body.append(`${this.extremeSnaps[4].Value}<small>%</small>`);
         this.tiles[5].body.append(`${this.extremeSnaps[5].Value}<small>%</small>`);
        
       
    }

    public onMonthExtremesClick() {
        if (this.monthExtremeSnaps == null) {
            this.loadExtremeSnaps();
        }

        this.refreshTiles();
        this.time.hide();

        this.tiles[0].title.html(() => `${this.monthExtremeSnaps[0].Id} on ${this.monthExtremeSnaps[0].Time}`);
        this.tiles[1].title.html(() => `${this.monthExtremeSnaps[1].Id} on ${this.monthExtremeSnaps[1].Time}`);
        this.tiles[2].title.html(() => `${this.monthExtremeSnaps[2].Id} on ${this.monthExtremeSnaps[2].Time}`);
        this.tiles[3].title.html(() => `${this.monthExtremeSnaps[3].Id} on ${this.monthExtremeSnaps[3].Time}`);
        this.tiles[4].title.html(() => `${this.monthExtremeSnaps[4].Id} on ${this.monthExtremeSnaps[4].Time}`);
        this.tiles[5].title.html(() => `${this.monthExtremeSnaps[5].Id} on ${this.monthExtremeSnaps[5].Time}`);


        this.tiles[0].body.append(`${this.monthExtremeSnaps[0].Value}<small><sup>o</sup>C</small>`);
        this.tiles[1].body.append(`${this.monthExtremeSnaps[1].Value}<small><sup>o</sup>C</small>`);
        this.tiles[2].body.append(`${this.monthExtremeSnaps[2].Value}<small><sup>o</sup>C</small>`);
        this.tiles[3].body.append(`${this.monthExtremeSnaps[3].Value}<small><sup>o</sup>C</small>`);

        this.tiles[4].body.append(`${this.monthExtremeSnaps[4].Value}<small>%</small>`);
        this.tiles[5].body.append(`${this.monthExtremeSnaps[5].Value}<small>%</small>`);


    }

}