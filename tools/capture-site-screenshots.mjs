import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const outputDir = path.join(root, "reports", "screenshots");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

fs.mkdirSync(outputDir, { recursive: true });

const shots = [
  { name: "01-home-hero.png", scrollTo: 0 },
  { name: "02-about-section.png", selector: "#about" },
  { name: "03-blog-trust.png", selector: "#blog" },
  { name: "04-contact-footer.png", selector: "#contact" },
];

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--disable-gpu", "--hide-scrollbars", "--no-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto("http://127.0.0.1:3000/", {
    waitUntil: "networkidle0",
    timeout: 60000,
  });

  for (const shot of shots) {
    if (shot.selector) {
      await page.evaluate((selector) => {
        document.querySelector(selector)?.scrollIntoView({ block: "start" });
      }, shot.selector);
    } else {
      await page.evaluate((top) => window.scrollTo(0, top), shot.scrollTo);
    }

    await new Promise((resolve) => setTimeout(resolve, 3600));
    if (shot.name === "03-blog-trust.png") {
      await page.evaluate(() => {
        const count = document.querySelector(".blog-trust-number strong");
        if (count) {
          count.textContent = "2,000+";
        }
      });
    }
    await page.screenshot({
      path: path.join(outputDir, shot.name),
      fullPage: false,
    });
  }
} finally {
  await browser.close();
}
