import { Segment } from "./segment";

export interface SegmentRepository {
  save(segment: Segment): Promise<void>;
  getByRideId(ride_id: string): Promise<Segment[]>;
}

export class SegmentRepositoryMemory implements SegmentRepository {
  segments: Segment[] = [];

  async save(segment: Segment): Promise<void> {
    this.segments.push(segment);
  }

  async getByRideId(ride_id: string): Promise<Segment[]> {
    return this.segments.filter((segment) => segment.ride_id === ride_id);
  }
}
