var axios = require("axios");
var { createReadStream } = require("fs");
var FormData = require("form-data");

async function noAppExists(customId) {
  var config = {
    url: `https://api-cloud.browserstack.com/app-automate/recent_apps/${customId}`,
    method: "get",
    auth: {
      username: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
      password:
        process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
    },
  };

  const axios_response = await axios(config);
  console.log(`Response - ${JSON.stringify(axios_response.data)}`);
  return JSON.stringify(axios_response.data).includes("No results found");
}

async function uploadApp(appPath, customId) {
  const formData = new FormData();
  const appPathFS = createReadStream(appPath);

  formData.append("file", appPathFS);
  formData.append("custom_id", customId);

  var config = {
    url: "https://api-cloud.browserstack.com/app-automate/upload",
    method: "post",
    headers: formData.getHeaders(),
    auth: {
      username: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
      password:
        process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
    },

    data: formData,
  };

  const axios_response = await axios(config);
  console.log(
    `App Uploaded Successfully with response - ${axios_response.data.app_url}`
  );
}

async function main() {
  //upload Android App
  if (await noAppExists("BStackAppAndroidChanged")) {
    await uploadApp(
      "./app/browserstack-demoapp-changed.apk",
      "BStackAppAndroidChanged"
    );
  }
  // //Upload iOS App
  if (await noAppExists("BStackAppIOS")) {
    await uploadApp("./app/browserstack-demoapp.ipa", "BStackAppIOS");
  }
}

main();
