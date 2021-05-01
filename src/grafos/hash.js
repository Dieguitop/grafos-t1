/**
 * Comprueba si una tabla hasheada contiene un valor determinado.
 *
 * @param {Object} hash - Tabla hasheada a examinar.
 * @returns {boolean} `true` si la tabla hasheada contiene el valor, `false` en caso contrario.
 */
function contiene(hash, valor) {
  return hash.hasOwnProperty(valor);
}

/**
 * Comprueba si una tabla hasheada no contiene un valor determinado.
 *
 * @param {Object} hash - Tabla hasheada a examinar.
 * @returns {boolean} `true` si la tabla hasheada no contiene el valor, `false` en caso contrario.
 */
function noContiene(hash, valor) {
  return !contiene(hash, valor);
}

/**
 * Agrega valores a una tabla hasheada.
 *
 * @param {Object} hash - Tabla hasheada a la que se le agregarán los valores.
 * @param {...any} valores - Valores a agregar.
 * @returns {void}
 */
function agregar(hash, ...valores) {
  for (const valor of valores) {
    hash[valor] = undefined;
  }
}

module.exports = {
  contiene,
  noContiene,
  agregar
}
