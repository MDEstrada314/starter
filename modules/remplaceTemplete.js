module.exports = (temp, product) => {
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



  