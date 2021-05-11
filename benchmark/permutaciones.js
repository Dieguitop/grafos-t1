const { flatMap, without, map } = require("lodash");

const iteraciones = 1000;
const lista = [0, 1, 2, 3, 4, 5];

const permutacionesLodash = (lista) =>
  flatMap(lista, (elemento) =>
    lista.length < 2
      ? [lista]
      : map(permutacionesLodash(without(lista, elemento)), (permutaciones) => [
          elemento,
          ...permutaciones,
        ])
  );

const permutacionesYield = function* (lista) {
  if (lista.length === 1) {
    yield lista;
  } else {
    let [cabeza, ...resto] = lista;
    for (let permutacion of permutacionesYield(resto)) {
      for (const j of lista.keys()) {
        let inicio = permutacion.slice(0, j);
        let resto = permutacion.slice(j);
        yield [...inicio, cabeza, ...resto];
      }
    }
  }
};

console.time("Permutaciones (lodash)");
for (let i = 0; i < iteraciones; i++) {
  permutacionesLodash(lista);
}
console.timeEnd("Permutaciones (lodash)");
console.log(permutacionesLodash(lista));

console.time("Permutaciones (yield)");
for (let i = 0; i < iteraciones; i++) {
  const permutaciones = permutacionesYield(lista);
  for (const permutacion of permutaciones) {
  }
}
console.timeEnd("Permutaciones (yield)");
console.log(Array.from(permutacionesYield(lista)));
