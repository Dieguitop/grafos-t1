const math = require("mathjs");
const casos = require("../test/casos.js");

const matrizDeAdyacencia = casos[0].matrizDeAdyacencia;
const iteraciones = 1;

function matrizDeCaminosV1(matrizDeAdyacencia) {
  const n = matrizDeAdyacencia.length;
  let matrizDeCaminos = math.zeros(n, n);

  for (let i = 0; i < n; i++) {
    matrizDeCaminos = math.add(matrizDeCaminos, math.pow(matrizDeAdyacencia, i));
  }

  return matrizDeCaminos.toArray();
}

function matrizDeCaminosV2(matrizDeAdyacencia) {
  const n = matrizDeAdyacencia.length;
  let matrizDeCaminos = math.identity(n);
  let ultimaMatriz = matrizDeAdyacencia;

  for (let i = 0; i < n - 1; i++) {
    matrizDeCaminos = math.add(matrizDeCaminos, ultimaMatriz);
    ultimaMatriz = math.multiply(matrizDeAdyacencia, ultimaMatriz);
  }

  return matrizDeCaminos.toArray();
}

function matrizDeCaminosV3(matrizDeAdyacencia) {
  const n = matrizDeAdyacencia.length;
  const identidad = math.identity(n);
  return math.divide(
    math.pow(matrizDeAdyacencia, n) - identidad,
    math.subtract(matrizDeAdyacencia, identidad)
  );
}

console.time("Matriz de caminos v1 (sin caché)");
for (let i = 0; i < iteraciones; i++) {
  matrizDeCaminosV1(matrizDeAdyacencia);
}
console.timeEnd("Matriz de caminos v1 (sin caché)");
console.log(matrizDeCaminosV1(matrizDeAdyacencia));

console.time("Matriz de caminos v2 (con caché)");
for (let i = 0; i < iteraciones; i++) {
  matrizDeCaminosV2(matrizDeAdyacencia);
}
console.timeEnd("Matriz de caminos v2 (con caché)");
console.log(matrizDeCaminosV2(matrizDeAdyacencia));

console.time("Matriz de caminos v3 (con propiedad)");
for (let i = 0; i < iteraciones; i++) {
  matrizDeCaminosV3(matrizDeAdyacencia);
}
console.timeEnd("Matriz de caminos v3 (con propiedad)");
console.log(matrizDeCaminosV2(matrizDeAdyacencia));
