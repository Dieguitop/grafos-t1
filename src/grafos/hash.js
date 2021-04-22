function contiene(obj, valor) {
  return obj.hasOwnProperty(valor);
}

function noContiene(obj, valor) {
  return !contiene(obj, valor);
}

function agregar(obj, ...valores) {
  for (const valor of valores) {
    obj[valor] = undefined;
  }
}

module.exports = {
  contiene,
  noContiene,
  agregar
}
