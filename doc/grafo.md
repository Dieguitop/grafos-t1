## Classes

<dl>
<dt><a href="#Grafo">Grafo</a></dt>
<dd><p>Representación de un grafo.</p>
</dd>
</dl>

## Objects

<dl>
<dt><a href="#caminoMasCorto">caminoMasCorto</a> ⇒ <code><a href="#CaminoMasCorto">CaminoMasCorto</a></code></dt>
<dd><p>Obtiene el camino más corto entre dos nodos.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Link">Link</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#CaminoMasCorto">CaminoMasCorto</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ArbolGeneradorMinimo">ArbolGeneradorMinimo</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#InfoTrayecto">InfoTrayecto</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#CaminoDeAumento">CaminoDeAumento</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Grafo"></a>

## Grafo
Representación de un grafo.

**Kind**: global class  

* [Grafo](#Grafo)
    * [new Grafo(listaDeAdyacencia, [esDirigido])](#new_Grafo_new)
    * _instance_
        * [.matrizDeAdyacencia](#Grafo+matrizDeAdyacencia) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
        * [.listaDeAristas](#Grafo+listaDeAristas) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
        * [.nodos](#Grafo+nodos) ⇒ <code>Array.&lt;number&gt;</code>
        * [.cantidad](#Grafo+cantidad) ⇒ <code>number</code>
        * [.esConexo](#Grafo+esConexo) ⇒ <code>boolean</code>
        * [.esPonderado](#Grafo+esPonderado) ⇒ <code>boolean</code>
        * [.matrizDeCaminos](#Grafo+matrizDeCaminos) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
        * [.arbolGeneradorMinimo](#Grafo+arbolGeneradorMinimo) ⇒ [<code>ArbolGeneradorMinimo</code>](#ArbolGeneradorMinimo)
        * [.esEuleriano](#Grafo+esEuleriano) ⇒ [<code>InfoTrayecto</code>](#InfoTrayecto) \| <code>boolean</code>
        * [.esHamiltoniano](#Grafo+esHamiltoniano) ⇒ [<code>InfoTrayecto</code>](#InfoTrayecto) \| <code>boolean</code>
        * [.existeArista(origen, destino, [direccion])](#Grafo+existeArista) ⇒ <code>boolean</code>
        * [.arista(origen, destino, [direccion])](#Grafo+arista) ⇒ <code>Arista</code> \| <code>boolean</code>
        * [.eliminarArista(origen, destino, [direccion])](#Grafo+eliminarArista) ⇒ <code>Array.&lt;Adyacente&gt;</code> \| <code>boolean</code>
        * [.adyacentes(nodo, [direccion])](#Grafo+adyacentes) ⇒ <code>Array.&lt;Adyacente&gt;</code>
        * [.grado(nodo, direccion)](#Grafo+grado) ⇒ <code>number</code>
        * [.euleriano(tipo)](#Grafo+euleriano) ⇒ <code>Array.&lt;number&gt;</code> \| <code>boolean</code>
        * [.hamiltoniano(tipo)](#Grafo+hamiltoniano) ⇒ <code>Array.&lt;number&gt;</code> \| <code>boolean</code>
        * [.flujoMaximo(entrada, salida)](#Grafo+flujoMaximo) ⇒ <code>number</code>
    * _static_
        * [.desdeListaDeLinks(listaDeLinks, [esDirigido])](#Grafo.desdeListaDeLinks)
        * [.desdeListaDeAdyacencia(listaDeAdyacencia, [esDirigido])](#Grafo.desdeListaDeAdyacencia) ⇒ [<code>Grafo</code>](#Grafo)
        * [.desdeMatrizDeAdyacencia(matrizDeAdyacencia, esDirigido)](#Grafo.desdeMatrizDeAdyacencia) ⇒ [<code>Grafo</code>](#Grafo)
        * [.desdeListaDeAristas(listaDeAristas, [esDirigido])](#Grafo.desdeListaDeAristas) ⇒ [<code>Grafo</code>](#Grafo)

<a name="new_Grafo_new"></a>

### new Grafo(listaDeAdyacencia, [esDirigido])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| listaDeAdyacencia | <code>Map.&lt;number, Array.&lt;number&gt;&gt;</code> |  | Lista de adyacencia. |
| [esDirigido] | <code>boolean</code> | <code>false</code> | `true` si el grafo de la matriz de adyacencia es dirigido, `false` en caso contrario. |

**Example**  
```js
// Grafo: 0 --(2)--> 1, 0 <--(4)--.--(6)--> 2, 1 --(3)--> 2.
const listaDeAdyacencia = [
  [0, [new Adyacente(1, 2), new Adyacente(2, 6)]],
  [1, [new Adyacente(2, 3)]],
  [2, [new Adyacente(0, 4)]]
];

// La lista de adyacencia contiene aristas dirigidas.
const esDirigido = true;
const grafo = new Grafo(listaDeAdyacencia, esDirigido);
```
<a name="Grafo+matrizDeAdyacencia"></a>

### grafo.matrizDeAdyacencia ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Obtiene la matriz de adyacencia asociada al grafo.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;Array.&lt;number&gt;&gt;</code> - Matriz de adyacencia.  
<a name="Grafo+listaDeAristas"></a>

### grafo.listaDeAristas ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Obtiene la lista de aristas asociada al grafo.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;Array.&lt;number&gt;&gt;</code> - Lista de aristas.  
<a name="Grafo+nodos"></a>

### grafo.nodos ⇒ <code>Array.&lt;number&gt;</code>
Obtiene la lista con todos los nodos del grafo.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;number&gt;</code> - Lista de nodos.  
<a name="Grafo+cantidad"></a>

### grafo.cantidad ⇒ <code>number</code>
Calcula la cantidad de nodos del grafo.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>number</code> - Cantidad de nodos.  
<a name="Grafo+esConexo"></a>

### grafo.esConexo ⇒ <code>boolean</code>
Comprueba si el grafo es conexo.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>boolean</code> - `true` si el grafo es conexo, `false` en caso contrario.  
<a name="Grafo+esPonderado"></a>

### grafo.esPonderado ⇒ <code>boolean</code>
Comprueba si el grafo es ponderado.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>boolean</code> - `true` si el grafo es ponderado, `false` en caso
contrario.  
<a name="Grafo+matrizDeCaminos"></a>

### grafo.matrizDeCaminos ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Obtiene la matriz de caminos asociada al grafo.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;Array.&lt;number&gt;&gt;</code> - Matriz de caminos.

El cálculo de la matriz de caminos está definido como la sumatoria de
`A^i`, desde `i = 0`, hasta `i = n - 1`, donde `A` es la matriz de
adyacencia del grafo, y n es la cantidad de nodos del mismo grafo. Desde `i
= 2`, el resultado de `A^(i - 1)` se recuerda, para calcular el próximo
término `A^i` como `A^(i - 1) * A`.  
<a name="Grafo+arbolGeneradorMinimo"></a>

### grafo.arbolGeneradorMinimo ⇒ [<code>ArbolGeneradorMinimo</code>](#ArbolGeneradorMinimo)
Construye un árbol generador mínimo del grafo.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: [<code>ArbolGeneradorMinimo</code>](#ArbolGeneradorMinimo) - Árbol generador mínimo del grafo.

Implementación del algoritmo de Kruskal, utilizando la estructura de
conjuntos disjuntos.  
<a name="Grafo+esEuleriano"></a>

### grafo.esEuleriano ⇒ [<code>InfoTrayecto</code>](#InfoTrayecto) \| <code>boolean</code>
Determina si el grafo contiene un camino o un ciclo euleriano.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: [<code>InfoTrayecto</code>](#InfoTrayecto) \| <code>boolean</code> - Tipo de trayecto (camino o ciclo) y nodo
que origina el trayecto, si existe; `false`, en caso contrario.

Condiciones que el grafo debe cumplir para que contenga un camino o un
ciclo euleriano, donde GE es el grado de entrada de un nodo, y GS el grado
de salida:
           ┌─────────────────────────┬───────────────────────────────────┐
           │     Ciclo euleriano     │          Camino euleriano         │
┌──────────┼─────────────────────────┼───────────────────────────────────┤
│ No       │ Todos los nodos tienen  │ Todos los nodos tienen grado par, │
│ dirigido │ grado par.              │ o exactamente 2 nodos tienen      │
│          │                         │ grado impar. (1)                  │
├──────────┼─────────────────────────┼───────────────────────────────────┤
│ Dirigido │ Todos los nodos cumplen │ A lo más 1 nodo cumple que:       │
│          │ que GE = GS.            │ GS - GE = 1,                      │
│          │                         │ Y, a lo más 1 nodo cumple que:    │
│          │                         │ GE - GS = 1 (o GS - GE = -1)      │
│          │                         │ Y, el resto de nodos cumplen que: │
│          │                         │ GE = GS.                          │
└──────────┴─────────────────────────┴───────────────────────────────────┘
(1): si existen dichos 2 nodos, éstos serían el inicio y el final del
camino euleriano.  
<a name="Grafo+esHamiltoniano"></a>

### grafo.esHamiltoniano ⇒ [<code>InfoTrayecto</code>](#InfoTrayecto) \| <code>boolean</code>
Determina si el grafo contiene un camino o un ciclo hamiltoniano.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: [<code>InfoTrayecto</code>](#InfoTrayecto) \| <code>boolean</code> - Tipo de trayecto (camino o ciclo) y
nodo que origina el trayecto, si existe; `false`, en caso contrario.

A diferencia de los trayectos eulerianos, no existen condiciones
suficientes que cumplan los grafos para determinar que exista un trayecto
hamiltoniano. Esto se debe a que, tanto el problema de comprobar la
existencia de un trayecto hamiltoniano, como el de encontrar dichos
trayectos, son problemas NP-completos, y sus soluciones son polinómicas (y
no muy eficientes).  
<a name="Grafo+existeArista"></a>

### grafo.existeArista(origen, destino, [direccion]) ⇒ <code>boolean</code>
Comprueba si existe una arista entre el nodo origen y el nodo destino.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>boolean</code> - `true` si la arista entre el nodo origen y el nodo
destino existe, `false` en caso contrario.  
**Todo**

- [ ] Aristas no dirigidas vs doble aristas de salida y de entrada
(multigrafo). Ver también método `arista`.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| origen | <code>number</code> |  | Nodo origen. |
| destino | <code>number</code> |  | Nodo destino. |
| [direccion] | <code>Direccion</code> | <code>Direccion.salida</code> | Dirección de la arista buscada. |

<a name="Grafo+arista"></a>

### grafo.arista(origen, destino, [direccion]) ⇒ <code>Arista</code> \| <code>boolean</code>
Comprueba si existe una arista entre el nodo origen y el nodo destino.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Arista</code> \| <code>boolean</code> - Arista, si existe; `false`, en caso contrario.  
**Todo**

- [ ] Aristas no dirigidas vs doble aristas de salida y de entrada
(multigrafo). Ver también método `existeArista`.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| origen | <code>number</code> |  | Nodo origen. |
| destino | <code>number</code> |  | Nodo destino. |
| [direccion] | <code>Direccion</code> | <code>Direccion.salida</code> | Dirección de la arista buscada. |

<a name="Grafo+eliminarArista"></a>

### grafo.eliminarArista(origen, destino, [direccion]) ⇒ <code>Array.&lt;Adyacente&gt;</code> \| <code>boolean</code>
Elimina la arista, si existe, entre el nodo origen y el nodo destino.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;Adyacente&gt;</code> \| <code>boolean</code> - Si la arista existía, adyacentes explícitos
del nodo origen; `false`, en caso contrario.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| origen | <code>number</code> |  | Nodo origen. |
| destino | <code>number</code> |  | Nodo destino. |
| [direccion] | <code>Direccion</code> | <code>Direccion.salida</code> | Dirección de la arista buscada. |

<a name="Grafo+adyacentes"></a>

### grafo.adyacentes(nodo, [direccion]) ⇒ <code>Array.&lt;Adyacente&gt;</code>
Obtiene los nodos adyacentes (de salida o entrada) a un nodo.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;Adyacente&gt;</code> - Adyacentes al nodo.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| nodo | <code>number</code> |  | Nodo. |
| [direccion] | <code>Direccion</code> | <code>Direccion.salida</code> | Dirección de los nodos adyacentes al nodo. |

**Example**  
```js
// Grafo: 0 --(2)--> 1, 0 <--(4)--.--(6)--> 2, 1 --(3)--> 2.
const listaDeAdyacencia = [
  [0, [new Adyacente(1, 2), new Adyacente(2, 6)]],
  [1, [new Adyacente(2, 3)]],
  [2, [new Adyacente(0, 4)]]
];

// La lista de adyacencia contiene aristas dirigidas.
const esDirigido = true;
const grafo = new Grafo(listaDeAdyacencia, esDirigido);

console.log(grafo.adyacentes(0, Direccion.entrada));
// Valor esperado:
// [new Adyacente(2, 4)]
```
<a name="Grafo+grado"></a>

### grafo.grado(nodo, direccion) ⇒ <code>number</code>
Calcula el grado de un nodo.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>number</code> - Grado del nodo.  
**Todo**

- [ ] Considerar caso de aristas bucle.


| Param | Type | Description |
| --- | --- | --- |
| nodo | <code>number</code> | Nodo. |
| direccion | <code>Direccion</code> | Dirección de los nodos adyacentes considerados en el grado. |

<a name="Grafo+euleriano"></a>

### grafo.euleriano(tipo) ⇒ <code>Array.&lt;number&gt;</code> \| <code>boolean</code>
Obtiene el camino o el ciclo euleriano, si el grafo contiene alguno.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;number&gt;</code> \| <code>boolean</code> - Camino o ciclo euleriano, si el grafo contiene
alguno, `false` en caso contrario.

Implementación del algoritmo de Hierholzer.  

| Param | Type | Description |
| --- | --- | --- |
| tipo | [<code>Trayecto</code>](#Trayecto) | Tipo de trayecto euleriano. |

<a name="Grafo+hamiltoniano"></a>

### grafo.hamiltoniano(tipo) ⇒ <code>Array.&lt;number&gt;</code> \| <code>boolean</code>
Obtiene el camino o el ciclo hamiltoniano, si el grafo contiene alguno.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;number&gt;</code> \| <code>boolean</code> - Camino o ciclo hamiltoniano, si el grafo
contiene alguno, `false` en caso contrario.

Encontrar cualquier trayecto hamiltoniano en un grafo es un problema
NP-completo y, por lo tanto, sus soluciones no son muy eficientes. La
implementación, en este caso, se realiza generando una permutación de la
lista de nodos por iteración, y retornando la primera permutación que sea
un trayecto hamiltoniano válido. En el peor de los casos, la complejidad
temporal de ésta implementación es O(n * n!).  

| Param | Type | Description |
| --- | --- | --- |
| tipo | [<code>Trayecto</code>](#Trayecto) | Tipo de trayecto hamiltoniano. |

<a name="Grafo+flujoMaximo"></a>

### grafo.flujoMaximo(entrada, salida) ⇒ <code>number</code>
Calcula el flujo máximo desde el nodo entrada hasta el nodo salida.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>number</code> - Flujo máximo desde el nodo entrada hasta el nodo salida.

Implementación del algoritmo de Edmonds-Karp, que a su vez es una
implementación del algoritmo de Ford-Fulkerson, utilizando búsqueda en
anchura (breadth-first search, BFS).  

| Param | Type | Description |
| --- | --- | --- |
| entrada | <code>number</code> | Nodo entrada. |
| salida | <code>number</code> | Nodo salida. |

<a name="Grafo.desdeListaDeLinks"></a>

### Grafo.desdeListaDeLinks(listaDeLinks, [esDirigido])
Construye un grafo a partir de una lista de links.

**Kind**: static method of [<code>Grafo</code>](#Grafo)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| listaDeLinks | [<code>Array.&lt;Link&gt;</code>](#Link) |  | Lista de links. |
| [esDirigido] | <code>boolean</code> | <code>false</code> | `true` si el grafo de la lista de links es dirigido, `false` en caso contrario. |

**Example**  
```js
// Grafo: 0 --(1)--> 1, 0 --(4)--> 2, 0 --(7)--> 3, 1 --(9)--> 2.
const listaDeLinks = [
  { from: "0", to: "1", text: "1" },
  { from: "0", to: "2", text: "4" },
  { from: "0", to: "3", text: "7" },
  { from: "1", to: "2", text: "9" },
];

// La lista de links no contiene aristas dirigidas.
const esDirigido = false;
const grafo = Grafo.desdeListaDeLinks(listaDeLinks, esDirigido);
```
<a name="Grafo.desdeListaDeAdyacencia"></a>

### Grafo.desdeListaDeAdyacencia(listaDeAdyacencia, [esDirigido]) ⇒ [<code>Grafo</code>](#Grafo)
Construye un grafo a partir de una lista de adyacencia.

**Kind**: static method of [<code>Grafo</code>](#Grafo)  
**Returns**: [<code>Grafo</code>](#Grafo) - Grafo.

La implementación interna de `Grafo` es una lista de adyacencia, por lo que
éste constructor redirige al constructor principal.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| listaDeAdyacencia | <code>Map.&lt;number, Array.&lt;number&gt;&gt;</code> |  | Lista de adyacencia. |
| [esDirigido] | <code>boolean</code> | <code>false</code> | `true` si el grafo de la matriz de adyacencia es dirigido, `false` en caso contrario. |

**Example**  
```js
// Grafo: 0 --(2)--> 1, 0 <--(4)--.--(6)--> 2, 1 --(3)--> 2.
const listaDeAdyacencia = [
  [0, [new Adyacente(1, 2), new Adyacente(2, 6)]],
  [1, [new Adyacente(2, 3)]],
  [2, [new Adyacente(0, 4)]]
];

// La lista de adyacencia contiene aristas dirigidas.
const esDirigido = true;
const grafo = Grafo.desdeListaDeAdyacencia(matrizDeAdyacencia, esDirigido);
```
<a name="Grafo.desdeMatrizDeAdyacencia"></a>

### Grafo.desdeMatrizDeAdyacencia(matrizDeAdyacencia, esDirigido) ⇒ [<code>Grafo</code>](#Grafo)
Construye un grafo a partir de una matriz de adyacencia.

**Kind**: static method of [<code>Grafo</code>](#Grafo)  
**Returns**: [<code>Grafo</code>](#Grafo) - Grafo.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| matrizDeAdyacencia | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  | Matriz de adyacencia. |
| esDirigido | <code>boolean</code> | <code>false</code> | `true` si el grafo de la matriz de adyacencia es dirigido, `false` en caso contrario. |

**Example**  
```js
// Grafo: 0 -> 1, 0 <-> 2, 1 -> 2.
const matrizDeAdyacencia = [
  [false, true, true],
  [false, false, true],
  [true, false, false]
];

// La matriz contiene aristas dirigidas.
const esDirigido = true;
const grafo = Grafo.desdeMatrizDeAdyacencia(
  matrizDeAdyacencia, esDirigido
);
```
<a name="Grafo.desdeListaDeAristas"></a>

### Grafo.desdeListaDeAristas(listaDeAristas, [esDirigido]) ⇒ [<code>Grafo</code>](#Grafo)
Construye un grafo a partir de una lista de aristas.

**Kind**: static method of [<code>Grafo</code>](#Grafo)  
**Returns**: [<code>Grafo</code>](#Grafo) - Grafo.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| listaDeAristas | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  | Lista de aristas. |
| [esDirigido] | <code>boolean</code> | <code>false</code> | `true` si el grafo de la matriz de adyacencia es dirigido, `false` en caso contrario. |

**Example**  
```js
// Grafo: 0 --(2)--> 1, 0 <--(4)--.--(6)--> 2, 1 --(3)--> 2.
const listaDeAristas = [
  new Arista(0, 1, 2),
  new Arista(0, 2, 6),
  new Arista(1, 2, 3),
  new Arista(2, 0, 4)
];

// La lista contiene aristas dirigidas.
const esDirigido = true;
const grafo = Grafo.desdeListaDeAristas(listaDeAristas, esDirigido);
```
<a name="caminoMasCorto"></a>

## caminoMasCorto ⇒ [<code>CaminoMasCorto</code>](#CaminoMasCorto)
Obtiene el camino más corto entre dos nodos.

**Kind**: global namespace  
**Returns**: [<code>CaminoMasCorto</code>](#CaminoMasCorto) - Camino más corto y distancia total.

Implementación del algoritmo de caminos mínimos de Dijkstra.  

| Param | Type | Description |
| --- | --- | --- |
| origen | <code>number</code> | Nodo origen. |
| destino | <code>number</code> | Nodo destino. |

<a name="caminoMasCorto.noVisitadoConMenorDistancia"></a>

### caminoMasCorto.noVisitadoConMenorDistancia(distancias, noVisitados) ⇒ <code>number</code>
Obtiene el nodo no visitado más cercano al nodo original.

**Kind**: static method of [<code>caminoMasCorto</code>](#caminoMasCorto)  
**Returns**: <code>number</code> - Nodo no visitado más cercano al nodo original.  

| Param | Type | Description |
| --- | --- | --- |
| distancias | <code>Map.&lt;number, number&gt;</code> | Distancias del nodo original a cada nodo del grafo. |
| noVisitados | <code>Map.&lt;number, number&gt;</code> | Nodos no visitados por el algoritmo. |

<a name="Celda"></a>

## Celda : <code>enum</code>
Representa la conexión entre dos nodos i y j en la celda {i, j} de la matriz
de adyacencia.

**Kind**: global enum  
<a name="Trayecto"></a>

## Trayecto : <code>enum</code>
Representa los tipos de trayecto en un grafo.

**Kind**: global enum  
<a name="Link"></a>

## Link : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | Origen de la arista. |
| to | <code>string</code> | Destino de la arista. |
| text | <code>string</code> | Peso de la arista. |

<a name="CaminoMasCorto"></a>

## CaminoMasCorto : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| camino | <code>Array.&lt;number&gt;</code> | Camino más corto entre el nodo origen y el   nodo destino. |
| distancia | <code>number</code> | Distancia total del camino más corto. |

<a name="ArbolGeneradorMinimo"></a>

## ArbolGeneradorMinimo : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| arbol | <code>Array.&lt;Arista&gt;</code> | Lista de aristas del árbol generador mínimo. |
| distancia | <code>number</code> | Distancia total del árbol generador   mínimo. |

<a name="InfoTrayecto"></a>

## InfoTrayecto : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tipo | [<code>Trayecto</code>](#Trayecto) | Tipo de trayecto (camino, ciclo, o ninguno). |
| origen | <code>number</code> | Nodo que origina el trayecto. |

<a name="CaminoDeAumento"></a>

## CaminoDeAumento : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| flujoCamino | <code>number</code> | Capacidad residual mínima del camino   de aumento. |
| padre | <code>Array.&lt;number&gt;</code> | Lista de padres de cada nodo, siguiendo el   camino de aumento. |

