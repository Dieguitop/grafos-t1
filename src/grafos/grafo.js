const { Arista } = require('./arista.js');
const { Adyacente, esPonderado } = require('./nodo.js');
const { ConjuntoDisjunto } = require('./conjunto-disjunto.js');
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

    // Comprueba si la matriz solo contiene `true` o `false`. En tal caso, el grafo representado
    // por la matriz de adyacencia se asume que no es ponderado.
    const esPonderado = matriz.algun(matrizDeAdyacencia, celda => ![true, false].includes(celda));

    for (const [i, fila] of matrizDeAdyacencia.entries()) {
      let adyacentes = [];

      for (const [j, celda] of fila.entries()) {
        // Una arista existe entre i y j si el valor de `celda` es distinto de `false`.
        // Además, sólo se considera dicha arista si ésta no ha sido encontrada anteriormente.
        if (celda !== false && hash.noContiene(aristas, [i, j])) {
          hash.agregar(aristas, [i, j]);

          // La matriz de adyacencia de un grafo no dirigido es simétrica, por lo que la arista
          // entre el nodo i y el nodo j existe en dicha matriz tanto en (i, j) y como en (j, i).
          if (!esDirigido) {
            hash.agregar(aristas, [j, i]);
          }

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
    const n = this.cantidad;
    var matrizDeAdyacencia = matriz.rellenar(n, n, false);

    for (const [i, adyacentes] of this.listaDeAdyacencia) {
      for (const adyacente of adyacentes) {
        // Si el adyacente es ponderado, el valor de la celda (i, j) corresponde al peso de la arista
        // que une al nodo i con el nodo j. En caso contrario, a la celda (i, j) se la asigna `true`.
        const [j, peso] = esPonderado(adyacente) ? [adyacente.nodo, adyacente.peso] : [adyacente, true];

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
  get cantidad() {
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
    var matrizDeCaminos = math.identity(this.cantidad);

    // Como la iteración comienza en i = 2, se recuerda el valor de A^(i - 1),
    // es decir, la matriz de adyacencia.
    var ultimaPotencia = matrizDeAdyacencia;

    for (let i = 2; i <= this.cantidad; i++) {
      matrizDeCaminos = math.add(matrizDeCaminos, ultimaPotencia);

      // Calcular A^i como A^(i - 1) * A.
      ultimaPotencia = math.multiply(ultimaPotencia, matrizDeAdyacencia);
    }

    return matrizDeCaminos.toArray();
  }

  /**
   * Obtiene el camino más corto entre dos nodos.
   *
   * @typedef {Object} CaminoMasCorto
   *   @property {number[]} camino - Camino más corto entre el nodo origen y el nodo destino.
   *   @property {number} distancia - Distancia total del camino más corto.
   *
   * @param {number} origen - Nodo origen.
   * @param {number} destino - Nodo destino.
   * @returns {CaminoMasCorto} Camino más corto y distancia total.
   *
   * @namespace caminoMasCorto
   */
  caminoMasCorto(origen, destino) {
    /**
     * Obtiene el nodo no visitado más cercano al nodo original.
     *
     * @param {Map<number, number>} distancias - Distancias del nodo original a cada nodo del grafo.
     * @param {Map<number, number>} noVisitados - Nodos no visitados por el algoritmo.
     * @returns {number} Nodo no visitado más cercano al nodo original.
     *
     * @memberof caminoMasCorto
     */
    function noVisitadoConMenorDistancia(distancias, noVisitados) {
      // Se obtiene el primer valor de la lista de nodos no visitados.
      var menor = noVisitados.values().next().value;

      for (const nodo of noVisitados) {
        if (distancias.get(nodo) < distancias.get(menor)) {
          menor = nodo;
        }
      }

      return menor;
    }

    const nodos = this.nodos;
    var noVisitados = new Set(nodos);

    // Distancias del nodo origen a todos los nodos del grafo.
    var distancias = new Map();

    // Nodos padres de cada nodo, siguiendo la ruta óptima (desde el nodo origen).
    var padres = new Map();

    // Se asignan distancias infinitas (muy grandes) a los nodos no visitados.
    for (const nodo of nodos) {
      distancias.set(nodo, Infinity);
      padres.set(nodo, undefined);
    }

    // La distancia del nodo origen a sí mismo es 0.
    distancias.set(origen, 0);

    while (noVisitados.size > 0) {
      // Se obtiene el nodo no visitado más cercano al nodo origen.
      const nodo = noVisitadoConMenorDistancia(distancias, noVisitados);

      // Si el nodo actual es el nodo destino, no es necesario seguir explorando sus adyacentes.
      if (nodo === destino) {
        break;
      }

      // Se itera sobre todos los nodos adyacentes al nodo actual.
      for (const adyacente of this.adyacentes(nodo)) {
        // Calcula la distancia total desde el nodo origen hasta el nodo adyacente,
        // pasando por el nodo actual.
        const distanciaDesdeOrigen = distancias.get(nodo) + adyacente.peso;

        // Si ésta distancia es menor a la registrada actualmente, se actualizan las distancias
        // y los padres.
        if (distanciaDesdeOrigen < distancias.get(adyacente.nodo)) {
          distancias.set(adyacente.nodo, distanciaDesdeOrigen);
          padres.set(adyacente.nodo, nodo);
        }
      }

      noVisitados.delete(nodo);
    }

    // Se calcula el camino más corto a partir de los nodos padres.
    var camino = new Set().add(destino);

    // Se itera inversamente los nodos padres, desde el nodo destino.
    var padre = padres.get(destino);

    while (padre !== undefined) {
      camino.add(padre);

      // Siguiendo la ruta óptima (inversamente), se pasa al siguiente nodo padre.
      padre = padres.get(padre);
    }

    // Retorna el camino más corto (incluyendo el nodo origen) y la distancia total de la ruta.
    return {
      camino: [...camino.add(origen)].reverse(),
      distancia: distancias.get(destino)
    };
  }

  /**
   * @typedef {Object} ArbolGeneradorMinimo
   *   @property {Arista[]} arbol - Lista de aristas del árbol generador mínimo.
   *   @property {number} distancia - Distancia total del árbol generador mínimo.
   */
  /**
   * Construye un árbol generador mínimo del grafo.
   *
   * @returns {ArbolGeneradorMinimo} Árbol generador mínimo del grafo.
   *
   * Implementación del algoritmo de Kruskal, utilizando la estructura de conjuntos disjuntos.
   */
  get arbolGeneradorMinimo() {
    var arbol = [];
    var conjunto = new ConjuntoDisjunto();

    // Crea un conjunto disjunto por cada nodo del grafo.
    for (const nodo of this.nodos) {
      conjunto.crear(nodo);
    }

    // Ordena la lista de aristas según sus pesos, ascendentemente.
    var aristas = this.listaDeAristas.sort((a, b) => a.peso - b.peso);

    for (const arista of aristas) {
      // Se sigue la cadena de nodos padres de un nodo hasta llegar a la raíz que representa al
      // conjunto que contiene dicho nodo.
      const raizOrigen = conjunto.buscar(arista.origen);
      const raizDestino = conjunto.buscar(arista.destino);

      // Si la raíz del nodo origen no pertenece al mismo conjunto de la raíz del nodo destino,
      // entonces la arista que une los nodos origen y destino no forma un ciclo con el resto
      // de las aristas del árbol, por lo que puede ser agregada al árbol.
      if (raizOrigen !== raizDestino) {
        arbol.push(arista);

        // Une el conjunto de la raíz del nodo origen con el conjunto de la raíz del nodo destino.
        conjunto.unir(raizOrigen, raizDestino);
      }
    }

    // Retorna el árbol y la distancia total del árbol (suma total de los pesos de las aristas del árbol).
    return {
      arbol: arbol,
      distancia: arbol.map(nodo => nodo.peso).reduce((a, b) => a + b)
    };
  }
}

module.exports = { Grafo, Arista, Adyacente };
