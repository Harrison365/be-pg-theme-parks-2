function prepareRidesData(rides, parkReturn) {
  if (!parkReturn) return [];
  const obj = {};
  parkReturn.forEach((park) => {
    if (!obj.hasOwnProperty(park.park_name)) {
      obj[park.park_name] = park.park_id;
    }
  });
  const preparedRideData = rides.map((ride) => {
    return [ride.ride_name, ride.year_opened, obj[ride.park_name], ride.votes];
  });
  return preparedRideData;
}

module.exports = prepareRidesData;
