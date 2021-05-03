const { Adyacente } = require('./nodo.js');

/**
 * Representación de una arista.
 * @class
 */
class Arista {
  /*
   * @constructor
   * @param {number} origen - Nodo origen.
   * @param {number|Adyacente} destino - Nodo destino.
   * @param {number} peso - Peso de la arista.
   *
   * Notar que si el nodo destino es de tipo `Adyacente`, el parámetro peso es ignorado.
   */
  constructor(origen, destino, peso) {
    this.origen = origen;

    if (destino instanceof Adyacente) {
      this.destino = destino.nodo;
      this.peso = destino.peso;
    } else {
      this.destino = destino;
      this.peso = peso;
    }
  }

  /**
   * Comprueba si la arista es ponderada.
   *
   * @returns {boolean} `true` si la arista es ponderada, `false` en caso contrario.
   */
  get esPonderada() {
    return Boolean(this.peso);
  }
}

module.exports = { Arista };
