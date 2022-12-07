var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  specs: ["./test/specs/e2e.spec.js"],
  services: [["browserstack"]],

  commonCapabilities: {
    "browserstack.debug": true,
    build:
      process.env.BROWSERSTACK_BUILD_NAME ||
      "browserstack-percy-appium-webdriverio" + " - " + new Date().getTime(),
    project: "browserstack-percy-appium-webdriverio",
  },

  capabilities: [
    {
      device: "Google Pixel 7",
      os_version: "13.0",
      app: "BStackAppAndroidChanged",
      autoGrantPermissions: true,
      platformName: "Android",
    },
    {
      device: "Samsung Galaxy A51",
      os_version: "10.0",
      app: "BStackAppAndroidChanged",
      autoGrantPermissions: true,
      platformName: "Android",
    },
    {
      device: "iPhone 12 Pro",
      platformName: "iOS",
      os_version: "14",
      gpsEnabled: "true",
      automationName: "XCUITest",
      app: "BStackAppIOSChanged",
    },
    {
      device: "iPhone 12 Mini",
      platformName: "iOS",
      os_version: "14",
      gpsEnabled: "true",
      automationName: "XCUITest",
      app: "BStackAppIOSChanged",
    },
  ],
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);

tmpConfig.capabilities.forEach((caps) => {
  for (const i in tmpConfig.commonCapabilities)
    caps[i] = caps[i] || tmpConfig.commonCapabilities[i];
});

exports.config = tmpConfig;
