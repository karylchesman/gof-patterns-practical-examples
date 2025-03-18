import { Location } from "../location";
import { DistanceRide, TimeRide } from "../ride";
import { DistanceSegment, TimeSegment } from "../segment";

test("Should create and calculate the fare of a ride by distance", async () => {
  const ride = DistanceRide.create(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2024-03-18T10:00:00")
  );
  const last_location = new Location(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2024-03-18T10:00:00")
  );
  const new_location = new Location(
    -27.496887588317275,
    -48.522234807851476,
    new Date("2024-03-18T12:00:00")
  );
  const segment = new DistanceSegment(ride.id, last_location, new_location);
  ride.updateLocation(
    new Location(-27.496887588317275, -48.522234807851476, new Date("2024-03-18T12:00:00"))
  );

  const fare = ride.calculateFare([segment]);
  expect(fare).toBe(40);
});

test("Should create and calculate the fare of a ride by time", async () => {
  const ride = TimeRide.create(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2024-03-18T10:00:00")
  );
  const last_location = new Location(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2024-03-18T10:00:00")
  );
  const new_location = new Location(
    -27.496887588317275,
    -48.522234807851476,
    new Date("2024-03-18T12:00:00")
  );
  const segment = new TimeSegment(ride.id, last_location, new_location);
  ride.updateLocation(
    new Location(-27.496887588317275, -48.522234807851476, new Date("2024-03-18T12:00:00"))
  );

  const fare = ride.calculateFare([segment]);
  expect(fare).toBe(120);
});
