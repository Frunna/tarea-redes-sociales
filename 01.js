import * as cheerio from "cheerio";

const html = `
  <html>
    <body>
      <h1 class="title">Bienvenidos</h1>
      <p class="intro">Este es un ejemplo.</p>
      <ul id="items">
        <li class="item">Uno</li>
        <li class="item">Dos</li>
        <li class="item activo" data-id="3">Tres</li>
      </ul>
      <a href="https://example.com" class="link">Visitar</a>
    </body>
  </html>
`;
const $ =cheerio.load(html);

const titulo = $(".title").text();

const parrafo = $("p").text();

const link = $('.link').attr('href');

const firstElement = $('#items li').first().text();

const textos =$('.item').map((_, el) => $(el).text()).get();

const htmlToJson ={
  title:titulo,
  paragraph:parrafo,
  texts:textos
}

console.log(link)
