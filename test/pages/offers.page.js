const Page = require("./page");

class OffersPage extends Page {
  get offerList() {
    return $$("~offer");
  }

  get noOffer() {
    return $("~no-offers");
  }

  get allowOnce() {
      return $("id=Allow Once");
  }
}

module.exports = new OffersPage();
