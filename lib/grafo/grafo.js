const { Arista, Direccion } = require("./arista.js");
const { Adyacente } = require("./nodo.js");
const { ConjuntoDisjunto } = require("../conjunto-disjunto.js");
const { identity, add, multiply } = require("mathjs");
const {
  cloneDeep,
  find,
  first,
  flattenDeep,
  has,
  isEmpty,
  last,
  map,
  omit,
  remove,
  set,
  some,
  sumBy,
  unionBy,
  uniq,
  values,
  zipObject,
} = require("lodash");

/**
 * @enum {boolean}
 *
 * Representa la conexión entre dos nodos i y j en la celda (i, j) de la matriz
 * de adyacencia.
 */
const Celda = Object.freeze({
  conectada: true,
  desconectada: false,
});

/**
 * @enum {number}
 *
 * Representa los tipos de trayecto en un grafo.
 */
const Trayecto = Object.freeze({
  ninguno: 0,
  camino: 1,
  ciclo: 2,
});

/**
 * Representación de un grafo.
 * @class
 */
class Grafo {
  /**
   * @constructor
   * @param {Map<number, number[]>} listaDeAdyacencia - Lista de adyacencia.
   * @param {boolean} [esDirigido=false] - `true` si el grafo de la matriz de
   * adyacencia es dirigido, `false` en caso contrario.
   *
   * @example
   * // Grafo: 0 --(2)--> 1, 0 <--(4)--.--(6)--> 2, 1 --(3)--> 2.
   * const listaDeAdyacencia = [
   *   [0, [new Adyacente(1, 2), new Adyacente(2, 6)]],
   *   [1, [new Adyacente(2, 3)]],
   *   [2, [new Adyacente(0, 4)]]
   * ];
   *
   * // La lista de adyacencia contiene aristas dirigidas.
   * const esDirigido = true;
   * const grafo = new Grafo(listaDeAdyacencia, esDirigido);
   */
  constructor(listaDeAdyacencia, esDirigido = false) {
    this.listaDeAdyacencia = listaDeAdyacencia;
    this.esDirigido = esDirigido;
  }

  /**
   * Construye un grafo a partir de una lista de adyacencia.
   *
   * @param {Map<number, number[]>} listaDeAdyacencia - Lista de adyacencia.
   * @param {boolean} [esDirigido=false] - `true` si el grafo de la matriz de
   * adyacencia es dirigido, `false` en caso contrario.
   * @returns {Grafo} Grafo.
   *
   * La implementación interna de `Grafo` es una lista de adyacencia, por lo que
   * éste constructor redirige al constructor principal.
   *
   * @example
   * // Grafo: 0 --(2)--> 1, 0 <--(4)--.--(6)--> 2, 1 --(3)--> 2.
   * const listaDeAdyacencia = [
   *   [0, [new Adyacente(1, 2), new Adyacente(2, 6)]],
   *   [1, [new Adyacente(2, 3)]],
   *   [2, [new Adyacente(0, 4)]]
   * ];
   *
   * // La lista de adyacencia contiene aristas dirigidas.
   * const esDirigido = true;
   * const grafo = Grafo.desdeMatrizDeAdyacencia(matrizDeAdyacencia, esDirigido);
   */
  static desdeListaDeAdyacencia(listaDeAdyacencia, esDirigido = false) {
    return new Grafo(listaDeAdyacencia, esDirigido);
  }

  /**
   * Construye un grafo a partir de una matriz de adyacencia.
   *
   * @param {number[][]} matrizDeAdyacencia - Matriz de adyacencia.
   * @param {boolean} esDirigido - `true` si el grafo de la matriz de adyacencia
   * es dirigido, `false` en caso contrario.
   * @returns {Grafo} Grafo.
   *
   * @example
   * // Grafo: 0 -> 1, 0 <-> 2, 1 -> 2.
   * const matrizDeAdyacencia = [
   *   [false, true, true],
   *   [false, false, true],
   *   [true, false, false]
   * ];
   *
   * // La matriz contiene aristas dirigidas.
   * const esDirigido = true;
   * const grafo = Grafo.desdeMatrizDeAdyacencia(
   *   matrizDeAdyacencia, esDirigido
   * );
   */
  static desdeMatrizDeAdyacencia(matrizDeAdyacencia, esDirigido = false) {
    let listaDeAdyacencia = new Map();

    // Se utiliza una tabla hasheada para evitar la duplicidad de aristas.
    let aristas = {};

    for (const [i, fila] of matrizDeAdyacencia.entries()) {
      let adyacentes = [];

      for (const [j, celda] of fila.entries()) {
        // Una arista existe entre i y j si el valor de `celda` es distinto de
        // `false`. Además, sólo se considera dicha arista si ésta no ha sido
        // encontrada anteriormente.
        if (celda !== Celda.desconectada && !has(aristas, [i, j])) {
          set(aristas, [i, j]);

          // La matriz de adyacencia de un grafo no dirigido es simétrica, por
          // lo que la arista entre el nodo i y el nodo j existe en dicha matriz
          // tanto en (i, j) y como en (j, i).
          if (!esDirigido) {
            set(aristas, [j, i]);
          }

          // Si el valor de la celda es `true`, el adyacente se asume como no
          // ponderado.
          adyacentes.push(new Adyacente(j, celda === Celda.conectada ? undefined : celda));
        }
      }

      // Excluye los nodos sin adyacentes explícitos de la lista de adyacencia.
      if (!isEmpty(adyacentes)) {
        listaDeAdyacencia.set(i, adyacentes);
      }
    }

    return new Grafo(listaDeAdyacencia, esDirigido);
  }

  /**
   * Construye un grafo a partir de una lista de aristas.
   *
   * @param {number[][]} listaDeAristas - Lista de aristas.
   * @param {boolean} [esDirigido=false] - `true` si el grafo de la matriz de
   * adyacencia es dirigido, `false` en caso contrario.
   * @returns {Grafo} Grafo.
   *
   * @example
   * // Grafo: 0 --(2)--> 1, 0 <--(4)--.--(6)--> 2, 1 --(3)--> 2.
   * const listaDeAristas = [
   *   new Arista(0, 1, 2),
   *   new Arista(0, 2, 6),
   *   new Arista(1, 2, 3),
   *   new Arista(2, 0, 4)
   * ];
   *
   * // La lista contiene aristas dirigidas.
   * const esDirigido = true;
   * const grafo = Grafo.desdelistaDeAristas(listaDeAristas, esDirigido);
   */
  static desdeListaDeAristas(listaDeAristas, esDirigido = false) {
    // Calcula la lista de nodos del grafo:
    // Obtiene los valores (origen, destino, peso) de las aristas, omitiendo el
    // peso. Elimina los duplicados, y ordena los elementos ascendentemente.
    const nodos = uniq(listaDeAristas.flatMap(arista => values(omit(arista, "peso")))).sort();

    // Genera un mapa (o diccionario) donde las llaves son los nodos y sus valores
    // asociados son las listas (inicialmente vacías) de los nodos adyacentes a
    // cada nodo.
    let listaDeAdyacencia = new Map(map(nodos, nodo => [nodo, []]));

    for (const { origen, destino, peso } of listaDeAristas) {
      // Agrega el nodo destino a las adyacencias del nodo origen.
      listaDeAdyacencia.get(origen).push(new Adyacente(destino, peso));
    }

    // Elimina las adyacencias vacías de la lista de adyacencia.
    for (const nodo of nodos) {
      if (isEmpty(listaDeAdyacencia.get(nodo))) {
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

    // Crea una matriz de orden n, cuyos valores son inicialmente `false`.
    let matrizDeAdyacencia = map(Array(n).fill(Celda.desconectada), () =>
      Array(n).fill(Celda.desconectada)
    );

    for (const [i, adyacentes] of this.listaDeAdyacencia) {
      for (const { nodo: j, peso, esPonderado } of adyacentes) {
        // Si el adyacente es ponderado, el valor de la celda (i, j) corresponde
        // al peso de la arista que une al nodo i con el nodo j. En caso
        // contrario, a la celda (i, j) se la asigna `true`.
        const celda = esPonderado ? peso : Celda.conectada;

        matrizDeAdyacencia[i][j] = celda;

        // La matriz de adyacencia de un grafo no dirigido es simétrica, por
        // lo que la arista entre el nodo i y el nodo j existe en dicha matriz
        // tanto en (i, j) y como en (j, i).
        if (!this.esDirigido) {
          matrizDeAdyacencia[j][i] = celda;
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
    let listaDeAristas = [];

    for (const [origen, adyacentes] of this.listaDeAdyacencia) {
      for (const { nodo: destino, peso } of adyacentes) {
        listaDeAristas.push(new Arista(origen, destino, peso));
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
    // Descomprime el arreglo interno de la lista de adyacencia en un arreglo de
    // una dimensión, se omite el peso de los adyacentes ponderados, se ordenan
    // los nodos ascendentemente y se filtran los duplicados.
    return uniq(map(flattenDeep([...this.listaDeAdyacencia]), nodo => nodo?.nodo ?? nodo)).sort();
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
   * Comprueba si el grafo es conexo.
   *
   * @returns {boolean} `true` si el grafo es conexo, `false` en caso contrario.
   */
  get esConexo() {
    // Un grafo es conexo si su matriz de caminos no contiene ningún `false`.
    return !some(this.matrizDeCaminos, fila => fila.includes(Celda.desconectada));
  }

  /**
   * Comprueba si el grafo es ponderado.
   *
   * @returns {boolean} `true` si el grafo es ponderado, `false` en caso
   * contrario.
   */
  get esPonderado() {
    // Comprueba si alguno de los adyacentes de la lista de adyacencia es
    // ponderado.
    return some([...this.listaDeAdyacencia.values()], adyacente => some(adyacente, "esPonderado"));
  }

  /**
   * @typedef {Object} ExisteArista
   *   @property {boolean} existe - `true` si la arista existe entre un nodo
   *   origen y un nodo destino.
   *   @property {number} direccion - Dirección de la arista, desde el nodo
   *   origen.
   */
  /**
   * Comprueba si existe una arista entre el nodo origen y el nodo destino.
   *
   * @param {number} origen - Nodo origen.
   * @param {number} destino - Nodo destino.
   * @returns {ExisteArista} Condición de existencia de la arista y su
   * dirección.
   *
   * @todo Aristas no dirigidas vs doble aristas de salida y de entrada
   * (multigrafo). Ver también método `arista`.
   */
  existeArista(origen, destino) {
    // Comprueba si el nodo destino es adyacente de salida con respecto al nodo
    // origen.
    const enSalida = some(this.adyacentesDeSalida(origen), ["nodo", destino]);

    // Sólo si el grafo es dirigido se busca una arista en los adyacente de
    // entrada, ya que en un grafo dirigido los adyacentes de salida son los
    // mismos de entrada.
    if (this.esDirigido) {
      // Comprueba si el nodo destino es adyacente de entrada con respecto al
      // nodo origen.
      const enEntrada = some(this.adyacentesDeEntrada(origen), ["nodo", destino]);

      // El nodo destino es adyacente de entrada con respecto al nodo origen.
      if (enEntrada) {
        // Además, se comprueba si el nodo destino es adyacente de salida con
        // respecto al nodo origen (en el caso de un multigrafo).
        return {
          existe: true,
          direccion: enSalida ? Direccion.ambas : Direccion.entrada,
        };
      }
    }

    // El nodo destino es adyacente de salida con respecto al nodo origen.
    if (enSalida) {
      return { existe: enSalida, direccion: Direccion.salida };
    }

    // El nodo destino no es adyacente al nodo origen.
    return { existe: false, direccion: Direccion.ninguna };
  }

  /**
   * Comprueba si existe una arista entre el nodo origen y el nodo destino.
   *
   * @param {number} origen - Nodo origen.
   * @param {number} destino - Nodo destino.
   * @returns {Arista|boolean} Arista, si existe; `false`, en caso contrario.
   *
   * @todo Aristas no dirigidas vs doble aristas de salida y de entrada
   * (multigrafo). Ver también método `existeArista`.
   */
  arista(origen, destino) {
    const { existe, direccion } = this.existeArista(origen, destino);

    if (!existe) {
      return false;
    }

    // Encuentra el nodo destino en los adyacentes de entrada (si la arista
    // encontrada es sólo de entrada) o en los adyacentes de salida (si la
    // arista encontrada es sólo de salida, o de salida y además de entrada).
    const { peso } = find(
      direccion === Direccion.entrada
        ? this.adyacentesDeEntrada(origen)
        : this.adyacentesDeSalida(origen),
      ["nodo", destino]
    );

    return new Arista(origen, destino, peso);
  }

  /**
   * Elimina la arista, si existe, entre el nodo origen y el nodo destino.
   *
   * @param {number} origen - Nodo origen.
   * @param {number} destino - Nodo destino.
   * @returns {boolean} `true` si la arista existía, y fue eliminada; `false`,
   * en caso contrario.
   */
  eliminarArista(origen, destino) {
    if (this.existeArista(origen, destino)) {
      if (this.esDirigido) {
        remove(this.listaDeAdyacencia.get(origen), adyacente => adyacente.nodo === destino);
        return true;
      }

      remove(this.listaDeAdyacencia.get(origen), adyacente => adyacente.nodo === destino);
      this.eliminarArista(destino, origen);
      return true;
    }

    return false;
  }

  /**
   * Obtiene los nodos adyacentes que interna y explícitamente están asociados
   * al nodo origen.
   *
   * @param {number} nodo - Nodo origen.
   * @returns {!Adyacente[]} Lista de adyacentes de salida.
   *
   * Debido al funcionamiento de las listas de adyacencia, un nodo de un grafo
   * no dirigido tiene nodos adyacentes que no están explícitamente asociados en
   * dicha lista de adyacencia.
   */
  adyacentesExplicitos(nodo) {
    return this.listaDeAdyacencia.get(nodo) ?? [];
  }

  /**
   * Obtiene los nodos adyacentes de salida del nodo.
   *
   * @param {number} nodo - Nodo origen.
   * @returns {!Adyacente[]} Lista de adyacentes de salida.
   *
   * Los nodos adyacentes de salida son aquellos que reciben alguna conexión del
   * nodo origen. En el caso de los grafos no dirigidos, los nodos adyacentes de
   * salida son los mismos de entrada.
   */
  adyacentesDeSalida(nodo) {
    if (this.esDirigido) {
      return this.adyacentesExplicitos(nodo);
    }

    // En los grafos no dirigidos, los nodos adyacentes de salida son los mismos
    // de entrada.
    return this.adyacentesDeEntrada(nodo);
  }

  /**
   * Obtiene los nodos adyacentes de salida del nodo.
   *
   * @param {number} nodo - Nodo origen.
   * @returns {!Adyacente[]} Lista de adyacentes de salida.
   *
   * Los nodos adyacentes de entrada son aquellos que entregan alguna conexión
   * al nodo origen.
   */
  adyacentesDeEntrada(nodo) {
    let adyacentesDeEntrada = this.esDirigido ? [] : [...this.adyacentesExplicitos(nodo)];

    for (const [origen, adyacentes] of this.listaDeAdyacencia) {
      for (const { nodo: destino, peso } of adyacentes) {
        // Se busca el nodo destino en la lista de adyacentes. Se debe
        // considerar si el nodo origen es igual al destino (arista bucle), ya
        // que éste nodo adyacente ya está incluido en los nodos adyacentes de
        // salida.
        if (nodo === destino && origen !== destino) {
          adyacentesDeEntrada.push(new Adyacente(origen, peso));
        }
      }
    }

    return adyacentesDeEntrada;
  }

  /**
   * Obtiene los nodos adyacentes a un nodo.
   *
   * @param {number} nodo - Nodo.
   * @returns {!Adyacente[]} Adyacentes al nodo.
   *
   * @example
   * // Grafo: 0 --(2)--> 1, 0 <--(4)--.--(6)--> 2, 1 --(3)--> 2.
   * const listaDeAdyacencia = [
   *   [0, [new Adyacente(1, 2), new Adyacente(2, 6)]],
   *   [1, [new Adyacente(2, 3)]],
   *   [2, [new Adyacente(0, 4)]]
   * ];
   *
   * // La lista de adyacencia contiene aristas dirigidas.
   * const esDirigido = true;
   * const grafo = new Grafo(listaDeAdyacencia, esDirigido);
   *
   * console.log(grafo.adyacentes(0));
   * // Valor esperado: [
   * //   new Adyacente(1, 2), new Adyacente(2, 6), new Adyacente(2, 4)
   * // ]
   */
  adyacentes(nodo) {
    if (this.esDirigido) {
      // Une los nodos adyacentes de salida con los nodos de entrada, sin
      // duplicados (según la propiedad `nodo` de cada nodo adyacente);
      return unionBy(this.adyacentesDeSalida(nodo), this.adyacentesDeEntrada(nodo), "nodo");
    }

    // En los grafos no dirigidos, los nodos adyacentes de salida son los mismos
    // de entrada.
    return this.adyacentesDeEntrada(nodo);
  }

  /**
   * Calcula el grado de salida de un nodo.
   *
   * @param {number} nodo - Nodo.
   * @returns {number} Grado de salida del nodo.
   *
   * @todo Considerar caso de aristas bucle.
   */
  gradoDeSalida(nodo) {
    return this.adyacentesDeSalida(nodo).length;
  }

  /**
   * Calcula el grado de entrada de un nodo.
   *
   * @param {number} nodo - Nodo.
   * @returns {number} Grado de entrada del nodo.
   *
   * @todo Considerar caso de aristas bucle.
   */
  gradoDeEntrada(nodo) {
    return this.adyacentesDeEntrada(nodo).length;
  }

  /**
   * Calcula el grado de un nodo.
   *
   * @param {number} nodo - Nodo.
   * @returns {number} Grado del nodo.
   *
   * @todo Considerar caso de aristas bucle.
   */
  grado(nodo) {
    return this.adyacentes(nodo).length;
  }

  /**
   * Obtiene la matriz de caminos asociada al grafo.
   *
   * @returns {number[][]} Matriz de caminos.
   *
   * El cálculo de la matriz de caminos está definido como la sumatoria de
   * `A^i`, desde `i = 0`, hasta `i = n - 1`, donde `A` es la matriz de
   * adyacencia del grafo, y n es la cantidad de nodos del mismo grafo. Desde `i
   * = 2`, el resultado de `A^(i - 1)` se recuerda, para calcular el próximo
   * término `A^i` como `A^(i - 1) * A`.
   */
  get matrizDeCaminos() {
    const matrizDeAdyacencia = this.matrizDeAdyacencia;
    const n = this.cantidad;

    // A^0 es la matriz de identidad de orden n.
    let matrizDeCaminos = identity(n);

    // Como la iteración comienza en i = 2, se recuerda el valor de A^(i - 1),
    // es decir, la matriz de adyacencia.
    let ultimaPotencia = matrizDeAdyacencia;

    for (let i = 2; i <= n; i++) {
      matrizDeCaminos = add(matrizDeCaminos, ultimaPotencia);

      // Calcular A^i como A^(i - 1) * A.
      ultimaPotencia = multiply(ultimaPotencia, matrizDeAdyacencia);
    }

    return matrizDeCaminos.toArray();
  }

  /**
   * @typedef {Object} CaminoMasCorto
   *   @property {number[]} camino - Camino más corto entre el nodo origen y el
   *   nodo destino.
   *   @property {number} distancia - Distancia total del camino más corto.
   */
  /** Obtiene el camino más corto entre dos nodos.
   *
   * @param {number} origen - Nodo origen.
   * @param {number} destino - Nodo destino.
   * @returns {CaminoMasCorto} Camino más corto y distancia total.
   *
   * Implementación del algoritmo de caminos mínimos de Dijkstra.
   *
   * @namespace caminoMasCorto
   */
  caminoMasCorto(origen, destino) {
    /**
     * Obtiene el nodo no visitado más cercano al nodo original.
     *
     * @param {Map<number, number>} distancias - Distancias del nodo original a
     * cada nodo del grafo.
     * @param {Map<number, number>} noVisitados - Nodos no visitados por el
     * algoritmo.
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

    // Nodos padres de cada nodo, siguiendo la ruta óptima (desde el nodo
    // origen).
    var padres = new Map();

    // Se asignan distancias infinitas (muy grandes) a los nodos no visitados.
    for (const nodo of nodos) {
      distancias.set(nodo, Infinity);
      padres.set(nodo, undefined);
    }

    // La distancia del nodo origen a sí mismo es 0.
    distancias.set(origen, 0);

    while (!isEmpty(noVisitados)) {
      // Se obtiene el nodo no visitado más cercano al nodo origen.
      const nodo = noVisitadoConMenorDistancia(distancias, noVisitados);

      // Si el nodo actual es el nodo destino, no es necesario seguir explorando
      // sus adyacentes.
      if (nodo === destino) {
        break;
      }

      // Se itera sobre todos los nodos adyacentes al nodo actual.
      for (const { nodo: destino, peso } of this.adyacentes(nodo)) {
        // Calcula la distancia total desde el nodo origen hasta el nodo
        // adyacente, pasando por el nodo actual.
        const distanciaDesdeOrigen = distancias.get(nodo) + peso;

        // Si ésta distancia es menor a la registrada actualmente, se actualizan
        // las distancias y los padres.
        if (distanciaDesdeOrigen < distancias.get(destino)) {
          distancias.set(destino, distanciaDesdeOrigen);
          padres.set(destino, nodo);
        }
      }

      noVisitados.delete(nodo);
    }

    // Se calcula el camino más corto a partir de los nodos padres.
    var camino = new Set().add(destino);

    // Se itera inversamente los nodos padres, desde el nodo destino.
    var padre = padres.get(destino);

    while (padre != null) {
      camino.add(padre);

      // Siguiendo la ruta óptima (inversamente), se pasa al siguiente nodo
      // padre.
      padre = padres.get(padre);
    }

    // Retorna el camino más corto (incluyendo el nodo origen) y la distancia
    // total de la ruta.
    return {
      camino: [...camino.add(origen)].reverse(),
      distancia: distancias.get(destino),
    };
  }

  /**
   * @typedef {Object} ArbolGeneradorMinimo
   *   @property {Arista[]} arbol - Lista de aristas del árbol generador mínimo.
   *   @property {number} distancia - Distancia total del árbol generador
   *   mínimo.
   */
  /**
   * Construye un árbol generador mínimo del grafo.
   *
   * @returns {ArbolGeneradorMinimo} Árbol generador mínimo del grafo.
   *
   * Implementación del algoritmo de Kruskal, utilizando la estructura de
   * conjuntos disjuntos.
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
      // Se sigue la cadena de nodos padres de un nodo hasta llegar a la raíz
      // que representa al conjunto que contiene dicho nodo.
      const raizOrigen = conjunto.buscar(arista.origen);
      const raizDestino = conjunto.buscar(arista.destino);

      // Si la raíz del nodo origen no pertenece al mismo conjunto de la raíz
      // del nodo destino, entonces la arista que une los nodos origen y destino
      // no forma un ciclo con el resto de las aristas del árbol, por lo que
      // puede ser agregada al árbol.
      if (raizOrigen !== raizDestino) {
        arbol.push(arista);

        // Une el conjunto de la raíz del nodo origen con el conjunto de la raíz
        // del nodo destino.
        conjunto.unir(raizOrigen, raizDestino);
      }
    }

    // Retorna el árbol y la distancia total del árbol (suma total de los pesos
    // de las aristas del árbol).
    return {
      arbol: arbol,
      distancia: sumBy(arbol, "peso"),
    };
  }

  /**
   * @typedef {Object} TrayectoEuleriano
   *   @property {Trayecto} tipo - Tipo de trayecto (camino, ciclo, o ninguno).
   *   @property {number} origen - Nodo que origina el trayecto.
   */
  /**
   * Determina si el grafo contiene un camino o un ciclo euleriano.
   *
   * @returns {TrayectoEuleriano} Tipo de trayecto (camino, ciclo, o ninguno) y
   * nodo que origina el trayecto.
   *
   * Condiciones que el grafo debe cumplir para que contenga un camino o un
   * ciclo euleriano:
   *            ┌─────────────────────────┬───────────────────────────────────┐
   *            │     Ciclo euleriano     │          Camino euleriano         │
   * ┌──────────┼─────────────────────────┼───────────────────────────────────┤
   * │ No       │ Todos los nodos tienen  │ Todos los nodos tienen grado par, │
   * │ dirigido │ grado par.              │ o exactamente 2 nodos tienen      │
   * │          │                         │ grado impar. (1)                  │
   * ├──────────┼─────────────────────────┼───────────────────────────────────┤
   * │ Dirigido │ Todos los nodos cumplen │ A lo más 1 nodo cumple que:       │
   * │          │ que GE = GS.            │ GS - GE = 1,                      │
   * │          │                         │ Y, a lo más 1 nodo cumple que:    │
   * │          │                         │ GE - GS = 1,                      │
   * │          │                         │ Y, el resto de nodos cumplen que: │
   * │          │                         │ GE = GS.                          │
   * └──────────┴─────────────────────────┴───────────────────────────────────┘
   * (1): si existen dichos 2 nodos, éstos serían el inicio y el final del
   * camino euleriano.
   */
  get esEuleriano() {
    const grados = listaDeAristas => {
      let grado = zipObject(this.nodos, Array(this.cantidad).fill(0));

      for (const arista of listaDeAristas) {
        grado[arista.origen]++;
        grado[arista.destino]--;
      }

      return grado;
    };

    const dirigido = grados => {
      // Nodo que cumple que GE - GS = 1.
      let origen;

      // Cantidad de nodos que cumplen que GS - GE = 1.
      let candidatoOrigen = 0;

      // Cantidad de nodos que cumplen que GE - GS = 1.
      let candidatoDestino = 0;

      const nodos = this.nodos;

      for (const nodo of nodos) {
        // Comprueba si el nodo cumple que GS - GE = 1.
        if (grados[nodo] === 1 && candidatoOrigen === 0) {
          candidatoOrigen++;
          origen = nodo;
        }

        // Comprueba si el nodo cumple que GE - GS = 1.
        else if (grados[nodo] === -1 && candidatoDestino === 0) {
          candidatoDestino++;
        }

        // Si no existen candidatos a origen/destino, o existen más de 1,
        // entonces el grafo no contiene ni camino ni ciclo euleriano.
        else if (grados[nodo] !== 0) {
          return { tipo: Trayecto.ninguno };
        }
      }

      // El grafo contiene sólo un nodo que cumple GE - GS = 1 y
      // un sólo nodo que cumple GS - GE = 1.
      // Por lo tanto, se cumple que el grafo contiene un camino euleriano.
      if (candidatoOrigen === 1 && candidatoDestino === 1) {
        return { tipo: Trayecto.camino, origen: origen };
      }

      // En todos los nodos del grafo se cumple GE = GS.
      // Por lo tanto, se cumple que el grafo contiene un ciclo euleriano.
      // Además, cualquier nodo del grafo puede ser origen del ciclo euleriano.
      else {
        return { tipo: Trayecto.ciclo, origen: first(nodos) };
      }
    };

    const noDirigido = () => {
      const nodos = this.nodos;

      // Cantidad de nodos de grado impar.
      let impares = 0;

      // Nodo impar, origen del camino euleriano.
      let impar = 0;

      // Cuenta la cantidad de nodos de grado impar del grafo. Asigna al último
      // nodo impar como candidato a origen del camino euleriano.
      for (const nodo of nodos) {
        if (this.adyacentes(nodo).length % 2 === 1) {
          impares++;
          impar = nodo;
        }
      }

      // Si solo 2 nodos del grafo son de grado impar, entonces el grafo
      // contiene un camino euleriano. Cualquiera de los dos nodos de grado
      // impar puede ser el nodo origen del camino o ciclo euleriano.
      if (impares === 2) {
        return { tipo: Trayecto.camino, origen: impar };
      }

      // Si todos los nodos del grafo son de grado par, entonces el grafo
      // contiene un ciclo euleriano. En este caso, cualquier nodo puede ser el
      // nodo origen del camino o ciclo euleriano.
      else if (impares === 0) {
        return { tipo: Trayecto.ciclo, origen: first(nodos) };
      }

      // Si no se cumple ni (1) ni (2), entonces el grafo no contiene ni caminos
      // ni ciclos eulerianos.
      return { tipo: Trayecto.ninguno };
    };

    return this.esDirigido ? dirigido(grados(this.listaDeAristas)) : noDirigido();
  }

  /**
   * Obtiene el camino o el ciclo euleriano, si el grafo contiene uno.
   *
   * @returns {number[]|boolean} Camino o ciclo euleriano, si el grafo contiene
   * alguno, `false` en caso contrario.
   *
   * Implementación del algoritmo de Hierholzer.
   */
  get caminoEuleriano() {
    /**
     * Obtiene el camino o el ciclo euleriano de un grafo, mediante el algoritmo
     * de Hierholzer.
     *
     * @param {number} origen - Nodo que origina el camino o el ciclo euleriano.
     * @returns {number[]} Camino o ciclo euleriano del grafo.
     */
    const hierholzer = origen => {
      let temporal = [origen];
      let euleriano = [];
      let grafo = cloneDeep(this);

      while (!isEmpty(temporal)) {
        const nodo = last(temporal);
        const adyacentes = grafo.adyacentes(nodo);

        // Si todos los adyacentes del nodo han sido visitados, insertar el nodo
        // en el trayecto euleriano y eliminarlo del trayecto temporal.
        if (isEmpty(adyacentes)) {
          euleriano.push(nodo);
          temporal.pop();
        }

        // Si aún quedan adyacentes por visitar, seleccionar cualquier adyacente
        // (el 1ero, por ej.), insertarlo en el trayecto temporal y eliminarlo
        // de la lista de adyacencia clonada.
        else {
          temporal.push(first(adyacentes).nodo);
          // pull(listaDeAdyacencia.get(nodo), first(adyacentes));
          grafo.eliminarArista(nodo, first(adyacentes).nodo);
        }
      }

      return euleriano.reverse();
    };

    const { tipo, origen } = this.esEuleriano;

    return tipo !== Trayecto.ninguno ? hierholzer(origen) : false;
  }
}

module.exports = { Grafo, Celda, Trayecto };
