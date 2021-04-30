const { Arista } = require('../../src/grafos/arista.js');
const { Adyacente } = require('../../src/grafos/nodo.js');

const casos = [
  {
    cantidadDeNodos: 4,
    esDirigido: false,
    esPonderado: false,
    esConexo: true,
    nodos: [0, 1, 2, 3],
    listaDeAdyacencia: new Map([
      [0, [1, 2, 3]],
      [1, [2]]
    ]),
    listaDeAristas: [
      new Arista(0, 1),
      new Arista(0, 2),
      new Arista(0, 3),
      new Arista(1, 2)
    ],
    matrizDeAdyacencia: [
      [0, 1, 1, 1],
      [1, 0, 1, 0],
      [1, 1, 0, 0],
      [1, 0, 0, 0]
    ],
    matrizDeCaminos: [
      [6, 6, 6, 4],
      [6, 5, 5, 2],
      [6, 5, 5, 2],
      [4, 2, 2, 2]
    ]
  },
  {
    cantidadDeNodos: 6,
    esDirigido: false,
    esPonderado: false,
    esConexo: true,
    nodos: [0, 1, 2, 3, 4, 5],
    listaDeAdyacencia: new Map([
      [0, [0, 1, 4]],
      [1, [2, 4]],
      [2, [3]],
      [3, [4, 5]]
    ]),
    listaDeAristas: [
      new Arista(0, 0),
      new Arista(0, 1),
      new Arista(0, 4),
      new Arista(1, 2),
      new Arista(1, 4),
      new Arista(2, 3),
      new Arista(3, 4),
      new Arista(3, 5)
    ],
    matrizDeAdyacencia: [
      [1, 1, 0, 0, 1, 0],
      [1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 1],
      [1, 1, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0]
    ],
    matrizDeCaminos: [
      [82, 69, 39, 42, 70, 14],
      [69, 55, 42, 32, 67, 17],
      [39, 42, 18, 35, 30, 7],
      [42, 32, 35, 23, 49, 18],
      [70, 67, 30, 49, 56, 11],
      [14, 17, 7, 18, 11, 5]
    ]
  },
  {
    cantidadDeNodos: 7,
    esDirigido: false,
    esPonderado: true,
    esConexo: true,
    nodos: [0, 1, 2, 3, 4, 5, 6],
    listaDeAdyacencia: new Map([
      [0, [new Adyacente(1, 2), new Adyacente(2, 6)]],
      [1, [new Adyacente(3, 5)]],
      [2, [new Adyacente(3, 8)]],
      [3, [new Adyacente(4, 10), new Adyacente(5, 15)]],
      [4, [new Adyacente(5, 6), new Adyacente(6, 2)]],
      [5, [new Adyacente(6, 6)]]
    ]),
    listaDeAristas: [
      new Arista(0, 1, 2),
      new Arista(0, 2, 6),
      new Arista(1, 3, 5),
      new Arista(2, 3, 8),
      new Arista(3, 4, 10),
      new Arista(3, 5, 15),
      new Arista(4, 5, 6),
      new Arista(4, 6, 2),
      new Arista(5, 6, 6)
    ],
    matrizDeAdyacencia: [
      [0, 2, 6, 0, 0, 0, 0],
      [2, 0, 0, 5, 0, 0, 0],
      [6, 0, 0, 8, 0, 0, 0],
      [0, 5, 8, 0, 10, 15, 0],
      [0, 0, 0, 10, 0, 6, 2],
      [0, 0, 0, 15, 6, 0, 6],
      [0, 0, 0, 0, 2, 6, 0]
    ],
    matrizDeCaminos: [
	  [1730821, 663960, 1076350, 12700550, 4196880, 4004610, 3419100],
	  [663960, 5567196, 9305000, 9635455, 13171120, 19683285, 2740350],
	  [1076350, 9305000, 15563221, 15782940, 21921520, 32806260, 4490120],
	  [12700550, 9635455, 15782940, 100767071, 42308240, 46398285, 27520750],
	  [4196880, 13171120, 21921520, 42308240, 35749305, 49492074, 11798862],
	  [4004610, 19683285, 32806260, 46398285, 49492074, 71646184, 13026324],
	  [3419100, 2740350, 4490120, 27520750, 11798862, 13026324, 7542805]
	]
  }
]

module.exports = { casos };
