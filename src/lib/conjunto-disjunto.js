/**
 * Representación de un conjunto disjunto.
 * @class
 */
class ConjuntoDisjunto {
  /**
   * @constructor
   */
  constructor() {
    this.padre = [];
    this.grado = [];
  }

  /**
   * Crea un nuevo conjunto, donde el nodo x es el único nodo del conjunto.
   *
   * @param {any} x - Nodo a agregar.
   * @returns {void}
   */
  crear(x) {
    this.padre[x] = x;
    this.grado[x] = 0;
  }

  /**
   * Busca el nodo raíz que representa al conjunto que contiene al nodo x.
   *
   * @param {any} x - Nodo cuya raíz representativa es buscada.
   * @returns {any} Raíz que representa al conjunto que contiene al nodo x.
   *
   * Implementación del algoritmo de división de camino, de una pasada.
   */
  buscar(x) {
    while (x !== this.padre[x]) {
      // Reemplaza cada nodo por su padre, y cada padre por su respectivo padre.
      [x, this.padre[x]] = [this.padre[x], this.padre[this.padre[x]]];
    }

    return x;
  }

  /**
   * Une los conjuntos de los elementos x e y en un sólo conjunto.
   *
   * @param {any} x - Nodo cuyo conjunto se une con el conjunto del nodo y.
   * @param {any} y - Nodo cuyo conjunto se une con el conjunto del nodo x.
   * @returns {boolean} `true` si los conjuntos fueron unidos, `false` en caso contrario.
   *
   * Implementación del algoritmo de unión por grado (rank).
   */
  unir(x, y) {
    // Raíz del nodo x.
    let rx = this.buscar(x);

    // Raíz del nodo y.
    let ry = this.buscar(y);

    if (rx === ry) {
      // Los elementos ya están en el mismo conjunto.
      return false;
    }

    // Si es necesario, reasignar las variables para garantizar que el grado de x es
    // mayor o igual que el grado de y.
    if (this.grado[rx] < this.grado[ry]) {
      [rx, ry] = [ry, rx];
    }

    // Establecer a la raíz de x como la nueva raíz de y.
    this.padre[ry] = rx;

    // Si el grado de la raíz de x es igual al grado de la raíz de y, aumenta el grado de x
    // (aumenta el límite superior de la altura del nodo x).
    if (this.grado[rx] === this.grado[ry]) {
      this.grado[rx] += 1;
    }

    // Los conjuntos del nodo x e y fueron unidos.
    return true;
  }
}

export { ConjuntoDisjunto };
