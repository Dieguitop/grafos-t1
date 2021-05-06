const { casos } = require("../test/casos.js");
const _ = require("lodash");

const { listaDeAdyacencia, listaDeAristas } = casos[0];

const iteraciones = 1000000;

function _fill(n) {
  return _.times(n, _.constant(_.times(n, _.constant(0))));
}

function fill(n) {
  return Array(n)
    .fill(0)
    .map(() => {
      return Array(n).fill(0);
    });
}

console.time("_fill");
for (let i = 0; i < iteraciones; i++) {
  _fill(5);
}
console.timeEnd("_fill");
console.log(_fill(5));

console.time("fill");
for (let i = 0; i < iteraciones; i++) {
  fill(5);
}
console.timeEnd("fill");
console.log(fill(5));

function esPonderadoSome(listaDeAdyacencia) {
  return _.some([...listaDeAdyacencia.values()], e => _.some(e, "esPonderado"));
}

function esPonderadoFlattenDeep(listaDeAdyacencia) {
  return _.some(_.flattenDeep([...listaDeAdyacencia.values()]), "esPonderado");
}

console.time("esPonderadoSome");
for (let i = 0; i < iteraciones; i++) {
  esPonderadoSome(listaDeAdyacencia);
}
console.timeEnd("esPonderadoSome");
console.log(esPonderadoSome(listaDeAdyacencia));

console.time("esPonderadoFlattenDeep");
for (let i = 0; i < iteraciones; i++) {
  esPonderadoFlattenDeep(listaDeAdyacencia);
}
console.timeEnd("esPonderadoFlattenDeep");
console.log(esPonderadoFlattenDeep(listaDeAdyacencia));
