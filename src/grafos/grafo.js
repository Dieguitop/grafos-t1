const estructura = require('./estructuras.js');
const matriz = require('./matriz.js');
const hash = require('./hash.js');

const math = require('mathjs');

class Grafo {
  //// Constructores
  constructor(listaDeAdyacencia, esDirigido = false) {
    this.listaDeAdyacencia = new Map(listaDeAdyacencia);
    this.esDirigido = esDirigido;
  }

  // La implementación interna de `Grafo` es una lista de adyacencia,
  // por lo que este constructor redirige al constructor principal.
  static desdeListaDeAdyacencia(listaDeAdyacencia, esDirigido = false) {
    return new Grafo(listaDeAdyacencia, esDirigido);
  }

  static desdeMatrizDeAdyacencia(matrizDeAdyacencia, esDirigido = false) {
    return new Grafo(
      estructura.MADhaciaLAD(matrizDeAdyacencia, esDirigido),
      esDirigido
    );
  }

  static desdeListaDeAristas(listaDeAristas, esDirigido = false) {
    return new Grafo(
      estructura.LARhaciaMAD(listaDeAristas, esDirigido),
      esDirigido
    );
  }

  //// Getters
  get matrizDeAdyacencia() {
    return estructura.LADhaciaMAD(this.listaDeAdyacencia, this.esDirigido);
  }

  get listaDeAristas() {
    return estructura.LADhaciaLAR(this.listaDeAdyacencia, this.esDirigido);
  }

  get cantidadDeNodos() {
    return this.nodos.length;
  }

  get nodos() {
    return [...new Set(
      [...this.listaDeAdyacencia].flat(2).sort()
    )];
  }

  adyacencias(nodo) {
    return this.listaDeAdyacencia.get(nodo);
  }

  get esConexo() {
    // Un grafo es conexo si su matriz de caminos no contiene ningún 0.
    return matriz.noContiene(this.matrizDeCaminos, 0);
  }

  get noEsConexo() {
    return !this.esConexo;
  }

  get esPonderado() {
    for (const adyacencias of this.listaDeAdyacencia.values()) {
      for (const nodo of adyacencias) {
        if (hash.contiene(nodo, 'peso')) {
          return true;
        }
      }
    }

    return false;
  }

  get noEsPonderado() {
    return !this.esPonderado;
  }

  //// Algoritmos

  // Calcula la matriz de caminos, definida como la sumatoria de A^i, desde i = 0,
  // hasta i = n - 1, donde A es la matriz de adyacencia del grafo, y n es la
  // cantidad de nodos del mismo grafo.
  // Desde i = 2, el resultado de A^(i - 1) se recuerda, para calcular el
  // próximo término A^i como A^(i - 1) * A.
  get matrizDeCaminos() {
    const matrizDeAdyacencia = this.matrizDeAdyacencia;
    const n = this.cantidadDeNodos;
    var matrizDeCaminos = math.identity(n);

    // Recordar el valor de A^(i - 1).
    var ultimaPotencia = matrizDeAdyacencia;

    for (let i = 2; i <= n; i++) {
      matrizDeCaminos = math.add(matrizDeCaminos, ultimaPotencia);

      // Calcular A^i como A^(i - 1) * A.
      ultimaPotencia = math.multiply(ultimaPotencia, matrizDeAdyacencia);
    }

    return matrizDeCaminos.toArray();
  }
}

module.exports = { Grafo };
