/* eslint-disable jest/valid-title */
const { Grafo, Arista, Direccion } = require("../lib/grafo/grafo.js");
const { grafos } = require("./grafos-prueba.js");
const { cloneDeep, map, isEqual, camelCase, upperFirst } = require("lodash");

const direcciones = ["salida", "entrada"];
const estructuras = ["lista de aristas", "matriz de adyacencia", "lista de links"];
const propiedades = ["conexo", "ponderado"];

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
  const grafo = new Grafo(prueba.listaDeAdyacencia, prueba.esDirigido);
  const nodos = grafo.nodos;

  describe.each(estructuras)("Grafo desde %s", (estructura) => {
    estructura = camelCase(estructura);
    if (prueba[estructura]) {
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

  describe.each(propiedades)("Grafo es %s", (propiedad) => {
    propiedad = "es" + upperFirst(propiedad);
    if (prueba[propiedad] != null) {
      it(prueba.descripcion, () => expect(grafo[propiedad]).toBe(prueba[propiedad]));
    }
  });

  describe("Cantidad de nodos", () => {
    if (prueba.cantidad) {
      it(prueba.descripcion, () => expect(grafo.cantidad).toBe(prueba.cantidad));
    }
  });

  describe("Lista de nodos", () => {
    if (prueba.nodos) {
      it(prueba.descripcion, () => expect(grafo.nodos).toEqual(prueba.nodos));
    }
  });

  describe.each(direcciones)("Existe arista (dirección: %s)", (direccion) => {
    if (prueba.matrizDeAdyacencia) {
      for (const i of nodos) {
        for (const j of nodos) {
          it(`${prueba.descripcion}: nodo ${i} y nodo ${j}`, () => {
            const [origen, destino] = direccion === "entrada" ? [j, i] : [i, j];
            return expect(grafo.existeArista(i, j, Direccion[direccion])).toEqual(
              Boolean(prueba.matrizDeAdyacencia[origen][destino])
            );
          });
        }
      }
    }
  });

  describe.each(direcciones)("Eliminar arista (dirección: %s)", (direccion) => {
    if (prueba.matrizDeAdyacencia) {
      for (const i of nodos) {
        for (const j of nodos) {
          let clon = cloneDeep(grafo);
          it(`${prueba.descripcion}: nodo ${i} y nodo ${j}`, () => {
            const [origen, destino] = direccion === "entrada" ? [j, i] : [i, j];
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
    if (prueba.matrizDeAdyacencia) {
      for (const i of nodos) {
        for (const j of nodos) {
          it(`${prueba.descripcion}: nodo ${i} y nodo ${j}`, () => {
            const [origen, destino] = direccion === "entrada" ? [j, i] : [i, j];
            const peso = prueba.matrizDeAdyacencia[origen][destino];
            return expect(grafo.arista(i, j, Direccion[direccion])).toEqual(
              peso === false ? false : new Arista(origen, destino, peso === true ? undefined : peso)
            );
          });
        }
      }
    }
  });

  describe.each(direcciones.concat("ambas"))("Adyacentes (dirección: %s)", (direccion) => {
    if (prueba.adyacentes?.[direccion]) {
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
    if (prueba.adyacentes?.[direccion]) {
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
    if (prueba.matrizDeCaminos) {
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

  describe.skip("Camino euleriano", () => {
    if (prueba.euleriano) {
      it(prueba.descripcion, () => {
        return expect(grafo.euleriano(Trayecto.camino)).toEqual(prueba.euleriano.camino);
      });
    }
  });

  describe.skip("Ciclo euleriano", () => {
    if (prueba.euleriano) {
      it(prueba.descripcion, () => {
        return expect(grafo.euleriano(Trayecto.ciclo)).toEqual(prueba.euleriano.ciclo);
      });
    }
  });

  describe.skip("Camino hamiltoniano", () => {
    if (prueba.hamiltoniano) {
      it(prueba.descripcion, () => {
        return expect(grafo.hamiltoniano(Trayecto.camino)).toEqual(prueba.hamiltoniano.camino);
      });
    }
  });

  describe.skip("Ciclo hamiltoniano", () => {
    if (prueba.hamiltoniano) {
      it(prueba.descripcion, () => {
        return expect(grafo.hamiltoniano(Trayecto.ciclo)).toEqual(prueba.hamiltoniano.ciclo);
      });
    }
  });

  describe("Flujo máximo", () => {
    if (prueba.matrizDeFlujosMaximos) {
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
    if (prueba.arbolGeneradorMinimo) {
      it(prueba.descripcion, () => {
        return expect(grafo.arbolGeneradorMinimo.distancia).toBe(
          prueba.arbolGeneradorMinimo.distancia
        );
      });
    }
  });
}
