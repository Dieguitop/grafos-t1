const _ = require("lodash");
const { Grafo, Trayecto, Direccion, Arista } = require("../lib/grafo/grafo.js");
const { grafos } = require("./grafos-prueba.js");

function mostrar(grafos) {
  for (const prueba of grafos) {
    let grafo = new Grafo(prueba.listaDeAdyacencia, prueba.esDirigido);
    console.log(`\n${prueba.descripcion}:`);
    console.log(prueba.link);
    console.log("matrizDeCaminos:");
    console.log(grafo.matrizDeCaminos);
    console.log("euleriano: {");
    console.log("camino:");
    console.log(grafo.euleriano(Trayecto.camino));
    console.log("ciclo:");
    console.log(grafo.euleriano(Trayecto.ciclo));
    console.log("},");
    console.log("hamiltoniano: {");
    console.log("camino:");
    console.log(grafo.hamiltoniano(Trayecto.camino));
    console.log("ciclo:");
    console.log(grafo.hamiltoniano(Trayecto.ciclo));
    console.log("}");
    console.log("\n============================================================");
  }
}

mostrar(grafos);
// let { listaDeAdyacencia, esDirigido } = grafos[1];
// let grafo = new Grafo(listaDeAdyacencia, esDirigido);
