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
