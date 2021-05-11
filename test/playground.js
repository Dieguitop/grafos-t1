const _ = require("lodash");
const { Grafo, Trayecto } = require("../lib/grafo/grafo.js");
const { casos } = require("./casos.js");

let caso = casos[2];
let grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

console.log(grafo.hamiltoniano());

caso = casos[6];
grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

console.log(grafo.hamiltoniano());
console.log(grafo.esHamiltoniano);
