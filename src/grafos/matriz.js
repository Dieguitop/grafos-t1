/**
 * Comprueba si una matriz contiene un valor determinado.
 *
 * @param {any[][]} matriz - Matriz a examinar.
 * @param {any} valor - Valor a buscar.
 * @returns {boolean} `true` si la matriz contiene el valor, `false` en caso contrario.
 */
function contiene(matriz, valor) {
  return matriz.some(fila => fila.includes(valor));
}

/**
 * Comprueba si una matriz no contiene un valor determinado.
 *
 * @param {any[][]} matriz - Matriz a examinar.
 * @param {any} valor - Valor a buscar.
 * @returns {boolean} `true` si la matriz no contiene el valor, `false` en caso contrario.
 */
function noContiene(matriz, valor) {
  return !contiene(matriz, valor);
}

/**
 * Comprueba si en una matriz, al menos un elemento cumple con el predicado.
 *
 * @param {any[][]} matriz - Matriz a examinar.
 * @param {function(any):boolean} predicado - Callback con la condición que debe cumplir al
 * menos un elemento.
 * @returns {boolean} `true` si al menos un elemento de la matriz cumple con el predicado,
 * `false` en caso contrario.
 */
function algun(matriz, predicado) {
  return matriz.some(fila => fila.some(predicado));
}

/**
 * Comprueba si una matriz solo contiene los valores dados.
 *
 * @param {any[][]} matriz - Matriz a examinar.
 * @param {...any} valores - Valores a buscar.
 * @returns {boolean} `true` si la matriz solo contiene los valores dados, `false` en caso contrario.
 */
function solo(matriz, ...valores) {
  return matriz.every(fila => fila.every(celda => valores.includes(celda)));
}

/**
 * Crea una matriz rellenada con un valor específico.
 *
 * @param {number} m - Cantidad de filas de la matriz.
 * @param {number} n - Cantidad de columnas de la matriz.
 * @param {any} valor - Valor utilizado como relleno.
 */
function rellenar(m, n, valor) {
  return new Array(m).fill(valor).map(() => {
    return new Array(n).fill(valor);
  });
}

module.exports = {
  contiene,
  noContiene,
  algun,
  solo,
  rellenar
};
