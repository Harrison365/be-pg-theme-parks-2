const db = require("../db/connection");

exports.selectRidesByParkId = (park_id) => {
  return db
    .query(
      `SELECT ride_name, rides.year_opened, parks.park_name, votes FROM rides 
      JOIN parks ON rides.park_id = parks.park_id 
      WHERE rides.park_id = $1;`,
      [park_id]
    )
    .then(({ rows: rides }) => rides);
};
