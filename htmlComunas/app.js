import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });

  await browser.close();
})();

const delay = async (time = 2000) =>
  await new Promise((resolve) => setTimeout(resolve, time));
