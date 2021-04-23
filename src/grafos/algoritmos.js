const math = require('mathjs');

function matrizDeCaminos(matrizDeAdyacencia) {
  const n = matrizDeAdyacencia.length;
  var matrizDeCaminos = math.identity(n);
  var ultimaMatriz = matrizDeAdyacencia;

  for (let i = 0; i < n - 1; i++) {
    matrizDeCaminos = math.add(matrizDeCaminos, ultimaMatriz);
    ultimaMatriz = math.multiply(matrizDeAdyacencia, ultimaMatriz);
  }

  return matrizDeCaminos.toArray();
}

module.exports = {
  matrizDeCaminos,
};
