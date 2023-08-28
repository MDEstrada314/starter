const fs = require('fs')

const textInt = fs.readFileSync('./txt/input.txt','utf-8')


const textOut = `esto es lo que sabemos de los aguacates: ${textInt}.\nCreted on ${Date.now()}`
fs.writeFileSync('./txt/output.txt', textOut)


const textInt2 = fs.readFileSync('./txt/output.txt','utf-8')
console.log(textInt2);
console.log('File written');