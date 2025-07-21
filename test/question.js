import { Builder ,By, until } from "selenium-webdriver";

const driver = await new Builder().forBrowser('chrome').build();
await driver.get('https://www.baidu.com');
// const inputContent = await driver.findElement(By.id('chat-textarea'),5000);
const inputContent = await driver.wait(until.elementLocated(By.id('chat-textarea'),5000))
console.log(inputContent,'== content')
inputContent.clear();
inputContent.sendKeys('少年的你');

// const button = await driver.findElement(By.id('chat-submit-button'),5000);
const button = await driver.wait(until.elementLocated(By.id('chat-submit-button'),5000))
button.click();
await driver.quit();


