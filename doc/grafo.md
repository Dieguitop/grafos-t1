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
<dt><a href="#ExisteArista">ExisteArista</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#CaminoMasCorto">CaminoMasCorto</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ArbolGeneradorMinimo">ArbolGeneradorMinimo</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#TrayectoEuleriano">TrayectoEuleriano</a> : <code>Object</code></dt>
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
        * [.esEuleriano](#Grafo+esEuleriano) ⇒ [<code>TrayectoEuleriano</code>](#TrayectoEuleriano)
        * [.caminoEuleriano](#Grafo+caminoEuleriano) ⇒ <code>Array.&lt;number&gt;</code> \| <code>boolean</code>
        * [.existeArista(origen, destino)](#Grafo+existeArista) ⇒ [<code>ExisteArista</code>](#ExisteArista)
        * [.arista(origen, destino)](#Grafo+arista) ⇒ <code>Arista</code> \| <code>boolean</code>
        * [.eliminarArista(origen, destino)](#Grafo+eliminarArista) ⇒ <code>boolean</code>
        * [.adyacentesExplicitos(nodo)](#Grafo+adyacentesExplicitos) ⇒ <code>Array.&lt;Adyacente&gt;</code>
        * [.adyacentesDeSalida(nodo)](#Grafo+adyacentesDeSalida) ⇒ <code>Array.&lt;Adyacente&gt;</code>
        * [.adyacentesDeEntrada(nodo)](#Grafo+adyacentesDeEntrada) ⇒ <code>Array.&lt;Adyacente&gt;</code>
        * [.adyacentes(nodo)](#Grafo+adyacentes) ⇒ <code>Array.&lt;Adyacente&gt;</code>
        * [.gradoDeSalida(nodo)](#Grafo+gradoDeSalida) ⇒ <code>number</code>
        * [.gradoDeEntrada(nodo)](#Grafo+gradoDeEntrada) ⇒ <code>number</code>
        * [.grado(nodo)](#Grafo+grado) ⇒ <code>number</code>
    * _static_
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

### grafo.esEuleriano ⇒ [<code>TrayectoEuleriano</code>](#TrayectoEuleriano)
Determina si el grafo contiene un camino o un ciclo euleriano.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: [<code>TrayectoEuleriano</code>](#TrayectoEuleriano) - Tipo de trayecto (camino, ciclo, o ninguno) y
nodo que origina el trayecto.

Condiciones que el grafo debe cumplir para que contenga un camino o un
ciclo euleriano:
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
│          │                         │ GE - GS = 1,                      │
│          │                         │ Y, el resto de nodos cumplen que: │
│          │                         │ GE = GS.                          │
└──────────┴─────────────────────────┴───────────────────────────────────┘
(1): si existen dichos 2 nodos, éstos serían el inicio y el final del
camino euleriano.  
<a name="Grafo+caminoEuleriano"></a>

### grafo.caminoEuleriano ⇒ <code>Array.&lt;number&gt;</code> \| <code>boolean</code>
Obtiene el camino o el ciclo euleriano, si el grafo contiene uno.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;number&gt;</code> \| <code>boolean</code> - Camino o ciclo euleriano, si el grafo contiene
alguno, `false` en caso contrario.

Implementación del algoritmo de Hierholzer.  
<a name="Grafo+existeArista"></a>

### grafo.existeArista(origen, destino) ⇒ [<code>ExisteArista</code>](#ExisteArista)
Comprueba si existe una arista entre el nodo origen y el nodo destino.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: [<code>ExisteArista</code>](#ExisteArista) - Condición de existencia de la arista y su
dirección.  
**Todo**

- [ ] Aristas no dirigidas vs doble aristas de salida y de entrada
(multigrafo). Ver también método `arista`.


| Param | Type | Description |
| --- | --- | --- |
| origen | <code>number</code> | Nodo origen. |
| destino | <code>number</code> | Nodo destino. |

<a name="Grafo+arista"></a>

### grafo.arista(origen, destino) ⇒ <code>Arista</code> \| <code>boolean</code>
Comprueba si existe una arista entre el nodo origen y el nodo destino.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Arista</code> \| <code>boolean</code> - Arista, si existe; `false`, en caso contrario.  
**Todo**

- [ ] Aristas no dirigidas vs doble aristas de salida y de entrada
(multigrafo). Ver también método `existeArista`.


| Param | Type | Description |
| --- | --- | --- |
| origen | <code>number</code> | Nodo origen. |
| destino | <code>number</code> | Nodo destino. |

<a name="Grafo+eliminarArista"></a>

### grafo.eliminarArista(origen, destino) ⇒ <code>boolean</code>
Elimina la arista, si existe, entre el nodo origen y el nodo destino.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>boolean</code> - `true` si la arista existía, y fue eliminada; `false`,
en caso contrario.  

| Param | Type | Description |
| --- | --- | --- |
| origen | <code>number</code> | Nodo origen. |
| destino | <code>number</code> | Nodo destino. |

<a name="Grafo+adyacentesExplicitos"></a>

### grafo.adyacentesExplicitos(nodo) ⇒ <code>Array.&lt;Adyacente&gt;</code>
Obtiene los nodos adyacentes que interna y explícitamente están asociados
al nodo origen.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;Adyacente&gt;</code> - Lista de adyacentes de salida.

Debido al funcionamiento de las listas de adyacencia, un nodo de un grafo
no dirigido tiene nodos adyacentes que no están explícitamente asociados en
dicha lista de adyacencia.  

| Param | Type | Description |
| --- | --- | --- |
| nodo | <code>number</code> | Nodo origen. |

<a name="Grafo+adyacentesDeSalida"></a>

### grafo.adyacentesDeSalida(nodo) ⇒ <code>Array.&lt;Adyacente&gt;</code>
Obtiene los nodos adyacentes de salida del nodo.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;Adyacente&gt;</code> - Lista de adyacentes de salida.

Los nodos adyacentes de salida son aquellos que reciben alguna conexión del
nodo origen. En el caso de los grafos no dirigidos, los nodos adyacentes de
salida son los mismos de entrada.  

| Param | Type | Description |
| --- | --- | --- |
| nodo | <code>number</code> | Nodo origen. |

<a name="Grafo+adyacentesDeEntrada"></a>

### grafo.adyacentesDeEntrada(nodo) ⇒ <code>Array.&lt;Adyacente&gt;</code>
Obtiene los nodos adyacentes de salida del nodo.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;Adyacente&gt;</code> - Lista de adyacentes de salida.

Los nodos adyacentes de entrada son aquellos que entregan alguna conexión
al nodo origen.  

| Param | Type | Description |
| --- | --- | --- |
| nodo | <code>number</code> | Nodo origen. |

<a name="Grafo+adyacentes"></a>

### grafo.adyacentes(nodo) ⇒ <code>Array.&lt;Adyacente&gt;</code>
Obtiene los nodos adyacentes a un nodo.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;Adyacente&gt;</code> - Adyacentes al nodo.  

| Param | Type | Description |
| --- | --- | --- |
| nodo | <code>number</code> | Nodo. |

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

console.log(grafo.adyacentes(0));
// Valor esperado: [
//   new Adyacente(1, 2), new Adyacente(2, 6), new Adyacente(2, 4)
// ]
```
<a name="Grafo+gradoDeSalida"></a>

### grafo.gradoDeSalida(nodo) ⇒ <code>number</code>
Calcula el grado de salida de un nodo.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>number</code> - Grado de salida del nodo.  
**Todo**

- [ ] Considerar caso de aristas bucle.


| Param | Type | Description |
| --- | --- | --- |
| nodo | <code>number</code> | Nodo. |

<a name="Grafo+gradoDeEntrada"></a>

### grafo.gradoDeEntrada(nodo) ⇒ <code>number</code>
Calcula el grado de entrada de un nodo.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>number</code> - Grado de entrada del nodo.  
**Todo**

- [ ] Considerar caso de aristas bucle.


| Param | Type | Description |
| --- | --- | --- |
| nodo | <code>number</code> | Nodo. |

<a name="Grafo+grado"></a>

### grafo.grado(nodo) ⇒ <code>number</code>
Calcula el grado de un nodo.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>number</code> - Grado del nodo.  
**Todo**

- [ ] Considerar caso de aristas bucle.


| Param | Type | Description |
| --- | --- | --- |
| nodo | <code>number</code> | Nodo. |

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
const grafo = Grafo.desdeMatrizDeAdyacencia(matrizDeAdyacencia, esDirigido);
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
const grafo = Grafo.desdelistaDeAristas(listaDeAristas, esDirigido);
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
Representa la conexión entre dos nodos i y j en la celda (i, j) de la matriz
de adyacencia.

**Kind**: global enum  
<a name="Trayecto"></a>

## Trayecto : <code>enum</code>
Representa los tipos de trayecto en un grafo.

**Kind**: global enum  
<a name="ExisteArista"></a>

## ExisteArista : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| existe | <code>boolean</code> | `true` si la arista existe entre un nodo   origen y un nodo destino. |
| direccion | <code>number</code> | Dirección de la arista, desde el nodo   origen. |

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

<a name="TrayectoEuleriano"></a>

## TrayectoEuleriano : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tipo | [<code>Trayecto</code>](#Trayecto) | Tipo de trayecto (camino, ciclo, o ninguno). |
| origen | <code>number</code> | Nodo que origina el trayecto. |

