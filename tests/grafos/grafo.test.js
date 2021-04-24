const { Grafo } = require('../../src/grafos/grafo.js');
const util = require('../../src/grafos/utils.js');

const casos = require('./casos.json');

for (const [i, caso] of casos.entries()) {
  const descripcionGrafo = util.describirGrafo(i + 1, caso.esDirigido, caso.esPonderado);
  const grafo = new Grafo(caso.listaDeAdyacencia);

  describe('Matriz de caminos', () => {
    it(descripcionGrafo, () => expect(grafo.matrizDeCaminos).toStrictEqual(caso.matrizDeCaminos));
  });

  describe('Grafo conexo o no conexo', () => {
    it(descripcionGrafo, () => expect(grafo.esConexo).toStrictEqual(caso.esConexo));
  });

  describe('Grafo ponderado o no ponderado', () => {
    it(descripcionGrafo, () => expect(grafo.esPonderado).toStrictEqual(caso.esPonderado));
  });
}
