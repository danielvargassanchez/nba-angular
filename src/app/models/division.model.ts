export class Division {
    conference: string;
    divisionName: string;
    constructor() {
        this.conference = "";
        this.divisionName = "";
    }
}
export class FiltersInfo {
    conferences: string[] = [];
    divisions: Division[] = [];
}