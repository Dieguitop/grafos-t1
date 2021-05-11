const { Adyacente } = require("./nodo.js");

/**
 * @enum {number}
 *
 * Representa la dirección de una arista.
 */
const Direccion = Object.freeze({
  salida: 1,
  entrada: 2,
});

/**
 * Representación de una arista.
 * @class
 */
class Arista {
  /**
   * @constructor
   * @param {number} origen - Nodo origen.
   * @param {number|Adyacente} destino - Nodo destino.
   * @param {number} peso - Peso de la arista.
   *
   * Notar que si el nodo destino es de tipo `Adyacente`, el parámetro peso es
   * ignorado.
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
   * @typedef {Object} Link
   *   @property {string} from - Origen de la arista.
   *   @property {string} to - Destino de la arista.
   *   @property {string} text - Peso de la arista.
   */
  /**
   * Construye una lista a partir de un link.
   *
   * @param {Link} link - Link.
   */
  static desdeLink(link) {
    const { from, to, text } = link;
    return new Arista(Number(from), Number(to), text == null ? undefined : Number(text));
  }

  /**
   * Comprueba si la arista es ponderada.
   *
   * @returns {boolean} `true` si la arista es ponderada, `false` en caso
   * contrario.
   */
  get esPonderada() {
    return this.peso != null;
  }
}

module.exports = { Arista, Direccion };
