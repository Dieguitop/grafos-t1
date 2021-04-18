const { adyacencia, mayor } = require('../../src/grafos/grafos.js');
const casos = require('./casos.json');

describe('Matriz de adyacencia', () => {
  for (const [i, caso] of casos.entries()) {
    it(`Grafo ${i + 1}`, () => {
      const matriz = adyacencia(caso.grafo);
      expect(matriz)
        .toStrictEqual(caso.adyacencia);
    });
  }
});

describe('Dimensión de una matriz', () => {
  for (const [i, caso] of casos.entries()) {
    it(`Dimensión de la matriz de adyacencia del grafo ${i + 1}`, () => {
      expect(mayor(caso.grafo) + 1).toBe(caso.dimension);
    });
  }
});
