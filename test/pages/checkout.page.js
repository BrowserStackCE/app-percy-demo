const Page = require("./page");

class CheckoutPage extends Page {
  get inpFirstName() {
    return $("~firstNameInput");
  }

  get inpLastName() {
    return $("~lastNameInput");
  }

  get inpAddress() {
    return $("~addressInput");
  }

  get inpState() {
    return $("~stateInput");
  }

  get inpPostalCode() {
    return $("~postalCodeInput");
  }

  get btnCheckout() {
    return $("~submit-btn");
  }

  async enterShippingDetails(firsName, lastName, address, state, postalCode) {
    await driver.pause(1500);
    await (await this.inpFirstName).setValue(firsName);
    await (await this.inpLastName).setValue(lastName);
    await (await this.inpAddress).setValue(address);
    await (await this.inpState).setValue(state);
    await (await this.inpPostalCode).setValue(postalCode);
    if (driver.isIOS) {
      if (driver.config.isSimulator) {
        await driver.touchPerform([
          {
            action: "tap",
            options: {
              x: 500,
              y: 500,
            },
          },
        ]);
      } else {
          await driver.hideKeyboard();
      }
    }
    await (await this.btnCheckout).click();
  }
}

module.exports = new CheckoutPage();
