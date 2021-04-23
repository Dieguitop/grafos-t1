const estructura = require('../../src/grafos/estructuras.js');

const casos = require('./casos.json');

/**********************
 * Conversiones a LAD *
 **********************/
describe('Conversión MAD a LAD', () => {
  for (const [i, caso] of casos.entries()) {
    it(`MAD de grafo ${i + 1}`, () => {
      const listaDeAdyacencia = estructura.MADhaciaLAD(caso.matrizDeAdyacencia, false);
      const listaDeAdyacenciaObj = Array.from(listaDeAdyacencia.entries());
      expect(listaDeAdyacenciaObj).toStrictEqual(caso.listaDeAdyacencia);
    });
  }
});

describe('Conversión LAR a LAD', () => {
  for (const [i, caso] of casos.entries()) {
    it(`LAR de grafo ${i + 1}`, () => {
      const listaDeAdyacencia = estructura.LARhaciaLAD(caso.listaDeAristas, false);
      const listaDeAdyacenciaObj = Array.from(listaDeAdyacencia.entries());
      expect(listaDeAdyacenciaObj).toStrictEqual(caso.listaDeAdyacencia);
    });
  }
});

/**********************
 * Conversiones a LAR *
 **********************/
describe('Conversión LAD a LAR', () => {
  for (const [i, caso] of casos.entries()) {
    it(`LAR de grafo ${i + 1}`, () => {
      const listaDeAristas = estructura.LADhaciaLAR(caso.listaDeAdyacencia, false);
      expect(listaDeAristas).toStrictEqual(caso.listaDeAristas);
    });
  }
});

describe('Conversión MAD a LAR', () => {
  for (const [i, caso] of casos.entries()) {
    it(`LAR de grafo ${i + 1}`, () => {
      const listaDeAristas = estructura.MADhaciaLAR(caso.matrizDeAdyacencia, false);
      expect(listaDeAristas).toStrictEqual(caso.listaDeAristas);
    });
  }
});

/**********************
 * Conversiones a MAD *
 **********************/
describe('Conversión LAD a MAD', () => {
  for (const [i, caso] of casos.entries()) {
    it(`MAD de grafo ${i + 1}`, () => {
      const matrizDeAdyacencia = estructura.LADhaciaMAD(caso.listaDeAdyacencia, false);
      expect(matrizDeAdyacencia).toStrictEqual(caso.matrizDeAdyacencia);
    });
  }
});

describe('Conversión LAR a MAD', () => {
  for (const [i, caso] of casos.entries()) {
    it(`LAR de grafo ${i + 1}`, () => {
      const matrizDeAdyacencia = estructura.LARhaciaMAD(caso.listaDeAristas, false);
      expect(matrizDeAdyacencia).toStrictEqual(caso.matrizDeAdyacencia);
    });
  }
});

