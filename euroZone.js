class Eurozone {
  constructor(info) {
    this.info = info;
    this.matrix = Array.from(Array(11), () => Array(11).fill(0));
    this.countries = [];
  }
  toDoLifeCycle() {
    if (this.countries.length == 1) {
      return [{ country: this.countries[0].name, days: 0 }];
    }
    this.toAddDay();
    while (!this.isCompletenessEurozone()) {
      this.toRunEconomy();
      this.checkAllCompletenessEuroZone();
      this.toAddDay();
    }
    let result = [];
    this.countries.forEach((country) => {
      let obj = { country: country.name, days: country.days };
      result.push(obj);
    });
    return result;
  }
  toAddDay() {
    this.countries.forEach((country) => {
      if (country.isCompleteness === false) {
        country.days += 1;
      }
    });
  }
  checkAllCompletenessEuroZone() {
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].checkCompleteness() === true) {
        this.countries[i].isCompleteness = true;
      }
    }
  }
  isCompletenessEurozone() {
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].isCompleteness === false) {
        return false;
      }
    }
    return true;
  }

  toRunEconomy() {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        if (this.matrix[i][j] !== 0) {
          if (i !== 10 && this.matrix[i + 1][j] !== 0) {
            this.matrix[i][j].giveMoneyToANeighbor(this.matrix[i + 1][j]);
          }
          if (i !== 1 && this.matrix[i - 1][j] !== 0) {
            this.matrix[i][j].giveMoneyToANeighbor(this.matrix[i - 1][j]);
          }
          if (j !== 10 && this.matrix[i][j + 1] !== 0) {
            this.matrix[i][j].giveMoneyToANeighbor(this.matrix[i][j + 1]);
          }
          if (j !== 1 && this.matrix[i][j - 1] !== 0) {
            this.matrix[i][j].giveMoneyToANeighbor(this.matrix[i][j - 1]);
          }
        }
      }
    }
    for (let i = 0; i < this.countries.length; i++) {
      this.countries[i].goFromBufferToRealAccount();
    }
  }
  addCountry(country) {
    for (let i = country.xl; i <= country.xh; i++) {
      for (let j = country.yl; j <= country.yh; j++) {
        if (this.matrix[i][j] !== 0) {
          throw new Error("Countries can't cross!");
        }
        this.matrix[i][j] = country.getCityWithCoord(i, j);
      }
    }
    this.countries.push(country);
  }
  checkAllCountries() {
    if (this.countries.length === 1) {
      return true;
    }
    for (let i = 0; i < this.countries.length; i++) {
      let currentCountry = this.countries[i];
      let hasNeighbor = false;
      for (let j = 0; j < this.countries.length; j++) {
        if (i !== j) {
          let otherCountry = this.countries[j];
          if (this.checkNeighboringNodes(currentCountry, otherCountry)) {
            hasNeighbor = true;
            break;
          }
        }
      }
      if (!hasNeighbor) {
        return false;
      }
    }
    return true;
  }

  checkNeighboringNodes(rect1, rect2) {
    // перевіряємо, чи мають прямокутні області спільні вузли
    if (
      rect1.xl <= rect2.xh &&
      rect1.xh >= rect2.xl &&
      rect1.yl <= rect2.yh &&
      rect1.yh >= rect2.yl
    ) {
      throw new Error("Rectangular areas have common nodes!");
    }
    // перевіряємо, чи мають прямокутні області сусідні вузли
    if (
      (rect1.xl === rect2.xh + 1 &&
        rect1.yl <= rect2.yh &&
        rect1.yh >= rect2.yl) || // сусідній зліва
      (rect1.yl === rect2.yh + 1 &&
        rect1.xl <= rect2.xh &&
        rect1.xh >= rect2.xl) || // сусідній знизу
      (rect1.xh === rect2.xl - 1 &&
        rect1.yl <= rect2.yh &&
        rect1.yh >= rect2.yl) || // сусідній справа
      (rect1.yh === rect2.yl - 1 &&
        rect1.xl <= rect2.xh &&
        rect1.xh >= rect2.xl) // сусідній зверху
    )
      return true;
    return false;
  }
}
module.exports = Eurozone;
