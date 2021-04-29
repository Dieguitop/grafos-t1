const { Grafo } = require('../../src/grafos/grafo.js');

const casos = require('./casos.json');

const caso = casos[0];
const grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

console.log(grafo.adyacencias(0));
console.log([...grafo.listaDeAdyacencia.values()]);
console.log(grafo.esPonderado);
console.log(grafo.nodos);
