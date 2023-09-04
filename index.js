const fs = require('fs');
const http = require('http');
const url = require('url');

const remplaceTemplete = (temp, product) => {
  let output = temp.replace(/{%PRODUCTONAME%}/g, product.productName);
  output = output.replace(/{%IMAGEN%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%NUTRIENT%}/g, product.nutrients);
  output = output.replace(/{%COUNTRY%}/g, product.from);
  output = output.replace(/{%QUANTY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOTORGANIC%}/g, 'not-organic ');
  }
  return output;
};

const overview = fs.readFileSync('./templates/overview.html', 'utf-8');
const cards = fs.readFileSync('./templates/cards.html', 'utf-8');
const producto = fs.readFileSync('./templates/product.html', 'utf-8');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataJson = JSON.parse(data);

/* const textInt = fs.readFileSync('./txt/input.txt','utf-8')

const textOut = `esto es lo que sabemos de los aguacates: ${textInt}.\nCreted on ${Date.now()}`
fs.writeFileSync('./txt/output.txt', textOut)


const textInt2 = fs.readFileSync('./txt/output.txt','utf-8')
console.log(textInt2);
console.log('File written');


fs.readFile('./txt/start.txt','utf-8', (err,data1)=>{
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
        console.log(data2);
        fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
            console.log(data3);
            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8', err =>{
                console.log('no entendi');

            })
        })
    })
})

console.log('pailas');
 */

const server = http.createServer((req, res) => {
  

  const {pathname,query} = url.parse(req.url, true)


  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const cardsHTML = dataJson.map( el => remplaceTemplete(cards, el)).join('');
   /*  console.log(cardsHTML); */
    const overviewCards = overview.replace('{%CARDS%}',cardsHTML)
    res.end(overviewCards);

  } else if (pathname === '/producto') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const product = dataJson[query.id]
    const output = remplaceTemplete (producto,product)
    res.end(output);

  } else if (pathname === '/api') {
    res.writeHead(200, { ContenType: 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'el-programador-dice': 'pailas se cayo esa cosa',
    });
    res.end('<h1>la pagina no fuchion</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('bueno si funciono');
});
