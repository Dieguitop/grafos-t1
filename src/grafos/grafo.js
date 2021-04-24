const estructura = require('./estructuras.js');
const matriz = require('./matriz.js');
const algoritmo = require('./algoritmos.js');

class Grafo {
  //// Constructores ////
  constructor(listaDeAdyacencia, esDirigido = false) {
    this.listaDeAdyacencia = listaDeAdyacencia;
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

  //// Getters ////
  get matrizDeAdyacencia() {
    return estructura.LADhaciaMAD(this.listaDeAdyacencia, this.esDirigido);
  }

  get listaDeAristas() {
    return estructura.LADhaciaLAR(this.listaDeAdyacencia, this.esDirigido);
  }

  get matrizDeCaminos() {
    return algoritmo.matrizDeCaminos(this.matrizDeAdyacencia);
  }

  get esConexo() {
    return matriz.noContiene(this.matrizDeCaminos, 0);
  }

  get noEsConexo() {
    return !this.esConexo;
  }

  get esPonderado() {
    for (const adyacencias of this.listaDeAdyacencia.values()) {
      for (const nodo of adyacencias) {
        if (nodo.peso !== undefined) {
          return true;
        }
      }
    }

    return false;
  }

  get noEsPonderado() {
    return !this.esPonderado;
  }
}

module.exports = { Grafo };
