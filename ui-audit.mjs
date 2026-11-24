import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const targets = await fetch('http://localhost:9222/json/list').then((response) => response.json());
const target = targets.find((item) => item.type === 'page' && item.url.startsWith('http://localhost:4321'));
if (!target) throw new Error('No encontré la pestaña local en Chrome.');

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let nextId = 0;
const pending = new Map();
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (!message.id) return;
  const waiter = pending.get(message.id);
  if (!waiter) return;
  pending.delete(message.id);
  message.error ? waiter.reject(new Error(message.error.message)) : waiter.resolve(message.result);
});

function send(method, params = {}) {
  const id = ++nextId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function waitForPage() {
  for (let attempt = 0; attempt < 80; attempt++) {
    const ready = await evaluate("document.readyState === 'complete' && document.documentElement.classList.contains('is-loaded')");
    if (ready) {
      await new Promise((resolve) => setTimeout(resolve, 1750));
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

const cases = [
  { page: 'home', width: 320, height: 720, mobile: true },
  { page: 'home', width: 390, height: 844, mobile: true },
  { page: 'home', width: 768, height: 1024, mobile: true },
  { page: 'home', width: 1024, height: 768, mobile: false },
  { page: 'home', width: 1100, height: 800, mobile: false },
  { page: 'home', width: 1280, height: 800, mobile: false },
  { page: 'home', width: 1366, height: 768, mobile: false },
  { page: 'home', width: 1440, height: 900, mobile: false },
  { page: 'home', width: 1920, height: 1080, mobile: false },
  { page: 'servicios', width: 390, height: 844, mobile: true },
  { page: 'servicios', width: 768, height: 1024, mobile: true },
  { page: 'servicios', width: 1440, height: 900, mobile: false },
];

const results = [];
for (const test of cases) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: test.width,
    height: test.height,
    deviceScaleFactor: 1,
    mobile: test.mobile,
    screenWidth: test.width,
    screenHeight: test.height,
  });
  const url = test.page === 'home' ? 'http://localhost:4321/#inicio' : 'http://localhost:4321/servicios';
  await send('Page.navigate', { url });
  await waitForPage();

  const metrics = await evaluate(`(() => {
    const width = innerWidth;
    const overflow = [...document.querySelectorAll('body *')]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return style.display !== 'none' && rect.width > 0 && (rect.left < -2 || rect.right > width + 2);
      })
      .slice(0, 8)
      .map((element) => ({ tag: element.tagName, id: element.id, className: String(element.className).slice(0, 60), left: Math.round(element.getBoundingClientRect().left), right: Math.round(element.getBoundingClientRect().right) }));
    const headerLogo = document.querySelector('header img[src*="DIZAM%20LOGO%202"]')?.getBoundingClientRect();
    const sections = [...document.querySelectorAll('main > section')].map((section) => ({ id: section.id, height: Math.round(section.clientHeight), scrollHeight: Math.round(section.scrollHeight) }));
    const footer = document.querySelector('.site-footer')?.getBoundingClientRect();
    return {
      viewport: [innerWidth, innerHeight],
      path: location.pathname,
      documentWidth: document.documentElement.scrollWidth,
      overflow,
      headerLogoCenterDelta: headerLogo ? Math.round(headerLogo.left + headerLogo.width / 2 - width / 2) : null,
      sections,
      footer: footer ? { top: Math.round(footer.top), bottom: Math.round(footer.bottom), height: Math.round(footer.height) } : null,
      serviceArticles: document.querySelectorAll('article[id]').length,
    };
  })()`);

  const screenshot = await send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
  const screenshotPath = join(tmpdir(), `dizam-${test.page}-${test.width}x${test.height}.png`);
  await writeFile(screenshotPath, Buffer.from(screenshot.data, 'base64'));
  results.push({ ...metrics, screenshot: screenshotPath });
}

console.log(JSON.stringify(results, null, 2));
socket.close();
