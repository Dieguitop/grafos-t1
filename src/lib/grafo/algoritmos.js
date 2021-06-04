import { isEmpty } from "lodash-es";
import { Direccion } from "./arista.js";

/**
 * Produce una permutación de una lista de números.
 *
 * @param {number[]} lista - Lista a calcular permutaciones.
 * @yields {number[]} La siguiente permutación de la lista de números.
 */
export function* permutar(lista) {
  // Caso base.
  if (lista.length === 1) {
    yield lista;
  } else {
    // Obtiene el primer elemento de la lista, y el resto de la lista.
    let [cabeza, ...resto] = lista;

    // Generación recursiva de permutaciones, una por cada iteración.
    for (const permutacion of permutar(resto)) {
      for (const i of lista.keys()) {
        // Divide en 2 la permutación, en el índice j.
        const [izquierda, derecha] = [permutacion.slice(0, i), permutacion.slice(i)];

        // Produce la siguiente permutación.
        yield [...izquierda, cabeza, ...derecha];
      }
    }
  }
}

/**
 * @typedef {Object} CaminoDeAumento
 *   @property {number} flujoCamino - Capacidad residual mínima del camino
 *   de aumento.
 *   @property {number[]} padre - Lista de padres de cada nodo, siguiendo el
 *   camino de aumento.
 */
/**
 * Recorre el grafo para encontrar un camino de aumento (CA).
 *
 * @param {number} entrada - Nodo donde comienza el camino de aumento.
 * @param {number} salida - Nodo donde termina el camino de aumento.
 * @param {number[][]} capacidad - Matriz de capacidades residuales de las
 * aristas del grafo.
 * @returns {CaminoDeAumento} Flujo del camino de aumento, y lista de padres
 * de cada nodo, siguiendo el mismo camino de aumento.
 *
 * Algoritmo de búsqueda en anchura (breadth-first search, BFS).
 */
export function caminoDeAumento(grafo, entrada, salida, capacidad) {
  // Arreglo utilizado para recordar los nodos padres de cada nodo i-ésimo
  // (si es que fue visitado).
  let padre = Array(grafo.cantidad);

  // El nodo entrada no tiene padre.
  padre[entrada] = null;

  // Se utiliza una cola para almacenar los nodos que están en el mismo
  // nivel del nodo actual (nodo entrada, inicialmente), más el flujo del
  // CA asociado al nodo ingresado.
  for (let cola = [{ nodo: entrada, flujo: Infinity }]; !isEmpty(cola); ) {
    // Extrae el primer elemento de la cola.
    const { nodo: actual, flujo } = cola.shift();

    // Se exploran los adyacentes (de salida y de entrada) del nodo actual.
    for (const { nodo: siguiente } of grafo.adyacentes(actual, Direccion.ambas)) {
      // Capacidad residual de la arista {actual, siguiente}.
      const capacidadArista = capacidad[actual][siguiente];

      // Comprueba si el nodo siguiente no ha sido visitado (porque su padre
      // no está definido) y si la capacidad residual de la arista {actual,
      // siguiente} es positiva.
      if (padre[siguiente] === undefined && capacidadArista > 0) {
        // Recordar el nodo padre (nodo actual) del nodo siguiente.
        padre[siguiente] = actual;

        // Calcula la capacidad residual menor del CA.
        let flujoCamino = Math.min(flujo, capacidadArista);

        // Comprueba si se ha llegado al final del CA.
        if (siguiente === salida) {
          return { flujoCamino, padre };
        }

        // Ingresa a la cola el nodo siguiente (un nivel más abajo del nodo
        // de entrada).
        cola.push({ nodo: siguiente, flujo: flujoCamino });
      }
    }
  }

  // Si el flujo del camino es 0, entonces no se encontró ningún CA.
  return { flujoCamino: 0, padre };
}
