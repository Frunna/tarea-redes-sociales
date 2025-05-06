import puppeteer from "puppeteer";
import fs from "fs";
import { IDS } from "./ids.js"; // Importar los IDs desde el archivo ids.js

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  await delay(4000);
  let url= "https://datos.sinim.gov.cl/ficha_comunal.php";
  await delay(4000);//para que no nos bloqueen el acceso, 10000 es 10s
  const page = await browser.newPage(); // Crear una nueva página, debemos añadirla con una espera
  await delay(4000);
  page.goto(url, {waitUntil: "domcontentloaded"}); // espera q se carge el contenido
  await delay(4000);
  //hover es que pasa por encima y se venlas opciones
  page.hover("#bar > nav > dl > dt > a"); // Hacer hover sobre un elemento, AHORA LA PAGINA SE PUEDE ABRIR JUNTO CON EL MENU SELECCIONADOR, TECNICA COPY AS SELECTOR
  await delay(4000);
  page.click("#municipio_chzn > a");
  await delay(3000);

  //en lugar de iterar repetitivamente usaremos la f(x)
 /**  page.click("municipio_chzn_o_1");
  await delay(3000);
  page.click("municipio_chzn_o_2");
  await delay(3000);
  page.click("municipio_chzn_o_3");
  await delay(3000);
  page.click("municipio_chzn_o_4");
  await delay(3000);
  page.click("municipio_chzn_o_5");
  await delay(3000);
  page.click("municipio_chzn_o_6");
  await delay(3000);*/

  
  // Ocupamos la funcion en for, click y guardamos el html
 /**  for (const id of IDS) {
    await page.click(id); 
    await delay(10000); 

    const html = await page.content(); // pide el contenido
    const fileName = `${id}.html`; // Crear un nombre de archivo basado en el ID
    fs.writeFileSync(fileName, html); // guarda el contenido
    console.log(`Guardado el HTML de ${id} en ${fileName}`);
  }

  await browser.close(); 
})();*/

//try y catch para que no pare la ejecución si no encuentra el elem o otro error
for (const id of IDS) {
  try {
    console.log(`Procesando ID: ${id}`);

    


    await page.click(`#${id}`);
    console.log(`Seleccionado: ${id}`);


    await page.waitForTimeout(3000);


    const html = await page.content();
    console.log(`Contenido HTML de ${id} cargado.`);


    const fileName = `${id}.html`;
    fs.writeFileSync(fileName, html);
    console.log(`Guardado el HTML de ${id} en ${fileName}`);
  } catch (error) {
    console.error(`Error procesando ID ${id}:`, error);
  }
}

console.log("Cierra el navegador...");
await browser.close();
})();

const delay = async (time = 2000) =>
  await new Promise((resolve) => setTimeout(resolve, time));
