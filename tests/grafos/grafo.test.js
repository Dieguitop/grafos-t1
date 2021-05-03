const { Grafo } = require('../../src/grafos/grafo.js');
const util = require('./utils.js');

const { casos } = require('./casos.js');

for (const [i, caso] of casos.entries()) {
  const descripcionGrafo = util.describirGrafo(i + 1, caso.esDirigido, caso.esPonderado);
  const grafo = new Grafo(caso.listaDeAdyacencia);

  describe('Grafo desde matriz de adyacencia', () => {
    it(descripcionGrafo, () => {
      const grafo = Grafo.desdeMatrizDeAdyacencia(caso.matrizDeAdyacencia);
      return expect(grafo.listaDeAdyacencia).toStrictEqual(caso.listaDeAdyacencia);
    });
  });

  describe('Grafo desde lista de aristas', () => {
    it(descripcionGrafo, () => {
      const grafo = Grafo.desdeListaDeAristas(caso.listaDeAristas);
      return expect(grafo.listaDeAdyacencia).toStrictEqual(caso.listaDeAdyacencia);
    });
  });

  describe('Matriz de adyacencia', () => {
    it(descripcionGrafo, () => expect(grafo.matrizDeAdyacencia).toStrictEqual(caso.matrizDeAdyacencia));
  });

  describe('Lista de aristas', () => {
    it(descripcionGrafo, () => expect(grafo.listaDeAristas).toStrictEqual(caso.listaDeAristas));
  });

  describe('Matriz de caminos', () => {
    it(descripcionGrafo, () => expect(grafo.matrizDeCaminos).toStrictEqual(caso.matrizDeCaminos));
  });

  describe('Grafo conexo o no conexo', () => {
    it(descripcionGrafo, () => expect(grafo.esConexo).toStrictEqual(caso.esConexo));
  });

  describe('Grafo ponderado o no ponderado', () => {
    it(descripcionGrafo, () => expect(grafo.esPonderado).toStrictEqual(caso.esPonderado));
  });

  describe('Cantidad de nodos', () => {
    it(descripcionGrafo, () => expect(grafo.cantidad).toStrictEqual(caso.cantidad));
  });

  describe('Lista de nodos', () => {
    it(descripcionGrafo, () => expect(grafo.nodos).toStrictEqual(caso.nodos));
  });

  describe('Camino más corto entre 2 nodos', () => {
    if (caso.matrizDeCaminosMasCortos) {
      const nodos = grafo.nodos;
      for (const i of nodos) {
        for (const j of nodos) {
          it(descripcionGrafo + `: nodo ${i} al nodo ${j}`, () => {
            return expect(grafo.caminoMasCorto(i, j)).toStrictEqual(caso.matrizDeCaminosMasCortos[i][j]);
          });
        }
      }
    }
  });

  // Un grafo puede tener más de un árbol generador mínimo, pero la distancia de los posibles árboles es única.
  describe('Árbol generador mínimo', () => {
    if (caso.arbolGeneradorMinimo) {
      it(descripcionGrafo, () => {
        return expect(grafo.arbolGeneradorMinimo.distancia).toStrictEqual(caso.arbolGeneradorMinimo.distancia);
      });
    }
  });
}
