/* eslint-disable jest/valid-title */
const { Grafo, Arista, Direccion, Trayecto } = require("../src/lib/grafo/grafo.js");
const { grafos } = require("./grafos-prueba.js");
const { cloneDeep, map, isEqual, camelCase, upperFirst } = require("lodash");

const direcciones = ["salida", "entrada"];
const estructuras = ["lista de aristas", "matriz de adyacencia", "lista de links"];
const propiedades = ["conexo", "ponderado"];
const trayectos = ["camino", "ciclo"];

function invertirSiEsEntrada(direccion, i, j) {
  return direccion === "entrada" ? [j, i] : [i, j];
}

function aristasEliminadas(origen, destino, original, modificado) {
  function diferenciasMatricesDeAdyacencia(a, b) {
    let diferencias = [];

    for (const [i, fila] of a.entries()) {
      for (const [j, original] of fila.entries()) {
        const modificado = i >= b.length || j >= b.length ? false : b[i][j];
        if (original !== modificado) {
          diferencias.push([i, j]);
        }
      }
    }

    return diferencias;
  }

  let eliminadas = diferenciasMatricesDeAdyacencia(
    original.matrizDeAdyacencia,
    modificado.matrizDeAdyacencia
  );

  if (original.esDirigido) {
    return isEqual(eliminadas, [[origen, destino]]);
  }

  [origen, destino] = [origen, destino].sort();
  return isEqual(eliminadas, [
    [origen, destino],
    [destino, origen],
  ]);
}

for (const prueba of grafos) {
  const grafo = Grafo.desdeListaDeAdyacencia(prueba.listaDeAdyacencia, prueba.esDirigido);
  const nodos = grafo.nodos;

  describe.each(estructuras)("Grafo desde %s", (estructura) => {
    estructura = camelCase(estructura);
    if (prueba[estructura] != null) {
      it(prueba.descripcion, () => {
        const grafo = Grafo["desde" + upperFirst(estructura)](
          prueba[estructura],
          prueba.esDirigido
        );

        return expect(grafo.listaDeAdyacencia).toEqual(prueba.listaDeAdyacencia);
      });
    }
  });

  describe("Matriz de adyacencia", () => {
    if (prueba.matrizDeAdyacencia != null) {
      it(prueba.descripcion, () => {
        return expect(grafo.matrizDeAdyacencia).toEqual(prueba.matrizDeAdyacencia);
      });
    }
  });

  describe("Lista de aristas", () => {
    if (prueba.listaDeAristas != null) {
      it(prueba.descripcion, () => expect(grafo.listaDeAristas).toEqual(prueba.listaDeAristas));
    }
  });

  describe.each(propiedades)("Grafo es %s", (propiedad) => {
    propiedad = "es" + upperFirst(propiedad);
    if (prueba[propiedad] != null) {
      it(prueba.descripcion, () => expect(grafo[propiedad]).toBe(prueba[propiedad]));
    }
  });

  describe("Cantidad de nodos", () => {
    if (prueba.cantidad != null) {
      it(prueba.descripcion, () => expect(grafo.cantidad).toBe(prueba.cantidad));
    }
  });

  describe("Lista de nodos", () => {
    if (prueba.nodos != null) {
      it(prueba.descripcion, () => expect(grafo.nodos).toEqual(prueba.nodos));
    }
  });

  describe.each(direcciones)("Existe arista (dirección: %s)", (direccion) => {
    if (prueba.matrizDeAdyacencia != null) {
      for (const i of nodos) {
        for (const j of nodos) {
          it(`${prueba.descripcion}: nodo ${i} y nodo ${j}`, () => {
            const [origen, destino] = invertirSiEsEntrada(direccion, i, j);
            return expect(grafo.existeArista(i, j, Direccion[direccion])).toEqual(
              Boolean(prueba.matrizDeAdyacencia[origen][destino])
            );
          });
        }
      }
    }
  });

  describe.each("Agregar arista", () => {
    if (prueba.matrizDeAdyacencia != null) {
      it(`${prueba.descripcion}`, () => {
        let recibido = new Grafo(prueba.esDirigido);
        for (const arista of prueba.listaDeAristas) {
          let { origen, destino, peso } = arista;

          // Invierte las aristas de un grafo no dirigido, con un 80% de
          // probabilidad.
          if (!prueba.esDirigido && Math.random < 0.8) {
            [origen, destino] = [destino, origen];
          }

          recibido.agregarArista(origen, destino, peso);
        }

        return expect(recibido.matrizDeAdyacencia).toEqual(prueba.matrizDeAdyacencia);
      });
    }
  });

  describe.each(direcciones)("Eliminar arista (dirección: %s)", (direccion) => {
    if (prueba.matrizDeAdyacencia != null) {
      for (const i of nodos) {
        for (const j of nodos) {
          let clon = cloneDeep(grafo);
          it(`${prueba.descripcion}: nodo ${i} y nodo ${j}`, () => {
            const [origen, destino] = invertirSiEsEntrada(direccion, i, j);
            clon.eliminarArista(i, j, Direccion[direccion]);
            return expect(aristasEliminadas(origen, destino, grafo, clon)).toBe(
              grafo.existeArista(i, j, Direccion[direccion])
            );
          });
        }
      }
    }
  });

  describe.each(direcciones)("Obtener arista (dirección: %s)", (direccion) => {
    const esperado = (origen, destino, peso) => {
      if (peso === false) {
        return false;
      } else if (peso === true) {
        peso = undefined;
      }

      return new Arista(origen, destino, peso);
    };

    if (prueba.matrizDeAdyacencia != null) {
      for (const i of nodos) {
        for (const j of nodos) {
          it(`${prueba.descripcion}: nodo ${i} y nodo ${j}`, () => {
            const [origen, destino] = invertirSiEsEntrada(direccion, i, j);
            const peso = prueba.matrizDeAdyacencia[origen][destino];
            return expect(grafo.arista(i, j, Direccion[direccion])).toEqual(
              esperado(origen, destino, peso)
            );
          });
        }
      }
    }
  });

  describe.each(direcciones.concat("ambas"))("Adyacentes (dirección: %s)", (direccion) => {
    if (prueba.adyacentes?.[direccion] != null) {
      for (const nodo of nodos) {
        it(`${prueba.descripcion}: nodo ${nodo}`, () => {
          return expect(map(grafo.adyacentes(nodo, Direccion[direccion]), "nodo").sort()).toEqual(
            prueba.adyacentes[direccion][nodo]
          );
        });
      }
    }
  });

  describe.each(direcciones.concat("ambas"))("Grado (dirección: %s)", (direccion) => {
    if (prueba.adyacentes?.[direccion] != null) {
      for (const nodo of nodos) {
        it(`${prueba.descripcion}: nodo ${nodo}`, () => {
          return expect(grafo.grado(nodo, Direccion[direccion])).toBe(
            prueba.adyacentes[direccion][nodo].length
          );
        });
      }
    }
  });

  describe("Matriz de caminos", () => {
    if (prueba.matrizDeCaminos != null) {
      it(prueba.descripcion, () => expect(grafo.matrizDeCaminos).toEqual(prueba.matrizDeCaminos));
    }
  });

  describe("Camino más corto entre 2 nodos", () => {
    if (prueba.matrizDeCaminosMasCortos) {
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

  describe.each(trayectos)("Euleriano: %s", (trayecto) => {
    if (prueba.euleriano?.[trayecto] != null) {
      it(prueba.descripcion, () => {
        return expect(grafo.euleriano(Trayecto[trayecto])).toEqual(prueba.euleriano[trayecto]);
      });
    }
  });

  describe.each(trayectos)("Hamiltoniano: %s", (trayecto) => {
    if (prueba.hamiltoniano?.[trayecto] != null) {
      it(prueba.descripcion, () => {
        return expect(grafo.hamiltoniano(Trayecto[trayecto])).toEqual(
          prueba.hamiltoniano[trayecto]
        );
      });
    }
  });

  describe("Flujo máximo", () => {
    if (prueba.matrizDeFlujosMaximos != null) {
      for (const i of nodos) {
        for (const j of nodos) {
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
    if (prueba.arbolGeneradorMinimo != null) {
      it(prueba.descripcion, () => {
        return expect(grafo.arbolGeneradorMinimo).toEqual(prueba.arbolGeneradorMinimo);
      });
    }
  });
}
