var Tile = (function () {
    function Tile(id) {
        this.container = $("#tile" + id + "-container");
        this.body = $("#tile" + id + "-val");
        this.title = $("#tile" + id + "-title");
    }
    return Tile;
}());
