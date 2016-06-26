class Tile {
    body: JQuery;
    title: JQuery;

    constructor(id: number) {
        this.body = $(`#tile${id}-val`);
        this.title = $(`#tile${id}-title`);
    }
}
