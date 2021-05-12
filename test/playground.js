const _ = require("lodash");
const { Grafo, Trayecto } = require("../lib/grafo/grafo.js");
const { casos } = require("./casos.js");

let caso = casos[8];
let grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

console.log(grafo.flujoMaximo(2, 3));
