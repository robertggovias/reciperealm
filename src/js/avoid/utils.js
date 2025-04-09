export function createElement(tipo, textos = {}, filho = []) {
  const pepito = document.createElement(tipo);

  // textos: {textContent: "Hello world!", id: "header1", "data-productId": 123, ...}
  Object.entries(textos).forEach(([nombre, valor]) => {
    if(~nombre.indexOf('-')) {
      pepito.setAttribute(nombre, valor); // data attributes
    } else {
      pepito[nombre] = valor;
    }
  });

  filho.forEach((hijo) => {
    pepito.appendChild(hijo);
  });

  return pepito;
}