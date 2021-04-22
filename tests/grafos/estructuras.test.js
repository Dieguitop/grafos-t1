const estructura = require('../../src/grafos/estructuras.js');

const casos = require('./casos.json');

/**********************
 * Conversiones a LAD *
 **********************/
describe('Conversión MAD a LAD', () => {
  for (const [i, caso] of casos.entries()) {
    it(`MAD de grafo ${i + 1}`, () => {
      const lad = estructura.MADhaciaLAD(caso.mad, false);
      const ladObj = Array.from(lad.entries());
      expect(ladObj).toStrictEqual(caso.lad);
    });
  }
});

describe('Conversión LAR a LAD', () => {
  for (const [i, caso] of casos.entries()) {
    it(`LAR de grafo ${i + 1}`, () => {
      const lad = estructura.LARhaciaLAD(caso.lar, false);
      const ladObj = Array.from(lad.entries());
      expect(ladObj).toStrictEqual(caso.lad);
    });
  }
});

/**********************
 * Conversiones a LAR *
 **********************/
describe('Conversión LAD a LAR', () => {
  for (const [i, caso] of casos.entries()) {
    it(`LAR de grafo ${i + 1}`, () => {
      const lar = estructura.LADhaciaLAR(caso.lad, false);
      expect(lar).toStrictEqual(caso.lar);
    });
  }
});

describe('Conversión MAD a LAR', () => {
  for (const [i, caso] of casos.entries()) {
    it(`LAR de grafo ${i + 1}`, () => {
      const lar = estructura.MADhaciaLAR(caso.mad, false);
      expect(lar).toStrictEqual(caso.lar);
    });
  }
});

/**********************
 * Conversiones a MAD *
 **********************/
describe('Conversión LAD a MAD', () => {
  for (const [i, caso] of casos.entries()) {
    it(`MAD de grafo ${i + 1}`, () => {
      const mad = estructura.LADhaciaMAD(caso.lad, false);
      expect(mad).toStrictEqual(caso.mad);
    });
  }
});

describe('Conversión LAR a MAD', () => {
  for (const [i, caso] of casos.entries()) {
    it(`LAR de grafo ${i + 1}`, () => {
      const mad = estructura.LARhaciaMAD(caso.lar, false);
      expect(mad).toStrictEqual(caso.mad);
    });
  }
});

