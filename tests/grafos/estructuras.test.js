const estructura = require('../../src/grafos/estructuras.js');
const util = require('./utils.js');

const casos = require('./casos.json');

function conversion(args) {
  const { conversor, entrada, esperado } = args;
  const recibido = conversor(entrada.estructura, entrada.esDirigido);
  expect(recibido instanceof Map ? [...recibido] : recibido).toStrictEqual(esperado);
}

for (const [i, caso] of casos.entries()) {
  const descripcionGrafo = util.describirGrafo(i + 1, caso.esDirigido, caso.esPonderado).toLowerCase();

  describe('Conversión a LAD', () => {
    it(`MAD del ${descripcionGrafo}`, () => conversion({
      conversor: estructura.MADhaciaLAD,
      entrada: { estructura: caso.matrizDeAdyacencia, esDirigido: caso.esDirigido },
      esperado: caso.listaDeAdyacencia
    }));

    it(`LAR del ${descripcionGrafo}`, () => conversion({
      conversor: estructura.LARhaciaLAD,
      entrada: { estructura: caso.listaDeAristas, esDirigido: caso.esDirigido },
      esperado: caso.listaDeAdyacencia
    }));
  });

  describe('Conversión a LAR', () => {
    it(`LAD del ${descripcionGrafo}`, () => conversion({
      conversor: estructura.LADhaciaLAR,
      entrada: { estructura: caso.listaDeAdyacencia, esDirigido: caso.esDirigido },
      esperado: caso.listaDeAristas
    }));

    it(`MAD del ${descripcionGrafo}`, () => conversion({
      conversor: estructura.MADhaciaLAR,
      entrada: { estructura: caso.matrizDeAdyacencia, esDirigido: caso.esDirigido },
      esperado: caso.listaDeAristas
    }));
  });

  describe('Conversión a MAD', () => {
    it(`LAD del ${descripcionGrafo}`, () => conversion({
      conversor: estructura.LADhaciaMAD,
      entrada: { estructura: caso.listaDeAdyacencia, esDirigido: caso.esDirigido },
      esperado: caso.matrizDeAdyacencia
    }));

    it(`LAR del ${descripcionGrafo}`, () => conversion({
      conversor: estructura.LARhaciaMAD,
      entrada: { estructura: caso.listaDeAristas, esDirigido: caso.esDirigido },
      esperado: caso.matrizDeAdyacencia
    }));
  });
}
