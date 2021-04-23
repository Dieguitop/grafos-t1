const matriz = require('./matriz.js');
const hash = require('./hash.js');
const { zeros, range } = require('mathjs');

/**
 * Convierte una matriz de adyacencia (MAD) a una lista de adyacencia (LAD).
 * @param {number[][]} matrizDeAdyacencia - Matriz de adyacencia.
 * @param {boolean} dirigido - `true` si el grafo de la matriz de adyacencia es dirigido.
 * @returns {Map<number, number[]>} Lista de adyacencia.
 */
function MADhaciaLAD(matrizDeAdyacencia, dirigido = false) {
  var listaDeAdyacencia = new Map();

  // Se utiliza un diccionario hasheado para evitar la duplicidad de aristas.
  var aristas = {};

  for (const [i, fila] of matrizDeAdyacencia.entries()) {
    let adyacentes = [];

    for (const [j, celda] of fila.entries()) {

      // Una arista existe entre i y j si el valor de `celda` es distinto de 0.
      // Además, solo considerar dicha arista si ésta no ha sido encontrada
      // anteriormente.
      if (celda !== 0 && hash.noContiene(aristas, [i, j])) {

        // TODO: resolver caso de grafos dirigidos.
        hash.agregar(aristas, [i, j]);

        // La MAD de un grafo no dirigido es simétrica, por lo tanto, la arista
        // entre el nodo i y el nodo j existe en la MAD en [i, j] y en [j, i].
        if (dirigido === false) {
          hash.agregar(aristas, [j, i]);
        }

        adyacentes.push(j);
      }
    }

    // Excluye de la LAD las adyacencias vacías.
    if (adyacentes.length > 0) {
      listaDeAdyacencia.set(i, adyacentes);
    }
  }

  return listaDeAdyacencia;
}

/**
 * Convierte una matriz de adyacencia (MAD) a una lista de aristas (LAR).
 * @param {number[][]} matrizDeAdyacencia - Matriz de adyacencia.
 * @param {boolean} dirigido - `true` si el grafo de la matriz de adyacencia es dirigido.
 * @returns {number[][]>} Lista aristas.
 */
function MADhaciaLAR(matrizDeAdyacencia, dirigido = false) {
  var listaDeAristas = [];
  var aristas = {};

  for (const [i, fila] of matrizDeAdyacencia.entries()) {
    for (const [j, celda] of fila.entries()) {
      if (celda !== 0 && hash.noContiene(aristas, [i, j])) {
        hash.agregar(aristas, [i, j]);

        if (dirigido === false) {
          hash.agregar(aristas, [j, i]);
        }

        listaDeAristas.push([i, j]);
      }
    }
  }

  return listaDeAristas;
}

/**
 * Convierte una lista de aristas (LAR) a una lista de adyacencia (LAD).
 * @param {number[][]} listaDeAristas - Lista de aristas.
 * @param {boolean} dirigido - `true` si el grafo de la lista de aristas es dirigido.
 * @returns {Map<number, number[]>} Lista de adyacencia.
 */
function LARhaciaLAD(listaDeAristas, dirigido = false) {
  const n = matriz.mayor(listaDeAristas) + 1;
  const nodos = range(0, n).toArray();

  // Genera un diccionario donde las llaves son los nodos y sus valores las
  // adyacencias (vacías, inicialmente) asociadas a cada nodo.
  var listaDeAdyacencia = new Map(nodos.map(nodo => [nodo, []]));

  for (const arista of listaDeAristas) {
    const [i, j] = arista;

    // Agregar el nodo j a las adyacencias del nodo i.
    listaDeAdyacencia.get(i).push(j);
  }

  // Elimina de la lista de adyacencia las adyacencias vacías.
  for (const nodo of nodos) {
    if (listaDeAdyacencia.get(nodo).length === 0) {
      listaDeAdyacencia.delete(nodo);
    }
  }

  return listaDeAdyacencia;
}

/**
 * Convierte una lista de aristas (LAR) a una matriz de adyacencia (MAD).
 * @param {number[][]} listaDeAristas - Lista de aristas.
 * @param {boolean} dirigido - `true` si el grafo de la lista de aristas es dirigido.
 * @returns {number[][]} Matriz de adyacencia.
 */
function LARhaciaMAD(listaDeAristas, dirigido = false) {
  const n = matriz.mayor(listaDeAristas) + 1;

  // Crea una matriz de `n` x `n` ceros.
  var matrizDeAdyacencia = zeros(n, n).toArray();

  for (const arista of listaDeAristas) {
    const [i, j] = arista;
    matrizDeAdyacencia[i][j] = 1;

    // La matriz de adyacencia de un grafo no dirigido es simétrica.
    if (dirigido === false) {
      matrizDeAdyacencia[j][i] = 1;
    }
  }

  return matrizDeAdyacencia;
}

/**
 * Convierte una lista de adyacencia (LAD) a una matriz de adyacencia (MAD).
 * @param {Map<number, number[]>} listaDeAdyacencia - Lista de adyacencia.
 * @param {boolean} dirigido - `true` si el grafo de la lista de adyacencia es dirigido.
 * @returns {number[][]} Matriz de adyacencia.
 */
function LADhaciaMAD(listaDeAdyacencia, dirigido = false) {
  const n = matriz.mayor(Array.from(listaDeAdyacencia.entries())) + 1;
  var matrizDeAdyacencia = zeros(n, n).toArray();

  for (const [i, adyacencias] of listaDeAdyacencia) {
    for (const j of adyacencias) {
      matrizDeAdyacencia[i][j] = 1;

      if (dirigido === false) {
        matrizDeAdyacencia[j][i] = 1;
      }
    }
  }

  return matrizDeAdyacencia;
}

/**
 * Convierte una lista de adyacencia (LAD) a una lista de aristas (LAR).
 * @param {Map<number, number[]>} listaDeAdyacencia - Lista de adyacencia.
 * @param {boolean} dirigido - `true` si el grafo de la lista de adyacencia es dirigido.
 * @returns {number[][]} Lista de aristas.
 */
function LADhaciaLAR(listaDeAdyacencia, dirigido = false) {
  var listaDeAristas = [];

  for (const [i, adyacencias] of listaDeAdyacencia) {
    for (const j of adyacencias) {
      listaDeAristas.push([i, j]);
    }
  }

  return listaDeAristas;
}

module.exports = {
  MADhaciaLAD,
  MADhaciaLAR,
  LARhaciaLAD,
  LARhaciaMAD,
  LADhaciaMAD,
  LADhaciaLAR
};
