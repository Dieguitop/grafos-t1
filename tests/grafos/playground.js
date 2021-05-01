const { Grafo, Adyacente } = require('../../src/grafos/grafo.js');

const { casos } = require('./casos.js');

var caso = casos[2];
var grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

// console.log(grafo.listaDeAristas);
// console.log(grafo.matrizDeAdyacencia);
// console.log(grafo.matrizDeCaminos);
console.log(grafo.caminoMasCorto(0, 4));
console.log(grafo.adyacentes(0));

caso = casos[3];
grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

// console.log(grafo.adyacentes(0));
// console.log([...grafo.listaDeAdyacencia.values()]);
// console.log(grafo.esPonderado);
// console.log(grafo.nodos);
// console.log(grafo.matrizDeCaminos);
// console.log(grafo.caminoMasCorto(1, 2));

const nodos = grafo.nodos;
for (const i of nodos) {
  for (const j of nodos) {
    console.log(grafo.caminoMasCorto(i, j));
  }
}
