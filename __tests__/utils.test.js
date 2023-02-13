/* make sure you write your tests for your utils functions in here :eyes: */

const arrangeParksData = require("../utils/arrangeParksData");
const prepareRidesData = require("../utils/prepareRidesData");

describe("arrangeParksData", () => {
  test("should return an empty array when passed an empty array", () => {
    expect(arrangeParksData([])).toEqual([]);
  });
  test("should return a new reference in memory", () => {
    const input = [];
    expect(arrangeParksData(input)).not.toBe(input);
  });
  test("should not mutate the passed array", () => {
    const input = [
      {
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
      {
        park_name: "Alton Towers",
        year_opened: 1980,
        annual_attendance: 2520000,
      },
      {
        park_name: "Chessington World of Adventures",
        year_opened: 1987,
        annual_attendance: 1400000,
      },
      {
        park_name: "Tivoli Gardens",
        year_opened: 1843,
        annual_attendance: 3972000,
      },
    ];
    const inputCopy = [
      {
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
      {
        park_name: "Alton Towers",
        year_opened: 1980,
        annual_attendance: 2520000,
      },
      {
        park_name: "Chessington World of Adventures",
        year_opened: 1987,
        annual_attendance: 1400000,
      },
      {
        park_name: "Tivoli Gardens",
        year_opened: 1843,
        annual_attendance: 3972000,
      },
    ];

    arrangeParksData(input);

    expect(input).toEqual(inputCopy);
  });
  test("should return a correctly formatted output when passed a single park", () => {
    const input = [
      {
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
    ];

    const expected = [["Thorpe Park", 1979, 1700000]];

    expect(arrangeParksData(input)).toEqual(expected);
  });
  test("should return a correctly formatted output when passed two parks", () => {
    const input = [
      {
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
      {
        park_name: "Alton Towers",
        year_opened: 1980,
        annual_attendance: 2520000,
      },
    ];

    const expected = [
      ["Thorpe Park", 1979, 1700000],
      ["Alton Towers", 1980, 2520000],
    ];

    expect(arrangeParksData(input)).toEqual(expected);
  });
  test("should return a correctly formatted output when passed multiple parks", () => {
    const input = [
      {
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
      {
        park_name: "Alton Towers",
        year_opened: 1980,
        annual_attendance: 2520000,
      },
      {
        park_name: "Chessington World of Adventures",
        year_opened: 1987,
        annual_attendance: 1400000,
      },
      {
        park_name: "Tivoli Gardens",
        year_opened: 1843,
        annual_attendance: 3972000,
      },
    ];

    const expected = [
      ["Thorpe Park", 1979, 1700000],
      ["Alton Towers", 1980, 2520000],
      ["Chessington World of Adventures", 1987, 1400000],
      ["Tivoli Gardens", 1843, 3972000],
    ];

    expect(arrangeParksData(input)).toEqual(expected);
  });
});

describe("prepareRidesData", () => {
  test("should return an empty array when passed an empty array", () => {
    expect(prepareRidesData([])).toEqual([]);
  });
  test("should return a new reference in memory", () => {
    const input = [];
    expect(prepareRidesData(input)).not.toBe(input);
  });
  test("should not mutate the passed array", () => {
    const ridesInput = [
      {
        ride_name: "Colossus",
        year_opened: 2002,
        park_name: "Thorpe Park",
        votes: 5,
      },
      {
        ride_name: "Stealth",
        year_opened: 2006,
        park_name: "Thorpe Park",
        votes: 4,
      },
    ];
    const ridesInputCopy = [
      {
        ride_name: "Colossus",
        year_opened: 2002,
        park_name: "Thorpe Park",
        votes: 5,
      },
      {
        ride_name: "Stealth",
        year_opened: 2006,
        park_name: "Thorpe Park",
        votes: 4,
      },
    ];
    const parksInput = [
      {
        park_id: 1,
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
    ];
    const parksInputCopy = [
      {
        park_id: 1,
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
    ];

    prepareRidesData(ridesInput, parksInput);

    expect(ridesInput).toEqual(ridesInputCopy);
    expect(parksInput).toEqual(parksInputCopy);
  });
  test("should return a correctly formatted output when passed a single ride and park", () => {
    const ridesInput = [
      {
        ride_name: "Colossus",
        year_opened: 2002,
        park_name: "Thorpe Park",
        votes: 5,
      },
    ];
    const parksInput = [
      {
        park_id: 1,
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
    ];

    const expected = [["Colossus", 2002, 1, 5]];

    expect(prepareRidesData(ridesInput, parksInput)).toEqual(expected);
  });
  test("should return a correctly formatted output when passed two rides with same park_name", () => {
    const ridesInput = [
      {
        ride_name: "Colossus",
        year_opened: 2002,
        park_name: "Thorpe Park",
        votes: 5,
      },
      {
        ride_name: "Stealth",
        year_opened: 2006,
        park_name: "Thorpe Park",
        votes: 4,
      },
    ];

    const parksInput = [
      {
        park_id: 1,
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
    ];

    const expected = [
      ["Colossus", 2002, 1, 5],
      ["Stealth", 2006, 1, 4],
    ];

    expect(prepareRidesData(ridesInput, parksInput)).toEqual(expected);
  });
  test("should return a correctly formatted output when passed multiple rides with different park_ids", () => {
    const ridesInput = [
      {
        ride_name: "Colossus",
        year_opened: 2002,
        park_name: "Thorpe Park",
        votes: 5,
      },
      {
        ride_name: "Stealth",
        year_opened: 2006,
        park_name: "Thorpe Park",
        votes: 4,
      },
      {
        ride_name: "Nemesis",
        year_opened: 1994,
        park_name: "Alton Towers",
        votes: 5,
      },
      {
        ride_name: "KOBRA",
        year_opened: 2010,
        park_name: "Chessington World of Adventures",
        votes: 1,
      },
      {
        ride_name: "Tiny Truckers",
        year_opened: 1994,
        park_name: "Chessington World of Adventures",
        votes: 2,
      },
      {
        ride_name: "The Demon",
        year_opened: 2004,
        park_name: "Tivoli Gardens",
        votes: 8,
      },
    ];

    const parksInput = [
      {
        park_id: 1,
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
      {
        park_id: 2,
        park_name: "Alton Towers",
        year_opened: 1980,
        annual_attendance: 2520000,
      },
      {
        park_id: 3,
        park_name: "Chessington World of Adventures",
        year_opened: 1987,
        annual_attendance: 1400000,
      },
      {
        park_id: 4,
        park_name: "Tivoli Gardens",
        year_opened: 1843,
        annual_attendance: 3972000,
      },
    ];

    const expected = [
      ["Colossus", 2002, 1, 5],
      ["Stealth", 2006, 1, 4],
      ["Nemesis", 1994, 2, 5],
      ["KOBRA", 2010, 3, 1],
      ["Tiny Truckers", 1994, 3, 2],
      ["The Demon", 2004, 4, 8],
    ];

    expect(prepareRidesData(ridesInput, parksInput)).toEqual(expected);
  });
  test("should ignore unneeded park_ids", () => {
    const ridesInput = [
      {
        ride_name: "KOBRA",
        year_opened: 2010,
        park_name: "Chessington World of Adventures",
        votes: 1,
      },
      {
        ride_name: "Colossus",
        year_opened: 2002,
        park_name: "Thorpe Park",
        votes: 5,
      },
    ];

    const parksInput = [
      {
        park_id: 1,
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
      {
        park_id: 2,
        park_name: "Alton Towers",
        year_opened: 1980,
        annual_attendance: 2520000,
      },
      {
        park_id: 3,
        park_name: "Chessington World of Adventures",
        year_opened: 1987,
        annual_attendance: 1400000,
      },
      {
        park_id: 4,
        park_name: "Tivoli Gardens",
        year_opened: 1843,
        annual_attendance: 3972000,
      },
    ];

    const expected = [
      ["KOBRA", 2010, 3, 1],
      ["Colossus", 2002, 1, 5],
    ];

    expect(prepareRidesData(ridesInput, parksInput)).toEqual(expected);
  });
});
