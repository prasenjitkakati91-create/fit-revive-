import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  async function getVideo(url) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    const src = await page.evaluate(() => {
      const source = document.querySelector('video source');
      return source ? source.src : null;
    });
    console.log(url, "->", src);
  }

  await getVideo('https://www.pexels.com/video/electrotherapy-session-for-muscle-rehabilitation-30352918/');
  await getVideo('https://www.pexels.com/video/a-professional-taping-a-person-s-shoulder-5793445/');
  
  await browser.close();
}

run().catch(console.error);
