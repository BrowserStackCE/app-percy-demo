const Page = require("./page");

class SettingsPage extends Page {
  get btnUrlTab() {
    return $("~url-tab");
  }

  get txtUrlInput() {
    return $("~url-input");
  }

  get btnUpdateConfiguration() {
    return $("~update-configuration-button");
  }

  async openUrlTab() {
    await (await this.btnUrlTab).click();
  }

  async setUrl(url) {
    await (await this.txtUrlInput).setValue(url);
  }

  async updateConfiguration() {
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
    await (await this.btnUpdateConfiguration).click();
  }
}

module.exports = new SettingsPage();
