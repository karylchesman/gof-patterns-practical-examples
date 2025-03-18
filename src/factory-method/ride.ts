import { Location } from "./location";
import { randomUUID } from "node:crypto";
import { DistanceSegment, Segment, TimeSegment } from "./segment";

export abstract class Ride {
  lastLocation: Location;

  constructor(readonly id: string, lat: number, long: number, date: Date) {
    this.lastLocation = new Location(lat, long, date);
  }

  updateLocation(new_location: Location): void {
    this.lastLocation = new_location;
  }

  abstract calculateFare(segments: Segment[]): number;
  abstract createSegment(from: Location, to: Location): Segment;
}

export class DistanceRide extends Ride {
  createSegment(from: Location, to: Location): Segment {
    return new DistanceSegment(this.id, from, to);
  }

  calculateFare(segments: DistanceSegment[]): number {
    let total = 0;
    for (const segment of segments) {
      total += segment.getDistance();
    }
    return total * 4;
  }

  static create(lat: number, long: number, date: Date) {
    return new DistanceRide(randomUUID(), lat, long, date);
  }
}

export class TimeRide extends Ride {
  createSegment(from: Location, to: Location): Segment {
    return new TimeSegment(this.id, from, to);
  }

  calculateFare(segments: TimeSegment[]): number {
    let total = 0;
    for (const segment of segments) {
      total += segment.getDiffInMinutes();
    }
    return total * 1;
  }

  static create(lat: number, long: number, date: Date) {
    return new TimeRide(randomUUID(), lat, long, date);
  }
}
