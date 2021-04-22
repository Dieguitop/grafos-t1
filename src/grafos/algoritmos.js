const { add, pow, zeros } = require('mathjs');

function matrizDeCaminos(mad) {
  const n = mad.length;
  var matrizDeCaminos = zeros(n, n);

  for (let i = 0; i < n; i++) {
    matrizDeCaminos = add(matrizDeCaminos, pow(mad, i));
  }

  return matrizDeCaminos.toArray();
}

function esConexo(mad) {
  return !contiene(matrizDeCaminos(mad), 0);
}

function contiene(matriz, valor) {
  return matriz.some(fila => fila.includes(valor));
}

module.exports = { matrizDeCaminos, esConexo };
