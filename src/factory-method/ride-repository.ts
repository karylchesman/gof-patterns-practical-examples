import { Ride } from "./ride";

export interface RideRepository {
  save(ride: Ride): Promise<void>;
  update(ride: Ride): Promise<void>;
  getById(ride_id: string): Promise<Ride>;
}

export class RideRepositoryMemory implements RideRepository {
  rides: Ride[] = [];

  async save(ride: Ride): Promise<void> {
    this.rides.push(ride);
  }

  async update(ride: Ride): Promise<void> {
    const index = this.rides.findIndex((r) => r.id === ride.id);
    if (index === -1) throw new Error("Ride not found");
    this.rides[index] = ride;
  }

  async getById(ride_id: string): Promise<Ride> {
    const ride = this.rides.find((ride) => ride.id === ride_id);
    if (!ride) throw new Error("Ride not found");
    return ride;
  }
}
