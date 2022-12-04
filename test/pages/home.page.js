const Page = require("./page");

class HomePage extends Page {
  get btnMenu() {
    return $("~menu");
  }

  menuOption(option) {
    if(driver.isIOS){
      return $(`id=${option}`);
    }else {
      return $(`//*[@text = '${option}']`);
    }
    
  }

  get btnSignIn() {
    return $("~nav-signin");
  }

  get txtLoggedInUser() {
    return $("~username");
  }

  get btnLogout() {
    return $("~nav-logout");
  }

  favouriteProduct(product) {
    return $(`~${product}`);
  }

  btnAddToCart(product) {
    return $(`~${product}`);
  }

  get cart() {
    return $("~nav-cart");
  }

  get btnFilter() {
    return $("~filter-btn");
  }

  get btnLowToHigh() {
    return $("~Low to High");
  }

  get btnVendor() {
    return $("~Apple");
  }

  get productList() {
    return $$(
      "//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup"
    );
  }

  get listEnd() {
    return $("~end-of-list");
  }

  async openLoginForm() {
    await this.btnMenu.waitForDisplayed({ timeout: 5000 });
    await this.btnMenu.click();
    await this.btnSignIn.click();
  }

  async openMenu() {
    await this.btnMenu.click();
  }

  async selectMenuOption(option) {
    await this.menuOption(option).click();
  }

  async markProductFavourite(product) {
    const element = await this.favouriteProduct(product);
    await element.click();
  }

  async addToCart(product) {
    const element = await this.btnAddToCart(product);
    await element.click();
  }

  async logout() {
    await (await this.btnLogout).click();
  }

  async scrollAndGetDetails() {
    let titlePriceList = new Set();
    while (!(await (await this.listEnd).isDisplayed())) {
      const productListOnScreen = await this.productList;
      productListOnScreen.forEach(async (product, index) => {
        let singleProduct = await product;
        let titlePrice = {};
        let priceElem = await singleProduct.$('//*[@content-desc="price"]');
        let titleElem = await singleProduct.$("~title");
        let priceExists = await priceElem.isExisting();
        let titleExists = await titleElem.isExisting();

        if ((await priceExists) && (await titleExists)) {
          titlePrice["productPrice"] = parseFloat(
            (await priceElem.getText()).split(" ")[1]
          );
          titlePrice["productTitle"] = await titleElem.getText();
          titlePriceList.add(JSON.stringify(titlePrice));
        }
      });
      await driver.pause(2000);
      if(driver.isIOS){
        swipePercent = { start: 30, end: 20 };
      } else{
        swipePercent = { start: 80, end: 20 };
      }
      await this.scroll({ anchor: "x" }, swipePercent);
    }
    return titlePriceList;
  }

  async scrollAndAddToCart(product) {

      await this.scrollToElement(
        { anchor: "x" },
        await this.btnAddToCart(product)
      );
    
    await this.addToCart(product);
  }
}
module.exports = new HomePage();
