class Series implements ISeries<number> {
    name: string;
    data: Array<number>;

    constructor(name?: string) {
        this.name = name;
        this.data = new Array<number>();
    }
}
