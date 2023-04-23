const City = require("./city");
class Country {
  constructor(name, xl, yl, xh, yh, parent) {
    if (
      xl < 1 ||
      xl > 10 ||
      yl < 1 ||
      yl > 10 ||
      xh < 1 ||
      xh > 10 ||
      yh < 1 ||
      yh > 10
    ) {
      throw new Error(
        "Invalid country coordinates. Enter coordinates in the range from 1 to 10."
      );
    }
    if (xl > xh || yl > yh) {
      throw new Error(
        "The coordinate range is incorrect. Make sure that xl <= xh and yl <= yh."
      );
    }
    this.parent = parent;
    this.name = name;
    this.xl = xl;
    this.yl = yl;
    this.xh = xh;
    this.yh = yh;
    this.days = 0;
    this.isCompleteness = false;
    this.cities = [];

    for (let i = xl; i <= xh; i++) {
      for (let j = yl; j <= yh; j++) {
        this.cities.push(new City(i, j, this));
      }
    }
  }
  goFromBufferToRealAccount() {
    for (let i = 0; i < this.cities.length; i++) {
      this.cities[i].goFromBufferToRealAccount();
    }
  }
  checkCompleteness() {
	if(this.isCompleteness == true){
		return true;
	}
    for (let i = 0; i < this.cities.length; i++) {
      if (!this.cities[i].checkCompleteness()) {
        return false;
      }
    }
    this.isCompleteness = true;
    return true;
  }
  getCityWithCoord(x, y) {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].x == x && this.cities[i].y == y) {
        return this.cities[i];
      }
    }
  }
}
module.exports = Country;
