const { Arista } = require('./arista.js');
const { Adyacente, esPonderado } = require('./nodo.js');
const matriz = require('./matriz.js');
const hash = require('./hash.js');
const math = require('mathjs');

/**
 * Representación de un grafo.
 * @class
 */
class Grafo {
  /*
   * @constructor
   * @param {Map<number, number[]>} listaDeAdyacencia - Lista de adyacencia.
   * @param {boolean} esDirigido - `true` si el grafo de la matriz de
   * adyacencia es dirigido, `false` en caso contrario.
   */
  constructor(listaDeAdyacencia, esDirigido = false) {
    this.listaDeAdyacencia = listaDeAdyacencia;
    this.esDirigido = esDirigido;
  }

  /**
   * Construye un grafo a partir de una lista de adyacencia.
   *
   * @param {Map<number, number[]>} listaDeAdyacencia - Lista de adyacencia.
   * @param {boolean} esDirigido - `true` si el grafo de la matriz de
   * adyacencia es dirigido, `false` en caso contrario.
   *
   * @returns {Grafo} Grafo.
   *
   * La implementación interna de `Grafo` es una lista de adyacencia,
   * por lo que éste constructor redirige al constructor principal.
   */
  static desdeListaDeAdyacencia(listaDeAdyacencia, esDirigido = false) {
    return new Grafo(listaDeAdyacencia, esDirigido);
  }

  /**
   * Construye un grafo a partir de una matriz de adyacencia.
   *
   * @param {number[][]} matrizDeAdyacencia - Matriz de adyacencia.
   * @param {boolean} esDirigido - `true` si el grafo de la matriz de
   * adyacencia es dirigido, `false` en caso contrario.
   *
   * @returns {Grafo} Grafo.
   */
  static desdeMatrizDeAdyacencia(matrizDeAdyacencia, esDirigido = false) {
    var listaDeAdyacencia = new Map();

    // Se utiliza una tabla hasheada para evitar la duplicidad de aristas.
    var aristas = {};

    // Comprueba si la matriz solo contiene ceros o unos. En tal caso, el grafo representado
    // por la matriz de adyacencia se asume que no es ponderado.
    const esPonderado = !matriz.solo(matrizDeAdyacencia, 0, 1);

    for (const [i, fila] of matrizDeAdyacencia.entries()) {
      let adyacentes = [];

      for (const [j, celda] of fila.entries()) {

        // Una arista existe entre i y j si el valor de `celda` es distinto de 0.
        // Además, sólo se considera dicha arista si ésta no ha sido encontrada
        // anteriormente.
        if (celda !== 0 && hash.noContiene(aristas, [i, j])) {

          // TODO: resolver caso de grafos dirigidos.
          hash.agregar(aristas, [i, j]);

          // La matriz de adyacencia de un grafo no dirigido es simétrica, por lo que la arista
          // entre el nodo i y el nodo j existe en dicha matriz tanto en (i, j) y como en (j, i).
          if (!esDirigido) {
            hash.agregar(aristas, [j, i]);
          }

          // TODO: valor por defecto, grafos no ponderados.
          adyacentes.push(esPonderado ? new Adyacente(j, celda) : j);
        }
      }

      // Excluye los nodos sin adyacentes explícitos de la lista de adyacencia.
      if (adyacentes.length > 0) {
        listaDeAdyacencia.set(i, adyacentes);
      }
    }

    return new Grafo(listaDeAdyacencia, esDirigido);
  }

  /**
   * Construye un grafo a partir de una lista de aristas.
   *
   * @param {number[][]} listaDeAristas - Lista de aristas.
   * @param {boolean} esDirigido - `true` si el grafo de la matriz de
   * adyacencia es dirigido, `false` en caso contrario.
   *
   * @returns {Grafo} Grafo.
   */
  static desdeListaDeAristas(listaDeAristas, esDirigido = false) {
    // Obtiene una lista ordenada de los nodos del grafo a partr de la lista de aristas.
    const nodos = [...new Set(
      listaDeAristas.map(arista => [arista.origen, arista.destino]).flat(2).sort()
    )];

    // Genera un diccionario donde las llaves son los nodos y sus valores asociados son las
    // listas (inicialmente vacías) de los nodos adyacentes a cada nodo.
    var listaDeAdyacencia = new Map(nodos.map(nodo => [nodo, []]));

    for (const arista of listaDeAristas) {
      const { origen, destino, peso } = arista;

      // Agrega el nodo destino a las adyacencias del nodo origen.
      listaDeAdyacencia.get(origen).push(arista.esPonderada ? new Adyacente(destino, peso) : destino);
    }

    // Elimina las adyacencias vacías de la lista de adyacencia.
    for (const nodo of nodos) {
      if (listaDeAdyacencia.get(nodo).length === 0) {
        listaDeAdyacencia.delete(nodo);
      }
    }

    return new Grafo(listaDeAdyacencia, esDirigido);
  }

  /**
   * Obtiene la matriz de adyacencia asociada al grafo.
   *
   * @returns {number[][]} Matriz de adyacencia.
   */
  get matrizDeAdyacencia() {
    var matrizDeAdyacencia = math.zeros(this.cantidadDeNodos, this.cantidadDeNodos).toArray();

    for (const [i, adyacentes] of this.listaDeAdyacencia) {
      for (const adyacente of adyacentes) {
        // Si el adyacente es ponderado, el valor de la celda (i, j) corresponde al peso de la arista
        // que une al nodo i con el nodo j. En caso contrario, a la celda (i, j) se la asigna un 1.
        const [j, peso] = esPonderado(adyacente) ? [adyacente.nodo, adyacente.peso] : [adyacente, 1];

        matrizDeAdyacencia[i][j] = peso;

        if (this.noEsDirigido) {
          matrizDeAdyacencia[j][i] = peso;
        }
      }
    }

    return matrizDeAdyacencia;
  }

  /**
   * Obtiene la lista de aristas asociada al grafo.
   *
   * @returns {number[][]} Lista de aristas.
   */
  get listaDeAristas() {
    var listaDeAristas = [];

    for (const [i, adyacentes] of this.listaDeAdyacencia) {
      for (const adyacente of adyacentes) {
        listaDeAristas.push(new Arista(i, adyacente));
      }
    }

    return listaDeAristas;
  }

  /**
   * Obtiene la lista con todos los nodos del grafo.
   *
   * @returns {number[]} Lista de nodos.
   */
  get nodos() {
    const nodos = [...this.listaDeAdyacencia].flat(3).map(
      nodo => esPonderado(nodo) ? nodo.nodo : nodo
    );

    return [...new Set(nodos)].sort();
  }

  /**
   * Calcula la cantidad de nodos del grafo.
   *
   * @returns {number} Cantidad de nodos.
   */
  get cantidadDeNodos() {
    return this.nodos.length;
  }

  /**
   * Obtiene los nodos adyacentes a un nodo.
   *
   * @param {number} nodo - Nodo.
   * @returns {number[]} Adyacentes al nodo.
   */
  adyacentes(nodo) {
	var adyacentes = [];

    for (const [i, vecinos] of this.listaDeAdyacencia) {
      if (nodo === i) {
        adyacentes.push(...vecinos);
      }

      // Si el grafo no es dirigido, se deben considerar las adyacencias implícitas.
      // Internamente, para un grafo no dirigido, las aristas (i, j) son equivalentes a
      // las aristas (j, i), por lo que éstas últimas no se almacenan (están implícitas).
      else if (this.noEsDirigido) {
        for (const adyacente of vecinos) {
          if (adyacente.nodo === nodo) {
            adyacentes.push(new Adyacente(i, adyacente.peso));
          }
        }
      }
    }

    return adyacentes;
  }

  /**
   * Comprueba si el grafo no es dirigido.
   *
   * @returns {boolean} `true` si el grafo no es dirigido, `false` en caso contrario.
   */
  get noEsDirigido() {
    return !this.esDirigido;
  }

  /**
   * Comprueba si el grafo es conexo.
   *
   * @returns {boolean} `true` si el grafo es conexo, `false` en caso contrario.
   *
   * Un grafo es conexo si su matriz de caminos no contiene ningún 0.
   */
  get esConexo() {
    return matriz.noContiene(this.matrizDeCaminos, 0);
  }

  /**
   * Comprueba si el grafo es conexo.
   *
   * @returns {boolean} `true` si el grafo es conexo, `false` en caso contrario.
   *
   * Un grafo no es conexo si su matriz de caminos contiene al menos un 0.
   */
  get noEsConexo() {
    return !this.esConexo;
  }

  /**
   * Comprueba si el grafo es ponderado.
   *
   * @returns {boolean} `true` si el grafo es ponderado, `false` en caso contrario.
   */
  get esPonderado() {
    return [...this.listaDeAdyacencia.values()].flat(2).some(esPonderado);
  }

  /**
   * Comprueba si el grafo no es ponderado.
   *
   * @returns {boolean} `true` si el grafo no es ponderado, `false` en caso contrario.
   */
  get noEsPonderado() {
    return !this.esPonderado;
  }

  /**
   * Obtiene la matriz de caminos asociada al grafo.
   *
   * @returns {number[][]} Matriz de caminos.
   *
   * El cálculo de la matriz de caminos está definido como la sumatoria de A^i,
   * desde i = 0, hasta i = n - 1, donde A es la matriz de adyacencia del grafo,
   * y n es la cantidad de nodos del mismo grafo.
   * Desde i = 2, el resultado de A^(i - 1) se recuerda, para calcular el
   * próximo término A^i como A^(i - 1) * A.
   */
  get matrizDeCaminos() {
    const matrizDeAdyacencia = this.matrizDeAdyacencia;

    // A^0 es la matriz de identidad de orden n.
    var matrizDeCaminos = math.identity(this.cantidadDeNodos);

    // Como la iteración comienza en i = 2, se recuerda el valor de A^(i - 1),
    // es decir, la matriz de adyacencia.
    var ultimaPotencia = matrizDeAdyacencia;

    for (let i = 2; i <= this.cantidadDeNodos; i++) {
      matrizDeCaminos = math.add(matrizDeCaminos, ultimaPotencia);

      // Calcular A^i como A^(i - 1) * A.
      ultimaPotencia = math.multiply(ultimaPotencia, matrizDeAdyacencia);
    }

    return matrizDeCaminos.toArray();
  }
}

module.exports = { Grafo, Arista, Adyacente };
