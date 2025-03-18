import { Location } from "../location";
import { TimeSegment } from "../segment";

test("Should create a segment by time", () => {
  const from_location = new Location(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2024-03-18T10:00:00")
  );
  const to_location = new Location(
    -27.496887588317275,
    -48.522234807851476,
    new Date("2024-03-18T12:00:00")
  );
  const time_segment = new TimeSegment("ride_id", from_location, to_location);
  expect(time_segment.getDiffInMinutes()).toBe(120);
});
