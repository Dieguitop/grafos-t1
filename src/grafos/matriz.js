// Retorna el número mayor de una matriz.
function mayor(arreglo) {
  return Math.max(...arreglo.map(e => Array.isArray(e) ? mayor(e) : e));
}

function contiene(matriz, valor) {
  return matriz.some(fila => fila.includes(valor));
}

function noContiene(matriz, valor) {
  return !contiene(matriz, valor);
}

module.exports = {
  mayor,
  contiene,
  noContiene,
};
