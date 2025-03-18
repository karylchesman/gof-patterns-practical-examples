import { Location } from "./location";
import { RideRepository } from "./ride-repository";
import { SegmentRepository } from "./segment-repository";

export class UpdateLocation {
  constructor(
    private rideRepository: RideRepository,
    private segmentRepository: SegmentRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.getById(input.ride_id);
    const new_location = new Location(input.lat, input.long, input.date);
    const segment = ride.createSegment(ride.lastLocation, new_location);
    ride.updateLocation(new_location);
    await this.rideRepository.update(ride);
    await this.segmentRepository.save(segment);
  }
}

type Input = {
  ride_id: string;
  lat: number;
  long: number;
  date: Date;
};
