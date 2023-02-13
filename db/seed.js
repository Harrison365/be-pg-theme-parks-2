const { parks, rides, stalls } = require("./data/index.js");
const format = require("pg-format");
const arrangeParksData = require("../utils/arrangeParksData");
const preparedRideData = require("../utils/prepareRidesData");

const db = require("./connection"); // make connection to db

function seed() {
  return db
    .query("DROP TABLE IF EXISTS rides;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls_foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS parks;");
    })
    .then(() => {
      return createParks(); //create parks table in theme_parks db (package.json tells PG which database)
    })
    .then(() => {
      return createRides(); //create rides table
    })
    .then(() => {
      return insertParks(parks); //Insert parks into parks table (you will need to turn parks data into array of arras, so that format can use it to build an SQL string that you can use to insert)
    })
    .then((insertedParks) => {
      return insertRides(rides, insertedParks.rows); //Same here but for rides. You will need a different utils function to make sure the rides each have a park_id AND is an array of arrays for format to make the SQL string --> query.
    });
}

//CHECK TABLES ARE CREATED AND POPULATED
/*
psql
\c <name of db> (in this case theme_parks)
SELECT * FROM <table name>;
OR 
\dt (to see all of the tables)
\d <table name> (will show you the table)
*/

function createParks() {
  /* Create your parks table in the query below */
  return db
    .query(
      `CREATE TABLE parks (
    park_id SERIAL PRIMARY KEY, park_name VARCHAR NOT NULL, year_opened INT NOT NULL, annual_attendance INT NOT NULL);
    `
    )
    .then((result) => {
      console.log(result);
    });
}

function createRides() {
  /* Create your parks table in the query below */
  return db
    .query(
      `CREATE TABLE rides (
    ride_id SERIAL PRIMARY KEY, park_id INT REFERENCES parks(park_id), ride_name VARCHAR(50) NOT NULL, year_opened INT NOT NULL, votes INT NOT NULL)   
    `
    )
    .then((result) => {
      console.log(result);
    });
}

function insertParks(parks) {
  const formattedParks = arrangeParksData(parks);
  const parksInsertSqlString = format(
    ` INSERT INTO parks
  (park_name, year_opened, annual_attendance)
  VALUES
  %L
  RETURNING *;`,
    formattedParks
  );
  return db.query(parksInsertSqlString);
}

function insertRides(rides, insertedParks) {
  const preparedRides = preparedRideData(rides, insertedParks);
  const ridesInsertSqlString = format(
    `
  INSERT INTO rides
  (ride_name, year_opened, park_id, votes)
  VALUES
  %L
  RETURNING *;
  `,
    preparedRides
  );
  return db.query(ridesInsertSqlString);
}

module.exports = { seed };
