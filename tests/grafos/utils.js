function describirGrafo(id, esDirigido, esPonderado) {
  const direccion = esDirigido === true ? "dirigido" : "no dirigido";
  const ponderacion = esPonderado === true ? "ponderado" : "no ponderado";
  return `Grafo ${id} (${direccion}, ${ponderacion})`;
}

module.exports = {
  describirGrafo
}
