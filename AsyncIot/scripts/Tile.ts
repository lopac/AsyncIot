class Tile {
    body: JQuery;
    title: JQuery;
    container: JQuery;

    constructor(id: number) {
        this.container = $(`#tile${id}-container`);
        this.body = $(`#tile${id}-val`);
        this.title = $(`#tile${id}-title`);
    }
}
