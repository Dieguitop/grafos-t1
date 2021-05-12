const _ = require("lodash");
const { Grafo, Trayecto, Direccion } = require("../lib/grafo/grafo.js");
const { casos } = require("./casos.js");

let caso = casos[6];
let grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

console.log(grafo.adyacentes(5, Direccion.salida));
