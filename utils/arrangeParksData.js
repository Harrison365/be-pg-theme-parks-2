function arrangeParksData(parksData) {
  return parksData.map(({ park_name, year_opened, annual_attendance }) => [
    park_name,
    year_opened,
    annual_attendance,
  ]);
}

module.exports = arrangeParksData;
