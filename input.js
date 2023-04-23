const fs = require("fs");
const Eurozone = require("./euroZone.js");
const Country = require("./country.js");
function readCountriesDataFromFile(fileName) {
  try {
    const fileData = fs.readFileSync(fileName, "utf8");
    // do something with the file data
    const dataRows = fileData.trim().split("\n");
    const countryLists = [];
    let currentList = [];
    let countriesLeftInList = 0;
    let expectedNumCountries = 0;

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i].trim();
      if (row === "0") {
        if (currentList.length > 0) {
          countryLists.push(currentList);
          currentList = [];
        }
        countriesLeftInList = 0;
      } else if (/^\d+$/.test(row)) {
        const numCountries = Number(row);
        if (numCountries > 20) {
          throw new Error(`Too many countries in list: ${numCountries}`);
        }
        expectedNumCountries = numCountries;
        countriesLeftInList = numCountries;
      } else {
        if (countriesLeftInList === 0) {
          throw new Error(`Expected country data but found: ${row}`);
        }
        const [name, xl, yl, xh, yh] = row.split(" ");
        if (
          isNaN(xl) ||
          isNaN(yl) ||
          isNaN(xh) ||
          isNaN(yh) ||
          xl < 1 ||
          yl < 1 ||
          xh < 1 ||
          yh < 1 ||
          xl > 10 ||
          yl > 10 ||
          xh > 10 ||
          yh > 10 ||
          xl > xh ||
          yl > yh
        ) {
          throw new Error(`Invalid country data: ${row}`);
        }
        currentList.push({
          name,
          xl: Number(xl),
          yl: Number(yl),
          xh: Number(xh),
          yh: Number(yh),
        });
        countriesLeftInList--;
        if (countriesLeftInList === 0) {
          if (currentList.length !== expectedNumCountries) {
            throw new Error(
              `Expected ${expectedNumCountries} countries but found ${currentList.length}`
            );
          }
          countryLists.push(currentList);
          currentList = [];
        }
      }
    }
    if (currentList.length > 0 || countriesLeftInList > 0) {
      throw new Error("File format incorrect");
    }
    return countryLists;
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("File not found!");
    } else {
      console.error("Error reading file:", err);
    }
  }
}

function loadData(filepath) {
  let arr = [];
  let inputMatrix = readCountriesDataFromFile(filepath);

  inputMatrix.forEach((row) => {
    let info = [];
    row.forEach((elem) => {
      info.push(elem.name);
    });
    let newZone = new Eurozone(info);

    row.forEach((elem) => {
      let country = new Country(
        elem.name,
        elem.xl,
        elem.yl,
        elem.xh,
        elem.yh,
        newZone
      );
      newZone.addCountry(country);
    });
    if (!newZone.checkAllCountries()) {
      throw Error(
        "Not all countries have courts, which makes it impossible to maximize the distribution of the currency."
      );
    }
    arr.push(newZone);
  });
  return arr;
}
module.exports = loadData;
