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
    link: "http://graphonline.ru/en/?graph=TkSgacteiSDWyPLs",
    cantidadDeNodos: 5,
    esDirigido: false,
    esPonderado: true,
    esConexo: true,
    nodos: [0, 1, 2, 3, 4],
    listaDeAdyacencia: new Map([
      [0, [new Adyacente(1, 6), new Adyacente(3, 1)]],
      [1, [new Adyacente(2, 5), new Adyacente(3, 2), new Adyacente(4, 2)]],
      [2, [new Adyacente(4, 5)]],
      [3, [new Adyacente(4, 1)]]
    ]),
    listaDeAristas: [
      new Arista(0, 1, 6),
      new Arista(0, 3, 1),
      new Arista(1, 2, 5),
      new Arista(1, 3, 2),
      new Arista(1, 4, 2),
      new Arista(2, 4, 5),
      new Arista(3, 4, 1)
    ],
    matrizDeAdyacencia: [
      [0, 6, 0, 1, 0],
      [6, 0, 5, 2, 2],
      [0, 5, 0, 0, 5],
      [1, 2, 0, 0, 1],
      [0, 2, 5, 1, 0]
    ],
    matrizDeCaminos: [
      [2648, 1389, 3045, 1101, 1452],
      [1389, 5860, 2135, 1059, 3056],
      [3045, 2135, 3976, 1395, 1820],
      [1101, 1059, 1395, 524, 768],
      [1452, 3056, 1820, 768, 2053]
	],
    matrizDeCaminosMasCortos: [
      [
        { "camino": [0], "distancia": 0 },
        { "camino": [0, 3, 1], "distancia": 3 },
        { "camino": [0, 3, 4, 2], "distancia": 7 },
        { "camino": [0, 3], "distancia": 1 },
        { "camino": [0, 3, 4], "distancia": 2 }
      ],
      [
        { "camino": [1, 3, 0], "distancia": 3 },
        { "camino": [1], "distancia": 0 },
        { "camino": [1, 2], "distancia": 5 },
        { "camino": [1, 3], "distancia": 2 },
        { "camino": [1, 4], "distancia": 2 }
      ],
      [
        { "camino": [2, 4, 3, 0], "distancia": 7 },
        { "camino": [2, 1], "distancia": 5 },
        { "camino": [2], "distancia": 0 },
        { "camino": [2, 4, 3], "distancia": 6 },
        { "camino": [2, 4], "distancia": 5 }
      ],
      [
        { "camino": [3, 0], "distancia": 1 },
        { "camino": [3, 1], "distancia": 2 },
        { "camino": [3, 4, 2], "distancia": 6 },
        { "camino": [3], "distancia": 0 },
        { "camino": [3, 4], "distancia": 1 }
      ],
      [
        { "camino": [4, 3, 0], "distancia": 2 },
        { "camino": [4, 1], "distancia": 2 },
        { "camino": [4, 2], "distancia": 5 },
        { "camino": [4, 3], "distancia": 1 },
        { "camino": [4], "distancia": 0 }
      ]
    ]
  },
  {
    link: "http://graphonline.ru/en/?graph=xAxihjBdivZsfnfi",
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
	],
    matrizDeCaminosMasCortos: [
      [
        { "camino": [0], "distancia": 0 },
        { "camino": [0, 1], "distancia": 2 },
        { "camino": [0, 2], "distancia": 6 },
        { "camino": [0, 1, 3], "distancia": 7 },
        { "camino": [0, 1, 3, 4], "distancia": 17 },
        { "camino": [0, 1, 3, 5], "distancia": 22 },
        { "camino": [0, 1, 3, 4, 6], "distancia": 19 }
      ],
      [
        { "camino": [1, 0], "distancia": 2 },
        { "camino": [1], "distancia": 0 },
        { "camino": [1, 0, 2], "distancia": 8 },
        { "camino": [1, 3], "distancia": 5 },
        { "camino": [1, 3, 4], "distancia": 15 },
        { "camino": [1, 3, 5], "distancia": 20 },
        { "camino": [1, 3, 4, 6], "distancia": 17 }
      ],
      [
        { "camino": [2, 0], "distancia": 6 },
        { "camino": [2, 0, 1], "distancia": 8 },
        { "camino": [2], "distancia": 0 },
        { "camino": [2, 3], "distancia": 8 },
        { "camino": [2, 3, 4], "distancia": 18 },
        { "camino": [2, 3, 5], "distancia": 23 },
        { "camino": [2, 3, 4, 6], "distancia": 20 }
      ],
      [
        { "camino": [3, 1, 0], "distancia": 7 },
        { "camino": [3, 1], "distancia": 5 },
        { "camino": [3, 2], "distancia": 8 },
        { "camino": [3], "distancia": 0 },
        { "camino": [3, 4], "distancia": 10 },
        { "camino": [3, 5], "distancia": 15 },
        { "camino": [3, 4, 6], "distancia": 12 }
      ],
      [
        { "camino": [4, 3, 1, 0], "distancia": 17 },
        { "camino": [4, 3, 1], "distancia": 15 },
        { "camino": [4, 3, 2], "distancia": 18 },
        { "camino": [4, 3], "distancia": 10 },
        { "camino": [4], "distancia": 0 },
        { "camino": [4, 5], "distancia": 6 },
        { "camino": [4, 6], "distancia": 2 }
      ],
      [
        { "camino": [5, 3, 1, 0], "distancia": 22 },
        { "camino": [5, 3, 1], "distancia": 20 },
        { "camino": [5, 3, 2], "distancia": 23 },
        { "camino": [5, 3], "distancia": 15 },
        { "camino": [5, 4], "distancia": 6 },
        { "camino": [5], "distancia": 0 },
        { "camino": [5, 6], "distancia": 6 }
      ],
      [
        { "camino": [6, 4, 3, 1, 0], "distancia": 19 },
        { "camino": [6, 4, 3, 1], "distancia": 17 },
        { "camino": [6, 4, 3, 2], "distancia": 20 },
        { "camino": [6, 4, 3], "distancia": 12 },
        { "camino": [6, 4], "distancia": 2 },
        { "camino": [6, 5], "distancia": 6 },
        { "camino": [6], "distancia": 0 }
      ]
    ]
  }
]

module.exports = { casos };
