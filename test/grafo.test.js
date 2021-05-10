/* eslint-disable jest/valid-title */
const { Grafo, Arista, Direccion } = require("../lib/grafo/grafo.js");
const { casos } = require("./casos.js");
const { cloneDeep } = require("lodash");

for (const caso of casos) {
  const grafo = new Grafo(caso.listaDeAdyacencia, caso.esDirigido);

  describe("Grafo desde matriz de adyacencia", () => {
    if (caso.matrizDeAdyacencia) {
      it(caso.descripcion, () => {
        const grafo = Grafo.desdeMatrizDeAdyacencia(caso.matrizDeAdyacencia, caso.esDirigido);
        return expect(grafo.listaDeAdyacencia).toStrictEqual(caso.listaDeAdyacencia);
      });
    }
  });

  describe("Grafo desde lista de aristas", () => {
    if (caso.listaDeAristas) {
      it(caso.descripcion, () => {
        const grafo = Grafo.desdeListaDeAristas(caso.listaDeAristas, caso.esDirigido);
        return expect(grafo.listaDeAdyacencia).toStrictEqual(caso.listaDeAdyacencia);
      });
    }
  });

  describe("Matriz de adyacencia", () => {
    if (caso.matrizDeAdyacencia) {
      it(caso.descripcion, () => {
        return expect(grafo.matrizDeAdyacencia).toStrictEqual(caso.matrizDeAdyacencia);
      });
    }
  });

  describe("Lista de aristas", () => {
    if (caso.listaDeAristas) {
      it(caso.descripcion, () => expect(grafo.listaDeAristas).toStrictEqual(caso.listaDeAristas));
    }
  });

  describe("Grafo conexo o no conexo", () => {
    if (caso.esConexo != null) {
      it(caso.descripcion, () => expect(grafo.esConexo).toStrictEqual(caso.esConexo));
    }
  });

  describe("Grafo ponderado o no ponderado", () => {
    if (caso.esPonderado != null) {
      it(caso.descripcion, () => expect(grafo.esPonderado).toStrictEqual(caso.esPonderado));
    }
  });

  describe("Lista de nodos", () => {
    if (caso.nodos) {
      it(caso.descripcion, () => expect(grafo.nodos).toStrictEqual(caso.nodos));
    }
  });

  describe("Cantidad de nodos", () => {
    if (caso.cantidad) {
      it(caso.descripcion, () => expect(grafo.cantidad).toStrictEqual(caso.cantidad));
    }
  });

  describe("Existe arista de salida", () => {
    if (caso.matrizDeAdyacencia) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          it(`${caso.descripcion}: nodo ${i} y nodo ${j}`, () => {
            return expect(grafo.existeArista(i, j, Direccion.salida)).toStrictEqual(
              Boolean(caso.matrizDeAdyacencia[i][j])
            );
          });
        }
      }
    }
  });

  describe("Existe arista de entrada", () => {
    if (caso.matrizDeAdyacencia) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          it(`${caso.descripcion}: nodo ${i} y nodo ${j}`, () => {
            return expect(grafo.existeArista(i, j, Direccion.entrada)).toStrictEqual(
              Boolean(caso.matrizDeAdyacencia[j][i])
            );
          });
        }
      }
    }
  });

  describe("Eliminar arista de salida", () => {
    if (caso.matrizDeAdyacencia) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          let grafoClon = cloneDeep(grafo);
          it(`${caso.descripcion}: nodo ${i} y nodo ${j}`, () => {
            return expect(Boolean(grafoClon.eliminarArista(i, j, Direccion.salida))).toStrictEqual(
              Boolean(caso.matrizDeAdyacencia[i][j])
            );
          });
        }
      }
    }
  });

  describe("Eliminar arista de entrada", () => {
    if (caso.matrizDeAdyacencia) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          let grafoClon = cloneDeep(grafo);
          it(`${caso.descripcion}: nodo ${i} y nodo ${j}`, () => {
            return expect(Boolean(grafoClon.eliminarArista(i, j, Direccion.entrada))).toStrictEqual(
              Boolean(caso.matrizDeAdyacencia[j][i])
            );
          });
        }
      }
    }
  });

  describe("Obtener arista de salida", () => {
    if (caso.matrizDeAdyacencia) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          it(`${caso.descripcion}: nodo ${i} y nodo ${j}`, () => {
            const peso = caso.matrizDeAdyacencia[i][j];
            return expect(grafo.arista(i, j, Direccion.salida)).toStrictEqual(
              peso === false ? peso : new Arista(i, j, peso === true ? undefined : peso)
            );
          });
        }
      }
    }
  });

  describe("Obtener arista de entrada", () => {
    if (caso.matrizDeAdyacencia) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          it(`${caso.descripcion}: nodo ${i} y nodo ${j}`, () => {
            const peso = caso.matrizDeAdyacencia[j][i];
            return expect(grafo.arista(i, j, Direccion.entrada)).toStrictEqual(
              peso === false ? peso : new Arista(j, i, peso === true ? undefined : peso)
            );
          });
        }
      }
    }
  });

  describe("Grado total", () => {
    if (caso.adyacentes?.salida) {
      for (const nodo of grafo.nodos) {
        it(caso.descripcion + `: nodo ${nodo}`, () => {
          return expect(grafo.grado(nodo)).toStrictEqual(caso.adyacentes.total[nodo].length);
        });
      }
    }
  });

  describe("Grado de salida", () => {
    if (caso.adyacentes?.salida) {
      for (const nodo of grafo.nodos) {
        it(caso.descripcion + `: nodo ${nodo}`, () => {
          return expect(grafo.grado(nodo, Direccion.salida)).toStrictEqual(
            caso.adyacentes.salida[nodo].length
          );
        });
      }
    }
  });

  describe("Grado de entrada", () => {
    if (caso.adyacentes?.entrada) {
      for (const nodo of grafo.nodos) {
        it(caso.descripcion + `: nodo ${nodo}`, () => {
          return expect(grafo.grado(nodo, Direccion.entrada)).toStrictEqual(
            caso.adyacentes.entrada[nodo].length
          );
        });
      }
    }
  });

  describe("Matriz de caminos", () => {
    if (caso.matrizDeCaminos) {
      it(caso.descripcion, () => expect(grafo.matrizDeCaminos).toStrictEqual(caso.matrizDeCaminos));
    }
  });

  describe("Camino más corto entre 2 nodos", () => {
    if (caso.matrizDeCaminosMasCortos) {
      const nodos = grafo.nodos;
      for (const i of nodos) {
        for (const j of nodos) {
          it(caso.descripcion + `: nodo ${i} al nodo ${j}`, () => {
            return expect(grafo.caminoMasCorto(i, j)).toStrictEqual(
              caso.matrizDeCaminosMasCortos[i][j]
            );
          });
        }
      }
    }
  });

  // Un grafo puede tener más de un árbol generador mínimo, pero la distancia de
  // los posibles árboles es única.
  describe("Árbol generador mínimo", () => {
    if (caso.arbolGeneradorMinimo) {
      it(caso.descripcion, () => {
        return expect(grafo.arbolGeneradorMinimo.distancia).toStrictEqual(
          caso.arbolGeneradorMinimo.distancia
        );
      });
    }
  });

  describe("Camino euleriano", () => {
    if (caso.euleriano) {
      it(caso.descripcion, () => {
        return expect(grafo.caminoEuleriano).toStrictEqual(caso.euleriano);
      });
    }
  });
}
