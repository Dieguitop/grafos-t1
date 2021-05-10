const _ = require("lodash");
const { Grafo, Direccion } = require("../lib/grafo/grafo.js");
const { casos } = require("./casos.js");

let caso = casos[6];
let grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

// console.log(grafo.matrizDeAdyacencia);
console.log(grafo.arista(5, 2, Direccion.entrada));
