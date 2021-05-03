const { Grafo } = require('../../src/grafos/grafo.js');
const { Arista } = require('../../src/grafos/arista.js');

const { casos } = require('./casos.js');

var caso = casos[2];
var grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

console.log(grafo.adyacentes(0));
console.log(grafo.eliminarArista(0, 3));
console.log(grafo.adyacentes(0));
