import { allure } from "allure-mocha/runtime";
import { Builder, By, until, Key } from 'selenium-webdriver';
import { expect } from 'chai';

// ES Module兼容方案
global.allure = allure;
describe("Example Test Suite", () => {
  it("should work", () => {
    // 确保Allure API可用
    if (!global.allure) {
      console.error('Allure API not available in this context');
      return;
    }
    
    global.allure.epic("Example Epic");
    global.allure.feature("Authentication");
    
    global.allure.step("Step 1: Perform action", () => {
      console.log("Executing step 1");
    });
    
    const result = true;
    expect(result).to.be.true;
  });
});

describe('电影搜索页面测试', function () {
  let driver;
  this.timeout(30000); // 增加超时时间

  before(async () => {
    // 添加Allure环境标签
    global.allure.epic("电影系统测试");
    global.allure.feature("搜索功能");
    
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('首页点击搜索框可以跳转到搜索页', async () => {
    try{
        global.allure.story("搜索页面导航");
        
        await driver.get('https://movie-d.juyoufuli.com/');
        const searchInput = await driver.wait(until.elementLocated(By.className('seearchContent')), 10000);
        await searchInput.click();
        
        await driver.wait(until.urlContains('searchPage'), 10000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('searchPage');
        
        // 添加截图附件
        const screenshot = await driver.takeScreenshot();
        global.allure.attachment("首页截图", Buffer.from(screenshot, 'base64'), 'image/png');
        
        console.log('✅ 测试通过：成功跳转到搜索页面！');
      } catch (e) {
        console.error(e);
        throw e;
    }
    
  });

  it('搜索少年的你，现实搜索结果', async function() {
    try{
      global.allure.story("关键词搜索");
        this.timeout(15000); // 单个测试增加超时
        
        const searchInput = await driver.wait(until.elementLocated(By.className('searchInput')), 5000);
        await searchInput.clear();
        await searchInput.sendKeys('少年的你', Key.RETURN);
        
        const searchBtn = await driver.wait(until.elementLocated(By.className('searchBtn')), 5000);
        await searchBtn.click();
        
        // 使用显式等待替代sleep
        await driver.wait(until.elementLocated(By.className('buy')), 10000);
        const results = await driver.findElements(By.className('buy'));
        
        // 添加搜索结果的文本附件
        const resultText = `找到 ${results.length} 个结果`;
        global.allure.attachment("搜索结果", resultText, "text/plain");
        
        expect(results.length).to.be.above(0);
        console.log('✅ 测试通过：现实搜索结果成功！');
    }catch{
      console.error(e);
      throw e;
    }
  })
});