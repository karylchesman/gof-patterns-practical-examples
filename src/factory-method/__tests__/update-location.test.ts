import { CalculateFare } from "../calculate-fare";
import { DistanceRide, TimeRide } from "../ride";
import { RideRepositoryMemory } from "../ride-repository";
import { SegmentRepositoryMemory } from "../segment-repository";
import { UpdateLocation } from "../update-location";

test("Should update the location of a ride by distance", async () => {
  const ride_repository = new RideRepositoryMemory();
  const segment_repository = new SegmentRepositoryMemory();
  const ride = DistanceRide.create(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2024-03-18T10:00:00")
  );
  await ride_repository.save(ride);
  const update_location = new UpdateLocation(ride_repository, segment_repository);
  const input = {
    ride_id: ride.id,
    lat: -27.496887588317275,
    long: -48.522234807851476,
    date: new Date("2024-03-18T12:00:00"),
  };
  await update_location.execute(input);
  const calculate_fare = new CalculateFare(ride_repository, segment_repository);
  const output = await calculate_fare.execute(ride.id);
  expect(output.fare).toBe(40);
});

test("Should update the location of a ride by time", async () => {
  const ride_repository = new RideRepositoryMemory();
  const segment_repository = new SegmentRepositoryMemory();
  const ride = TimeRide.create(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2024-03-18T10:00:00")
  );
  await ride_repository.save(ride);
  const update_location = new UpdateLocation(ride_repository, segment_repository);
  const input = {
    ride_id: ride.id,
    lat: -27.496887588317275,
    long: -48.522234807851476,
    date: new Date("2024-03-18T12:00:00"),
  };
  await update_location.execute(input);
  const calculate_fare = new CalculateFare(ride_repository, segment_repository);
  const output = await calculate_fare.execute(ride.id);
  expect(output.fare).toBe(120);
});
