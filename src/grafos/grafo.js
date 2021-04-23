const estructura = require('./estructuras.js');
const matriz = require('./matriz.js');
const math = require('mathjs');

class Grafo {
  /****************
   * Constructores *
   *****************/
  constructor(listaDeAdyacencia, dirigido = false) {
    this.listaDeAdyacencia = listaDeAdyacencia;
    this.dirigido = dirigido;
  }

  // La implementación interna de `Grafo` es una lista de adyacencia,
  // por lo que este constructor redirige al constructor principal.
  static desdeListaDeAdyacencia(listaDeAdyacencia, dirigido = false) {
    return new Grafo(listaDeAdyacencia, dirigido);
  }

  static desdeMatrizDeAdyacencia(matrizDeAdyacencia, dirigido = false) {
    return new Grafo(
      estructura.MADhaciaLAD(matrizDeAdyacencia, dirigido),
      dirigido
    );
  }

  static desdeListaDeAristas(listaDeAristas, dirigido = false) {
    return new Grafo(
      estructura.LARhaciaMAD(listaDeAristas, dirigido),
      dirigido
    );
  }

  /**********
   * Getters *
   ***********/
  get matrizDeAdyacencia() {
    return estructura.LADhaciaMAD(this.listaDeAdyacencia, this.dirigido);
  }

  get listaDeAristas() {
    return estructura.LADhaciaLAR(this.listaDeAdyacencia, this.dirigido);
  }
}

module.exports = { Grafo };
