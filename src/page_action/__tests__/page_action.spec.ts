import * as puppeteer from 'puppeteer';
import * as path from 'path';

jest.setTimeout(10000);
let page: puppeteer.Page;
let browser: puppeteer.Browser;
let id: string;

beforeAll(async () => {
  const extPath = path.resolve('build/lib');
  console.log(extPath);
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    timeout: 0,
    args: [`--lang=ja`, `--disable-extensions-except=${extPath}`, `--load-extension=${extPath}`],
  });
  page = await browser.newPage();
  await page.goto('chrome://extensions', { waitUntil: 'networkidle2' });
  id = await page.evaluate(() => {
    const em = document.getElementsByTagName('extensions-manager')[0];
    const vm = em!.shadowRoot!.querySelector('#viewManager');
    const il = vm!.querySelector('#items-list');
    const ext = il!.shadowRoot!.querySelectorAll('extensions-item')[0];
    return ext.id;
  });
});

afterAll(() => {
  browser.close();
});

describe('page_action page', () => {
  it('should have title', async () => {
    await page.goto(`chrome-extension://${id}/page_action/page_action.html`, { waitUntil: 'networkidle2' });
    const title = await page.title();
    expect(title).toEqual('My Typescript App');
  });
  it('should have message', async () => {
    const message = await page.$('p');
    const textContentHandle = await message!.getProperty('textContent');
    expect(await textContentHandle.jsonValue()).toEqual('This is a popup of page action!');
  });
});
