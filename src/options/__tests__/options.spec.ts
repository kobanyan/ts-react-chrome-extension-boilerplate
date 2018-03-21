import * as path from 'path';
import { Page } from 'puppeteer';
const page: Page = global['page'];

jest.setTimeout(10000);
let id: string;

beforeAll(async () => {
  const extPath = path.resolve('build/lib');
  await page.goto('chrome://extensions', { waitUntil: 'networkidle2' });
  id = await page.evaluate(() => {
    const em = document.getElementsByTagName('extensions-manager')[0];
    const vm = em!.shadowRoot!.querySelector('#viewManager');
    const il = vm!.querySelector('#items-list');
    const ext = il!.shadowRoot!.querySelectorAll('extensions-item')[0];
    return ext.id;
  });
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
});
