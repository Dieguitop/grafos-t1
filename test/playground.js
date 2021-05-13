const _ = require("lodash");
const { Grafo, Trayecto, Direccion } = require("../lib/grafo/grafo.js");
const { grafos } = require("./grafos-prueba.js");

let { listaDeAdyacencia, esDirigido } = grafos[8];
let grafo = new Grafo(listaDeAdyacencia, esDirigido);

console.log(grafo.caminoMasCorto(0, 1));
