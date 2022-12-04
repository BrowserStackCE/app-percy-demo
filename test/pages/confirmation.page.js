const Page = require("./page");

class ConfirmationPage extends Page {
  get btnContinueShopping() {
    return $("~continue-btn");
  }

  async clickContinue(){
    await this.btnContinueShopping.click();
  }
}

module.exports = new ConfirmationPage();
