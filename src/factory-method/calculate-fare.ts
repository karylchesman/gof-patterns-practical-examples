import { Location } from "./location";
import { RideRepository } from "./ride-repository";
import { Segment } from "./segment";
import { SegmentRepository } from "./segment-repository";

export class CalculateFare {
  constructor(
    private rideRepository: RideRepository,
    private segmentRepository: SegmentRepository
  ) {}

  async execute(ride_id: string): Promise<Output> {
    const ride = await this.rideRepository.getById(ride_id);
    const segments = await this.segmentRepository.getByRideId(ride.id);
    const fare = ride.calculateFare(segments);
    return { fare };
  }
}

type Output = {
  fare: number;
};
