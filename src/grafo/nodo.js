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

module.exports = { Adyacente };
