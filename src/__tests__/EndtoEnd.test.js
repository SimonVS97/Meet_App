import puppeteer from 'puppeteer';

describe('show//hide an events details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(3000);
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });
  afterAll(async () => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {

    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeNull();

  });
  test('User can expand an event to see its details', async () => {

    await page.click('.event .showDetailsButton');

    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeDefined();

  });
  test('User can collagpse an event to hide its details', async () => {
    await page.click('.event .hideDetailsButton');
    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeNull();
  });
})