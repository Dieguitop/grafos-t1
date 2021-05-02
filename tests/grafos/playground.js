const { Grafo } = require('../../src/grafos/grafo.js');
const { Arista } = require('../../src/grafos/arista.js');

const { casos } = require('./casos.js');

var caso = casos[2];
var grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

// console.log(grafo.listaDeAristas);
// console.log(grafo.matrizDeAdyacencia);
// console.log(grafo.matrizDeCaminos);
console.log(grafo.caminoMasCorto(0, 4));
console.log(grafo.adyacentes(0));

caso = casos[2];
grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

console.log(grafo.arbolGeneradorMinimo());

// console.log(grafo.adyacentes(0));
// console.log([...grafo.listaDeAdyacencia.values()]);
// console.log(grafo.esPonderado);
// console.log(grafo.nodos);
// console.log(grafo.matrizDeCaminos);
// console.log(grafo.caminoMasCorto(1, 2));

// const nodos = grafo.nodos;
// for (const i of nodos) {
//   for (const j of nodos) {
//     console.log(grafo.caminoMasCorto(i, j));
//   }
// }

// http://graphonline.ru/en/?graph=yCwrHsuyoKLJwmcw
grafo = Grafo.desdeListaDeAristas([
  new Arista(0, 1, 2),
  new Arista(0, 2, 3),
  new Arista(0, 3, 3),
  new Arista(1, 2, 4),
  new Arista(1, 4, 3),
  new Arista(2, 3, 5),
  new Arista(2, 4, 1),
  new Arista(3, 5, 7),
  new Arista(4, 5, 8),
  new Arista(5, 6, 9)
]);

console.log(grafo.arbolGeneradorMinimo());
