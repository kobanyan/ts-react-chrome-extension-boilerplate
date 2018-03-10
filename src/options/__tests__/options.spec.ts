import * as puppeteer from 'puppeteer';
import * as path from 'path';

const sel = (id: string) => `[data-test="${id}"]`;

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

describe('options page', () => {
  it('should have title', async () => {
    await page.goto(`chrome-extension://${id}/options/options.html`, { waitUntil: 'networkidle2' });
    const title = await page.title();
    expect(title).toEqual('My Test Extension Options');
  });
  it('should show red as default color', async () => {
    const color = await page.$('#color');
    const valueHandle = await color!.getProperty('value');
    expect(await valueHandle.jsonValue()).toEqual('red');
  });
  it('should be able to select green', async () => {
    await page.select('#color', 'green');
    const color = await page.$('#color');
    const valueHandle = await color!.getProperty('value');
    expect(await valueHandle.jsonValue()).toEqual('green');
  });
  it('should show unchecked like', async () => {
    const like = await page.$('#like');
    const likeHandle = await like!.getProperty('checked');
    expect(await likeHandle.jsonValue()).toEqual(false);
  });
  it('should be able to check like', async () => {
    await page.click('#like');
    const like = await page.$('#like');
    const likeHandle = await like!.getProperty('checked');
    expect(await likeHandle.jsonValue()).toEqual(true);
  });
  // it('should show the message after clicking save', async () => {
  //   await page.click('#save');
  //   // https://github.com/GoogleChrome/puppeteer/issues/1229
  //   const status = await page.waitForSelector('#status', {visible: true});
  //   const statusHandle = await status.getProperty('text');
  //   expect(await statusHandle.jsonValue()).toEqual('Options saved.');
  // });
});