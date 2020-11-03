const wd = require('wd');
const assert = require('assert');
const { Before, Given, When, Then, After } = require('cucumber');

const PORT = 4723;

const config = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: './android/app/build/outputs/apk/debug/app-debug.apk', // relative to root of project
  appPackage: 'com.reactnative_test',
  appActivity: 'com.reactnative_test.MainActivity',
  automationName: 'uiautomator2' 
};
const driver = wd.promiseChainRemote('localhost', PORT);

Before({timeout: 50000}, async () => {
  await driver.init(config);
  await driver.sleep(20000); // wait for app to load
});

After(async() => {
	await driver.quit();
});

Given ('I am in app home page', {timeout: 30000}, async () => {
  let isWelcomeMessage = await driver.hasElementByAccessibilityId("welcome-message");
  assert.equal(isWelcomeMessage, true);
});

When ('I click on "Pressione" button', async () => {
  let loginButton = await driver.elementByAccessibilityId("press-button");
  loginButton.click();
});

// Then ('I see the alert', {timeout: 2000}, async () => {
//   await driver.setImplicitWaitTimeout(1500);
//   let isAlert = await driver.hasElementByXPath("//*[@text='Você apertou o botão']");
//   assert.equal(isAlert, true);
// });

Given ('I am in app middle page', {timeout: 30000}, async () => {
  await driver.setImplicitWaitTimeout(30000);
  let isMiddleMessage = await driver.hasElementByAccessibilityId("middle-message");
  assert.equal(isMiddleMessage, true);
});

When ('I click on "Pressione-Middle" button', async () => {
  let loginButton2 = await driver.elementByAccessibilityId("press-button-middle");
  loginButton2.click();
});

When ('I click on "Pressione-Camera" button', {timeout: 30000}, async () => {
  let loginButton3 = await driver.elementByAccessibilityId("press-button-camera");
  loginButton3.click();
});

// Given ('I am in app end page', {timeout: 30000}, async () => {
//   await driver.setImplicitWaitTimeout(30000);
//   let isEndMessage = await driver.hasElementByAccessibilityId("end-message");
//   assert.equal(isEndMessage, true);
// });

When ('I click on "Pressione-End" button', {timeout: 30000}, async () => {
  let loginButton4 = await driver.elementByAccessibilityId("press-button-end");
  loginButton4.click();
});
