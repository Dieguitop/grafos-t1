/* eslint-disable jest/valid-title */
const { Grafo, Arista, Direccion } = require("../lib/grafo/grafo.js");
const { grafos } = require("./grafos-prueba.js");
const { cloneDeep, map } = require("lodash");

for (const prueba of grafos) {
  const grafo = new Grafo(prueba.listaDeAdyacencia, prueba.esDirigido);

  describe("Grafo desde links", () => {
    if (prueba.listaDeLinks) {
      it(prueba.descripcion, () => {
        const grafo = Grafo.desdeListaDeLinks(prueba.listaDeLinks, prueba.esDirigido);
        return expect(grafo.listaDeAdyacencia).toEqual(prueba.listaDeAdyacencia);
      });
    }
  });

  describe("Grafo desde matriz de adyacencia", () => {
    if (prueba.matrizDeAdyacencia) {
      it(prueba.descripcion, () => {
        const grafo = Grafo.desdeMatrizDeAdyacencia(prueba.matrizDeAdyacencia, prueba.esDirigido);
        return expect(grafo.listaDeAdyacencia).toEqual(prueba.listaDeAdyacencia);
      });
    }
  });

  describe("Grafo desde lista de aristas", () => {
    if (prueba.listaDeAristas) {
      it(prueba.descripcion, () => {
        const grafo = Grafo.desdeListaDeAristas(prueba.listaDeAristas, prueba.esDirigido);
        return expect(grafo.listaDeAdyacencia).toEqual(prueba.listaDeAdyacencia);
      });
    }
  });

  describe("Matriz de adyacencia", () => {
    if (prueba.matrizDeAdyacencia) {
      it(prueba.descripcion, () => {
        return expect(grafo.matrizDeAdyacencia).toEqual(prueba.matrizDeAdyacencia);
      });
    }
  });

  describe("Lista de aristas", () => {
    if (prueba.listaDeAristas) {
      it(prueba.descripcion, () => expect(grafo.listaDeAristas).toEqual(prueba.listaDeAristas));
    }
  });

  describe("Grafo ponderado o no ponderado", () => {
    if (prueba.esPonderado != null) {
      it(prueba.descripcion, () => expect(grafo.esPonderado).toBe(prueba.esPonderado));
    }
  });

  describe("Grafo conexo o no conexo", () => {
    if (prueba.esConexo != null) {
      it(prueba.descripcion, () => expect(grafo.esConexo).toBe(prueba.esConexo));
    }
  });

  describe("Lista de nodos", () => {
    if (prueba.nodos) {
      it(prueba.descripcion, () => expect(grafo.nodos).toEqual(prueba.nodos));
    }
  });

  describe("Cantidad de nodos", () => {
    if (prueba.cantidad) {
      it(prueba.descripcion, () => expect(grafo.cantidad).toBe(prueba.cantidad));
    }
  });

  describe("Existe arista de salida", () => {
    if (prueba.matrizDeAdyacencia) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          it(`${prueba.descripcion}: nodo ${i} y nodo ${j}`, () => {
            return expect(grafo.existeArista(i, j, Direccion.salida)).toBe(
              Boolean(prueba.matrizDeAdyacencia[i][j])
            );
          });
        }
      }
    }
  });

  describe("Existe arista de entrada", () => {
    if (prueba.matrizDeAdyacencia) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          it(`${prueba.descripcion}: nodo ${i} y nodo ${j}`, () => {
            return expect(grafo.existeArista(i, j, Direccion.entrada)).toEqual(
              Boolean(prueba.matrizDeAdyacencia[j][i])
            );
          });
        }
      }
    }
  });

  describe("Eliminar arista de salida", () => {
    if (prueba.matrizDeAdyacencia) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          let grafoClon = cloneDeep(grafo);
          it(`${prueba.descripcion}: nodo ${i} y nodo ${j}`, () => {
            return expect(Boolean(grafoClon.eliminarArista(i, j, Direccion.salida))).toBe(
              Boolean(prueba.matrizDeAdyacencia[i][j])
            );
          });
        }
      }
    }
  });

  describe("Eliminar arista de entrada", () => {
    if (prueba.matrizDeAdyacencia) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          let grafoClon = cloneDeep(grafo);
          it(`${prueba.descripcion}: nodo ${i} y nodo ${j}`, () => {
            return expect(Boolean(grafoClon.eliminarArista(i, j, Direccion.entrada))).toBe(
              Boolean(prueba.matrizDeAdyacencia[j][i])
            );
          });
        }
      }
    }
  });

  describe("Obtener arista de salida", () => {
    if (prueba.matrizDeAdyacencia) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          it(`${prueba.descripcion}: nodo ${i} y nodo ${j}`, () => {
            const peso = prueba.matrizDeAdyacencia[i][j];
            return expect(grafo.arista(i, j, Direccion.salida)).toEqual(
              peso === false ? peso : new Arista(i, j, peso === true ? undefined : peso)
            );
          });
        }
      }
    }
  });

  describe("Obtener arista de entrada", () => {
    if (prueba.matrizDeAdyacencia) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          it(`${prueba.descripcion}: nodo ${i} y nodo ${j}`, () => {
            const peso = prueba.matrizDeAdyacencia[j][i];
            return expect(grafo.arista(i, j, Direccion.entrada)).toEqual(
              peso === false ? peso : new Arista(j, i, peso === true ? undefined : peso)
            );
          });
        }
      }
    }
  });

  describe("Adyacentes totales", () => {
    if (prueba.adyacentes?.total) {
      for (const nodo of grafo.nodos) {
        it(`${prueba.descripcion}: nodo ${nodo}`, () => {
          return expect(map(grafo.adyacentes(nodo, Direccion.ambas), "nodo").sort()).toEqual(
            prueba.adyacentes.total[nodo]
          );
        });
      }
    }
  });

  describe("Adyacentes de salida", () => {
    if (prueba.adyacentes?.salida) {
      for (const nodo of grafo.nodos) {
        it(`${prueba.descripcion}: nodo ${nodo}`, () => {
          return expect(map(grafo.adyacentes(nodo, Direccion.salida), "nodo").sort()).toEqual(
            prueba.adyacentes.salida[nodo]
          );
        });
      }
    }
  });

  describe("Adyacentes de entrada", () => {
    if (prueba.adyacentes?.entrada) {
      for (const nodo of grafo.nodos) {
        it(`${prueba.descripcion}: nodo ${nodo}`, () => {
          return expect(map(grafo.adyacentes(nodo, Direccion.entrada), "nodo").sort()).toEqual(
            prueba.adyacentes.entrada[nodo]
          );
        });
      }
    }
  });

  describe("Grado total", () => {
    if (prueba.adyacentes?.salida) {
      for (const nodo of grafo.nodos) {
        it(`${prueba.descripcion}: nodo ${nodo}`, () => {
          return expect(grafo.grado(nodo, Direccion.ambas)).toBe(
            prueba.adyacentes.total[nodo].length
          );
        });
      }
    }
  });

  describe("Grado de salida", () => {
    if (prueba.adyacentes?.salida) {
      for (const nodo of grafo.nodos) {
        it(`${prueba.descripcion}: nodo ${nodo}`, () => {
          return expect(grafo.grado(nodo, Direccion.salida)).toBe(
            prueba.adyacentes.salida[nodo].length
          );
        });
      }
    }
  });

  describe("Grado de entrada", () => {
    if (prueba.adyacentes?.entrada) {
      for (const nodo of grafo.nodos) {
        it(`${prueba.descripcion}: nodo ${nodo}`, () => {
          return expect(grafo.grado(nodo, Direccion.entrada)).toBe(
            prueba.adyacentes.entrada[nodo].length
          );
        });
      }
    }
  });

  describe("Matriz de caminos", () => {
    if (prueba.matrizDeCaminos) {
      it(prueba.descripcion, () => expect(grafo.matrizDeCaminos).toEqual(prueba.matrizDeCaminos));
    }
  });

  describe("Camino más corto entre 2 nodos", () => {
    if (prueba.matrizDeCaminosMasCortos) {
      const nodos = grafo.nodos;
      for (const i of nodos) {
        for (const j of nodos) {
          it(prueba.descripcion + `: nodo ${i} al nodo ${j}`, () => {
            return expect(grafo.caminoMasCorto(i, j)).toEqual(
              prueba.matrizDeCaminosMasCortos[i][j]
            );
          });
        }
      }
    }
  });

  describe("Camino/ciclo euleriano", () => {
    if (prueba.euleriano) {
      it(prueba.descripcion, () => {
        return expect(grafo.euleriano()).toEqual(prueba.euleriano);
      });
    }
  });

  describe("Camino/ciclo hamiltoniano", () => {
    if (prueba.hamiltoniano) {
      it(prueba.descripcion, () => {
        return expect(grafo.hamiltoniano()).toEqual(prueba.hamiltoniano);
      });
    }
  });

  describe("Flujo máximo", () => {
    if (prueba.matrizDeFlujosMaximos) {
      for (const i of grafo.nodos) {
        for (const j of grafo.nodos) {
          it(`${prueba.descripcion}: nodo ${i} al ${j}`, () => {
            return expect(grafo.flujoMaximo(i, j)).toBe(prueba.matrizDeFlujosMaximos[i][j]);
          });
        }
      }
    }
  });

  // Un grafo puede tener más de un árbol generador mínimo, pero la distancia de
  // los posibles árboles es única.
  describe("Árbol generador mínimo", () => {
    if (prueba.arbolGeneradorMinimo) {
      it(prueba.descripcion, () => {
        return expect(grafo.arbolGeneradorMinimo.distancia).toBe(
          prueba.arbolGeneradorMinimo.distancia
        );
      });
    }
  });
}
