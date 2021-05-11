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
   * @typedef {Object} Link
   *   @property {string} from - Origen de la arista.
   *   @property {string} to - Destino de la arista.
   *   @property {string} text - Peso de la arista.
   */
  /**
   * Construye un grafo a partir de una lista de links.
   *
   * @param {Link[]} listaDeLinks - Lista de links.
   * @param {boolean} [esDirigido=false] - `true` si el grafo de la lista de
   * links es dirigido, `false` en caso contrario.
   *
   * @example
   * // Grafo: 0 --(1)--> 1, 0 --(4)--> 2, 0 --(7)--> 3, 1 --(9)--> 2.
   * const listaDeLinks = [
   *   { from: "0", to: "1", text: "1" },
   *   { from: "0", to: "2", text: "4" },
   *   { from: "0", to: "3", text: "7" },
   *   { from: "1", to: "2", text: "9" },
   * ];
   *
   * // La lista de links no contiene aristas dirigidas.
   * const esDirigido = false;
   * const grafo = Grafo.desdeListaDeLinks(listaDeLinks, esDirigido);
   */
  static desdeListaDeLinks(listaDeLinks, esDirigido = false) {
    let listaDeAristas = [];

    for (const link of listaDeLinks) {
      listaDeAristas.push(Arista.desdeLink(link));
    }

    return Grafo.desdeListaDeAristas(listaDeAristas, esDirigido);
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
   * const grafo = Grafo.desdeListaDeAdyacencia(matrizDeAdyacencia, esDirigido);
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
   * const grafo = Grafo.desdeListaDeAristas(listaDeAristas, esDirigido);
   */
  static desdeListaDeAristas(listaDeAristas, esDirigido = false) {
    // Calcula la lista de nodos del grafo:
    // Obtiene los valores (origen, destino, peso) de las aristas, omitiendo el
    // peso. Elimina los duplicados, y ordena los elementos ascendentemente.
    const nodos = uniq(listaDeAristas.flatMap((arista) => values(omit(arista, "peso")))).sort();

    // Genera un mapa (o diccionario) donde las llaves son los nodos y sus valores
    // asociados son las listas (inicialmente vacías) de los nodos adyacentes a
    // cada nodo.
    let listaDeAdyacencia = new Map(map(nodos, (nodo) => [nodo, []]));

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
      for (const { nodo: j, peso: celda = Celda.conectada } of adyacentes) {
        // Si el adyacente es ponderado, el valor de la celda (i, j) corresponde
        // al peso de la arista que une al nodo i con el nodo j. En caso
        // contrario, a la celda (i, j) se la asigna `true`.
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
    return uniq(map(flattenDeep([...this.listaDeAdyacencia]), (nodo) => nodo?.nodo ?? nodo)).sort();
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
    return !some(this.matrizDeCaminos, (fila) => fila.includes(Celda.desconectada));
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
    return some([...this.listaDeAdyacencia.values()], (adyacente) =>
      some(adyacente, "esPonderado")
    );
  }

  /**
   * Comprueba si existe una arista entre el nodo origen y el nodo destino.
   *
   * @param {number} origen - Nodo origen.
   * @param {number} destino - Nodo destino.
   * @param {Direccion} [direccion=Direccion.salida] - Dirección de la arista
   * buscada.
   * @returns {boolean} `true` si la arista entre el nodo origen y el nodo
   * destino existe, `false` en caso contrario.
   *
   * @todo Aristas no dirigidas vs doble aristas de salida y de entrada
   * (multigrafo). Ver también método `arista`.
   */
  existeArista(origen, destino, direccion = Direccion.salida) {
    return some(this.adyacentes(origen, direccion), ["nodo", destino]);
  }

  /**
   * Comprueba si existe una arista entre el nodo origen y el nodo destino.
   *
   * @param {number} origen - Nodo origen.
   * @param {number} destino - Nodo destino.
   * @param {Direccion} [direccion=Direccion.salida] - Dirección de la arista
   * buscada.
   * @returns {Arista|boolean} Arista, si existe; `false`, en caso contrario.
   *
   * @todo Aristas no dirigidas vs doble aristas de salida y de entrada
   * (multigrafo). Ver también método `existeArista`.
   */
  arista(origen, destino, direccion = Direccion.salida) {
    if (!this.existeArista(origen, destino, direccion)) {
      return false;
    }

    // Encuentra el nodo destino en los adyacentes de entrada (si la arista
    // encontrada es sólo de entrada) o en los adyacentes de salida (si la
    // arista encontrada es sólo de salida, o de salida y además de entrada).
    const { peso } = find(this.adyacentes(origen, direccion), ["nodo", destino]);

    // Si se desea obtener una arista de entrada (es decir, dirigida desde el
    // destino hacia el origen), se debe intercambiar el destino con el origen.
    if (direccion === Direccion.entrada) {
      return new Arista(destino, origen, peso);
    }

    return new Arista(origen, destino, peso);
  }

  /**
   * Elimina la arista, si existe, entre el nodo origen y el nodo destino.
   *
   * @param {number} origen - Nodo origen.
   * @param {number} destino - Nodo destino.
   * @param {Direccion} [direccion=Direccion.salida] - Dirección de la arista
   * buscada.
   * @returns {Adyacente[]|boolean} Si la arista existía, adyacentes explícitos
   * del nodo origen; `false`, en caso contrario.
   */
  eliminarArista(origen, destino, direccion = Direccion.salida) {
    if (!this.existeArista(origen, destino, direccion)) {
      return false;
    }

    // Si la arista es dirigida hacia el origen, invertir los vértices.
    else if (direccion === Direccion.entrada) {
      return remove(this.listaDeAdyacencia.get(destino), ["nodo", origen]);
    }

    return remove(this.listaDeAdyacencia.get(origen), ["nodo", destino]);
  }

  /**
   * Obtiene los nodos adyacentes (de salida o entrada) a un nodo.
   *
   * @param {number} nodo - Nodo.
   * @param {Direccion} [direccion=Direccion.salida] - Dirección de los nodos
   * adyacentes al nodo.
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
   * console.log(grafo.adyacentes(0, Direccion.entrada));
   * // Valor esperado:
   * // [new Adyacente(2, 4)]
   */
  adyacentes(nodo, direccion = Direccion.salida) {
    // Métodos para obtener adyacentes explícitos, de salida, de entrada y
    // totales.
    const adyacentes = {
      /**
       * Obtiene los nodos adyacentes que interna y explícitamente están
       * asociados al nodo origen.
       *
       * @param {number} nodo - Nodo origen.
       * @returns {!Adyacente[]} Lista de adyacentes de salida.
       *
       * Debido al funcionamiento de las listas de adyacencia, un nodo de un
       * grafo no dirigido tiene nodos adyacentes que no están explícitamente
       * asociados en dicha lista de adyacencia.
       */
      explicitos: (nodo) => {
        return this.listaDeAdyacencia.get(nodo) ?? [];
      },

      /**
       * Obtiene los nodos adyacentes de salida del nodo.
       *
       * @param {number} nodo - Nodo origen.
       * @returns {!Adyacente[]} Lista de adyacentes de salida.
       *
       * Los nodos adyacentes de entrada son aquellos que entregan alguna
       * conexión al nodo origen.
       */
      entrantes: (nodo) => {
        let entrantes = [];

        for (const [origen, adyacentes] of this.listaDeAdyacencia) {
          // Ignorar los adyacentes del nodo origen. De esta forma, se evitan
          // las aristas bucles.
          if (origen === nodo) {
            continue;
          }

          for (const { nodo: destino, peso } of adyacentes) {
            if (nodo === destino) {
              entrantes.push(new Adyacente(origen, peso));
            }
          }
        }

        return entrantes;
      },
    };

    // En los grafos no dirigidos las aristas no tienen dirección, pero como
    // algunos adyacentes no están explícitos en la lista de adyacencia,
    // se deben agregar los adyacentes implícitos (o de entrada, en caso de un
    // grafo dirigido).
    if (!this.esDirigido) {
      return unionBy(adyacentes.explicitos(nodo), adyacentes.entrantes(nodo), "nodo");
    } else if (direccion === Direccion.salida) {
      return adyacentes.explicitos(nodo);
    } else if (direccion === Direccion.entrada) {
      return adyacentes.entrantes(nodo);
    }

    // El nodo no tiene adyacentes.
    return [];
  }

  /**
   * Calcula el grado de un nodo.
   *
   * @param {number} nodo - Nodo.
   * @param {?Direccion} direccion - Dirección de los nodos adyacentes
   * considerados en el grado.
   * @returns {number} Grado del nodo.
   *
   * @todo Considerar caso de aristas bucle.
   */
  grado(nodo, direccion) {
    // Si el grafo es dirigido, y no se provee una dirección específica, se
    // calcula el grado total como el grado de salida más el grado de entrada.
    if (this.esDirigido && direccion == null) {
      return this.grado(nodo, Direccion.salida) + this.grado(nodo, Direccion.entrada);
    }

    // Se obtienen los adyacentes con la dirección específicada y se retorna la
    // cantidad de ellos.  Si el grafo no es dirigido, y no se provee una
    // dirección específica, se retorna el grado de salida como grado total (no
    // hay distinción de dirección en los grafos no dirigidos);
    return this.adyacentes(nodo, direccion ?? Direccion.salida).length;
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
    const noVisitadoConMenorDistancia = (distancias, noVisitados) => {
      // Se obtiene el primer valor de la lista de nodos no visitados.
      let menor = noVisitados.values().next().value;

      for (const nodo of noVisitados) {
        if (distancias.get(nodo) < distancias.get(menor)) {
          menor = nodo;
        }
      }

      return menor;
    };

    const nodos = this.nodos;
    let noVisitados = new Set(nodos);

    // Distancias del nodo origen a todos los nodos del grafo.
    let distancias = new Map();

    // Nodos padres de cada nodo, siguiendo la ruta óptima (desde el nodo
    // origen).
    let padres = new Map();

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
    let camino = new Set().add(destino);

    // Se itera inversamente los nodos padres, desde el nodo destino.
    let padre = padres.get(destino);

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
    let arbol = [];
    let conjunto = new ConjuntoDisjunto();

    // Crea un conjunto disjunto por cada nodo del grafo.
    for (const nodo of this.nodos) {
      conjunto.crear(nodo);
    }

    // Ordena la lista de aristas según sus pesos, ascendentemente.
    let aristas = this.listaDeAristas.sort((a, b) => a.peso - b.peso);

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
   * @returns {TrayectoEuleriano} Tipo de trayecto (camino o ciclo) y
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
   * │          │                         │ GE - GS = 1 (o GS - GE = -1)      │
   * │          │                         │ Y, el resto de nodos cumplen que: │
   * │          │                         │ GE = GS.                          │
   * └──────────┴─────────────────────────┴───────────────────────────────────┘
   * (1): si existen dichos 2 nodos, éstos serían el inicio y el final del
   * camino euleriano.
   */
  get esEuleriano() {
    const requisitos = {
      /**
       * Requisitos que debe cumplir un grafo dirigido para contener un camino o
       * un ciclo euleriano.
       *
       * @returns {TrayectoEuleriano} Tipo de trayecto (camino o ciclo) y
       * nodo que origina el trayecto.
       */
      dirigido: () => {
        const diferenciaGrado = (nodo) => {
          return this.grado(nodo, Direccion.salida) - this.grado(nodo, Direccion.entrada);
        };

        // Cualquier nodo que cumpla: GE - GS = 1.
        let origen;

        // Cantidad de nodos que cumplen: GS - GE = 1.
        let candidatoOrigen = 0;

        // Cantidad de nodos que cumplen: GE - GS = 1.
        let candidatoDestino = 0;

        const nodos = this.nodos;

        for (const nodo of nodos) {
          // Comprueba si el nodo cumple: GS - GE = 1.
          if (diferenciaGrado(nodo) === 1) {
            candidatoOrigen++;
            origen = nodo;
          }

          // Comprueba si el nodo cumple: GS - GE = -1.
          else if (diferenciaGrado(nodo) === -1) {
            candidatoDestino++;
          }

          // Si el nodo no cumple ninguna de las dos condiciones anteriores,
          // necesariamente tiene que cumplir: GE = GS.
          else if (diferenciaGrado(nodo) !== 0) {
            return false;
          }
        }

        // El grafo contiene sólo un nodo que cumple: GE - GS = 1 y un sólo nodo
        // que cumple: GS - GE = 1. Por lo tanto, se cumple que el grafo
        // contiene un camino euleriano.
        if (candidatoOrigen === 1 && candidatoDestino === 1) {
          return { tipo: Trayecto.camino, origen: origen };
        }

        // En todos los nodos del grafo se cumple GE = GS. Por lo tanto, se
        // cumple que el grafo contiene un ciclo euleriano. Además, cualquier
        // nodo del grafo puede ser origen del ciclo euleriano.
        else {
          return { tipo: Trayecto.ciclo, origen: first(nodos) };
        }
      },

      /**
       * Requisitos que debe cumplir un grafo no dirigido para contener un
       * camino o un ciclo euleriano.
       *
       * @returns {TrayectoEuleriano} Tipo de trayecto (camino o ciclo) y
       * nodo que origina el trayecto.
       */
      noDirigido: () => {
        const nodos = this.nodos;

        // Cantidad de nodos de grado impar.
        let impares = 0;

        // Nodo impar, origen del camino euleriano.
        let impar = 0;

        // Cuenta la cantidad de nodos de grado impar del grafo. Asigna al
        // último nodo impar como candidato a origen del camino euleriano.
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
        // contiene un ciclo euleriano. En este caso, cualquier nodo puede ser
        // el nodo origen del camino o ciclo euleriano.
        else if (impares === 0) {
          return { tipo: Trayecto.ciclo, origen: first(nodos) };
        }

        // El grafo no contiene ni caminos ni ciclos eulerianos.
        return false;
      },
    };

    return this.esDirigido ? requisitos.dirigido() : requisitos.noDirigido();
  }

  /**
   * Obtiene el camino o el ciclo euleriano, si el grafo contiene uno.
   *
   * @param {?Trayecto} trayecto - Tipo de trayecto euleriano.
   * @returns {number[]|boolean} Camino o ciclo euleriano, si el grafo contiene
   * alguno, `false` en caso contrario.
   *
   * Implementación del algoritmo de Hierholzer.
   */
  euleriano(tipo) {
    /**
     * Obtiene el camino o el ciclo euleriano de un grafo, mediante el algoritmo
     * de Hierholzer.
     *
     * @param {number} origen - Nodo que origina el camino o el ciclo euleriano.
     * @returns {number[]} Camino o ciclo euleriano del grafo.
     */
    const hierholzer = (origen) => {
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

    const { tipo: calculado, origen } = this.esEuleriano || {};

    // Si el grafo contiene algun trayecto euleriano, y el tipo esperado es
    // igual al calculado o no se espera ningún tipo de trayecto específico,
    // calcular el trayecto euleriano a partir del nodo origen.
    if (calculado != null && (tipo === calculado || tipo == null)) {
      return hierholzer(origen);
    }

    // El grafo no contiene ni caminos ni ciclos eulerianos.
    return false;
  }
}

module.exports = { Grafo, Celda, Trayecto, Arista, Direccion };
