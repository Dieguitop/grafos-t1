/**
 * Representación de un nodo adyacente.
 * @class
 */
class Adyacente {
  /*
   * @constructor
   * @param {number} nodo - Nodo adyacente.
   * @param {number} peso - Peso de la arista.
   */
  constructor(nodo, peso) {
    this.nodo = nodo;
    this.peso = peso;
  }

  get esPonderado() {
    return Boolean(this.peso);
  }
}

/**
 * Comprueba si el nodo adyacente es ponderado, y si su peso es válido.
 *
 * @param {number|Adyacente} adyacente - Nodo adyacente.
 */
function esPonderado(adyacente) {
  return adyacente instanceof Adyacente && adyacente.esPonderado;
}

module.exports = { Adyacente, esPonderado };
