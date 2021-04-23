const estructura = require('./estructuras.js');
const matriz = require('./matriz.js');
const algoritmo = require('./algoritmos.js');

class Grafo {
  /*
   * Constructores
   ****************/
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

  /*
   * Getters
   **********/
  get matrizDeAdyacencia() {
    return estructura.LADhaciaMAD(this.listaDeAdyacencia, this.dirigido);
  }

  get listaDeAristas() {
    return estructura.LADhaciaLAR(this.listaDeAdyacencia, this.dirigido);
  }

  get matrizDeCaminos() {
    return algoritmo.matrizDeCaminos(this.matrizDeAdyacencia);
  }

  get esConexo() {
    return matriz.noContiene(this.matrizDeCaminos, 0);
  }
}

module.exports = { Grafo };
