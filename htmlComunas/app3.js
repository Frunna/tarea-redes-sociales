import puppeteer from "puppeteer";
import fs from "fs";
import { IDS } from "./ids.js"; // Importar los IDs desde el archivo ids.js

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  await delay(4000);

  const url = "https://datos.sinim.gov.cl/ficha_comunal.php";
  await delay(4000); // Para evitar bloqueos, 10000 es 10s
  const page = await browser.newPage(); // Crear una nueva página
  await delay(4000);

  await page.goto(url, { waitUntil: "domcontentloaded" }); // Esperar a que se cargue el contenido
  await delay(4000);

  // Hover para mostrar opciones
  await page.hover("#bar > nav > dl > dt > a");
  await delay(4000);

  // Click en el menú desplegable
  await page.click("#municipio_chzn > a");
  await delay(3000);

  for (const id of IDS) {
    try {
      console.log(`Procesando ID: ${id}`);

      // Intentar hacer clic en el elemento
      await page.click(`#${id}`);
      console.log(`Seleccionado: ${id}`);

      // Esperar un tiempo para que el contenido cargue
      await page.waitForTimeout(3000);

      // Obtener el contenido HTML de la página
      const html = await page.content();
      console.log(`Contenido HTML de ${id} cargado.`);

      // Guardar el contenido en un archivo
      const fileName = `${id}.html`;
      fs.writeFileSync(fileName, html);
      console.log(`Guardado el HTML de ${id} en ${fileName}`);
    } catch (error) {
      if (error.message.includes("detached Frame")) {
        console.error(
          `Error procesando ID ${id}: El frame se ha desconectado. Intentando capturar el contenido de la página.`
        );
      } else {
        console.error(`Error procesando ID ${id}:`, error);
      }

      // Intentar capturar el contenido de la página incluso en caso de error
      try {
        const html = await page.content();
        const fileName = `${id}_error.html`;
        fs.writeFileSync(fileName, html);
        console.log(
          `Guardado el HTML de ${id} en ${fileName} tras el error.`
        );
      } catch (innerError) {
        console.error(
          `No se pudo capturar el contenido de la página para ID ${id}:`,
          innerError
        );
      }
    }
  }

  console.log("Cierra el navegador...");
  await browser.close();
})();

const delay = async (time = 2000) =>
  await new Promise((resolve) => setTimeout(resolve, time));