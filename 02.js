import * as cheerio from "cheerio";

const html = `
  <div class="producto" data-id="101">
    <h2 class="nombre">Polera</h2>
    <span class="precio">$15000</span>
  </div>
  <div class="producto" data-id="102">
    <h2 class="nombre">Pantalón</h2>
    <span class="precio">$25000</span>
  </div>
`;

const $ = cheerio.load(html);
const nombre =

const products =$('.producto')
                           .map((_,el) => {
                            return {
                              nombre: $(el).find('.nombre').text(),
                              precio: $(el).find('.precio').text(),
                            }
                          }
                        ).get()
console.log(products)
