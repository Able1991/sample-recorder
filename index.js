const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-gpu",
      "--renderer",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--no-service-autorun",
      "--no-experiments",
      "--no-default-browser-check",
      "--disable-dev-shm-usage",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-extensions",
      "--disable-web-security",
      "--disable-permissions-api",
      "--disable-sync",
      "--autoplay-policy=no-user-gesture-required",
      "--disable-dev-shm-usage",
      "--disable-gl-drawing-for-tests",
      "--disable-accelerated-2d-canvas",
      "--disable-canvas-aa",
      "--disable-2d-canvas-clip-aa",
      "--disable-web-security",
      "--disable-desktop-notifications",
      "--disable-extensions",
      "--disable-gpu-driver-bug-workarounds",
      "--blink-settings=imagesEnabled=false",
      '--window-size=1920,1080',
    ],
  });
  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page,{
    // fps: 50,
    videoFrame: {
      width: 1920,
      height: 1080,
    },
  });
  await page.goto('https://hcosp.csb.app');

  await page.waitFor(10000);

  await recorder.start('./sample.mp4'); // supports extension - mp4, avi, webm and mov
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 20000)
  })

  await recorder.stop();
  await browser.close();
})();