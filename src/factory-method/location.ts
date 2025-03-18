import { Coord } from "./coord";

export class Location {
  coord: Coord;

  constructor(lat: number, long: number, readonly date: Date) {
    this.coord = new Coord(lat, long);
    this.date = date;
  }
}
