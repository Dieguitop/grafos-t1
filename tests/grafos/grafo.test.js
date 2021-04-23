const { Grafo } = require('../../src/grafos/grafo.js');

const casos = require('./casos.json');

describe('Matriz de caminos', () => {
  for (const [i, caso] of casos.entries()) {
    it(`Grafo ${i + 1}`, () => {
      const grafo = new Grafo(caso.listaDeAdyacencia);
      expect(grafo.matrizDeCaminos).toStrictEqual(caso.matrizDeCaminos);
    });
  }
});

describe('Conexidad', () => {
  for (const [i, caso] of casos.entries()) {
    it(`Grafo ${i + 1}`, () => {
      const grafo = new Grafo(caso.listaDeAdyacencia);
      expect(grafo.esConexo).toStrictEqual(caso.esConexo);
    });
  }
});
