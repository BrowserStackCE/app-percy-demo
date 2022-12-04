const Page = require("./page");

class FavouritesPage extends Page {
  get favouritesCount() {
    return $("~number-of-favourites");
  }
}

module.exports = new FavouritesPage();
