const db = require("../db/connection");

exports.selectParks = () => {
  return db.query(`SELECT * FROM parks;`).then((response) => {
    return response.rows;
  });
};

exports.removeParkById = () => {};

exports.updateParkById = (park_id, request) => {
  return db
    .query(
      `
    UPDATE parks
    SET park_name = $1, annual_attendance = $2
    WHERE park_id = $3
    RETURNING *`,
      [request.park_name, request.annual_attendance, park_id]
    )
    .then((res) => {
      return res.rows[0];
    });
};
