const _ = require("lodash");
const { Grafo } = require("../lib/grafo/grafo.js");
const { casos } = require("./casos.js");

let caso = casos[0];
let grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

// console.log(grafo.matrizDeAdyacencia);
console.log(grafo.adyacentes(0));
