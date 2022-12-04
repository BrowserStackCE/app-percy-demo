const Page = require("./page");

class LoginPage extends Page {
  get loginForm() {
    return $("~login-form");
  }

  get ddUsername() {
    return $("~username-input");
  }

  optionUsername(username) {
    return $(`//*[@text = '${username}']`);
  }

  get ddPassword() {
    return $("~password-input");
  }

  optionPassword(password) {
    return $(`//*[@text = '${password}']`);
  }

  get btnSubmit() {
    return $("~login-btn");
  }

  get txtLoginError() {
    return $("~api-error");
  }

  get btnDone() {
    return $("~done_button");
  }

  get iOSPickerWheel() {
    return $("-ios predicate string:type == 'XCUIElementTypePickerWheel'");
  }

  async login(username, password) {
    let isIOS = driver.isIOS;
    await this.loginForm.waitForDisplayed({ timeout: 3000 });
    await this.ddUsername.click();
    if(isIOS) {
      await this.iOSPickerWheel.addValue(username);
      await this.btnDone.click();
    } else {
      await this.optionUsername(username).click();
    }
    await this.ddPassword.click();
    if(isIOS) {
      await this.iOSPickerWheel.addValue(password);
      await this.btnDone.click();
    } else {
      await this.optionPassword(password).click();
    }
    await this.btnSubmit.click();
  }
}

module.exports = new LoginPage();
