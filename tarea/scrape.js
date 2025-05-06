// scrape.js
import puppeteer from "puppeteer";
import fs from "fs";
import { IDS } from "./ids.js"; // Import the list of IDs

// Function to introduce a delay (like sleep)
const delay = async (time = 2000) => await new Promise((resolve) => setTimeout(resolve, time));

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  await delay(4000);

  const url = "https://datos.sinim.gov.cl/ficha_comunal.php";
  await delay(4000);
  const page = await browser.newPage();
  await delay(4000);

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await delay(4000);

  await page.hover("#bar > nav > dl > dt > a");
  await delay(4000);
  await page.click("#municipio_chzn > a");
  await delay(3000);

  // Loop through all IDs and capture their HTML content
  for (const id of IDS) {
    try {
      console.log(`Processing ID: ${id}`);

      // Click the ID element
      await page.click(`#${id}`);
      console.log(`Selected: ${id}`);

      // Wait for content to load
      await page.waitForTimeout(3000);

      // Get HTML content from the page
      const html = await page.content();
      console.log(`HTML content for ${id} loaded.`);

      // Save the HTML content to a file
      const htmlFileName = `htmls/${id}.html`;
      fs.writeFileSync(htmlFileName, html);
      console.log(`Saved HTML of ${id} to ${htmlFileName}`);

    } catch (error) {
      console.error(`Error processing ID ${id}:`, error);
      // Save the HTML content in case of error
      const html = await page.content();
      const errorFileName = `htmls/${id}_error.html`;
      fs.writeFileSync(errorFileName, html);
      console.log(`Saved error HTML of ${id} to ${errorFileName}`);
    }
  }

  console.log("Closing browser...");
  await browser.close();
})();
