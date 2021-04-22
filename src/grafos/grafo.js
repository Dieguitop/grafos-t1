const estructura = require('./estructuras.js');

class Grafo {
  /****************
  * Constructores *
  *****************/
  constructor(lad, dirigido = false) {
    this.lad = lad;
    this.dirigido = dirigido;
  }

  // La implementación interna de `Grafo` es una lista de adyacencia,
  // por lo que este constructor redirige al constructor principal.
  static desdeLAD(lad, dirigido = false) {
    return new Grafo(lad, dirigido);
  }

  static desdeMAD(mad, dirigido = false) {
    return new Grafo(
      estructura.MADhaciaLAD(mad, dirigido),
      dirigido
    );
  }

  static desdeLAR(lar, dirigido = false) {
    return new Grafo(
      estructura.LARhaciaMAD(lar, dirigido),
      dirigido
    );
  }

  /**********
  * Getters *
  ***********/
  get listaDeAdyacencia() {
    return this.lad;
  }

  get mad() {
    return estructura.LADhaciaMAD(this.lad, this.dirigido);
  }

  get matrizDeAdyacencia() {
    return this.matrizDeAdyacencia;
  }

  get lar() {
    return estructura.LADhaciaLAR(this.lad, this.dirigido);
  }

  get listaDeAristas() {
    return this.listaDeAristas;
  }
}

module.exports = { Grafo };
