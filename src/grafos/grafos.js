function adyacencia(aristas, dirigido = false) {
  const n = mayor(aristas) + 1;

  // Crea una matriz de n x n ceros.
  var matriz = new Array(n).fill(0).map(() => new Array(n).fill(0));

  for (const arista of aristas) {
    const [i, j] = arista;
    matriz[i][j] = 1;

    // La matriz de adyacencia de un grafo no dirigido es simétrica.
    if (dirigido === false) {
      matriz[j][i] = 1;
    }
  }

  return matriz;
}

// Retorna el número mayor de una matriz.
function mayor(matriz) {
  // Crea un arreglo con los números mayores de cada fila en `matriz`.
  var mayores = matriz.map(fila => Math.max(...fila));
  return Math.max(...mayores);
}

module.exports = { adyacencia, mayor };
