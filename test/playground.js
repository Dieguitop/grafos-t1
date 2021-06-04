import _ from 'lodash-es';
import { Grafo, Trayecto } from '../src/lib/grafo/grafo.js';
import { grafos } from './grafos-prueba.js';

function mostrar(grafos) {
  for (const prueba of grafos) {
    let grafo = new Grafo(prueba.listaDeAdyacencia, prueba.esDirigido);
    let matrizDeFlujosMaximos = Array(grafo.cantidad)
      .fill()
      .map(() => Array(grafo.cantidad));
    for (const i of grafo.nodos) {
      for (const j of grafo.nodos) {
        matrizDeFlujosMaximos[i][j] = grafo.flujoMaximo(i, j);
      }
    }

    console.log(`\n${prueba.descripcion}:`);
    console.log(prueba.link);
    console.log("esconexo:");
    console.log(grafo.esconexo);
    console.log("matrizdecaminos:");
    console.log(grafo.matrizDeCaminos);
    console.log("matrizDeFlujosMaximos:");
    console.log(matrizDeFlujosMaximos);
    console.log("arbolGeneradorMinimo:");
    console.log(grafo.arbolGeneradorMinimo);
    console.log("euleriano: {");
    console.log("camino:");
    console.log(grafo.euleriano(Trayecto.camino));
    console.log(", ciclo:");
    console.log(grafo.euleriano(Trayecto.ciclo));
    console.log("},");
    console.log("hamiltoniano: {");
    console.log("camino:");
    console.log(grafo.hamiltoniano(Trayecto.camino));
    console.log(", ciclo:");
    console.log(grafo.hamiltoniano(Trayecto.ciclo));
    console.log("},");
    console.log("\n============================================================");
  }
}

function mostrarUno(prueba) {
  let grafo = Grafo.desdeListaDeAdyacencia(prueba.listaDeAdyacencia, prueba.esDirigido);
  console.log(grafo.matrizDeAdyacencia)
}

// mostrar(grafos);
mostrarUno(grafos[10]);
