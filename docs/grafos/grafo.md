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
<dt><a href="#CaminoMasCorto">CaminoMasCorto</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ArbolGeneradorMinimo">ArbolGeneradorMinimo</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Grafo"></a>

## Grafo
Representación de un grafo.

**Kind**: global class  

* [Grafo](#Grafo)
    * _instance_
        * [.matrizDeAdyacencia](#Grafo+matrizDeAdyacencia) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
        * [.listaDeAristas](#Grafo+listaDeAristas) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
        * [.nodos](#Grafo+nodos) ⇒ <code>Array.&lt;number&gt;</code>
        * [.cantidad](#Grafo+cantidad) ⇒ <code>number</code>
        * [.noEsDirigido](#Grafo+noEsDirigido) ⇒ <code>boolean</code>
        * [.esConexo](#Grafo+esConexo) ⇒ <code>boolean</code>
        * [.noEsConexo](#Grafo+noEsConexo) ⇒ <code>boolean</code>
        * [.esPonderado](#Grafo+esPonderado) ⇒ <code>boolean</code>
        * [.noEsPonderado](#Grafo+noEsPonderado) ⇒ <code>boolean</code>
        * [.matrizDeCaminos](#Grafo+matrizDeCaminos) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
        * [.arbolGeneradorMinimo](#Grafo+arbolGeneradorMinimo) ⇒ [<code>ArbolGeneradorMinimo</code>](#ArbolGeneradorMinimo)
        * [.adyacentes(nodo)](#Grafo+adyacentes) ⇒ <code>Array.&lt;number&gt;</code>
        * [.flujoMaximo(entrada, salida)](#Grafo+flujoMaximo) ⇒ <code>number</code>
    * _static_
        * [.desdeListaDeAdyacencia(listaDeAdyacencia, esDirigido)](#Grafo.desdeListaDeAdyacencia) ⇒ [<code>Grafo</code>](#Grafo)
        * [.desdeMatrizDeAdyacencia(matrizDeAdyacencia, esDirigido)](#Grafo.desdeMatrizDeAdyacencia) ⇒ [<code>Grafo</code>](#Grafo)
        * [.desdeListaDeAristas(listaDeAristas, esDirigido)](#Grafo.desdeListaDeAristas) ⇒ [<code>Grafo</code>](#Grafo)

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
<a name="Grafo+noEsDirigido"></a>

### grafo.noEsDirigido ⇒ <code>boolean</code>
Comprueba si el grafo no es dirigido.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>boolean</code> - `true` si el grafo no es dirigido, `false` en caso contrario.  
<a name="Grafo+esConexo"></a>

### grafo.esConexo ⇒ <code>boolean</code>
Comprueba si el grafo es conexo.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>boolean</code> - `true` si el grafo es conexo, `false` en caso contrario.

Un grafo es conexo si su matriz de caminos no contiene ningún 0.  
<a name="Grafo+noEsConexo"></a>

### grafo.noEsConexo ⇒ <code>boolean</code>
Comprueba si el grafo es conexo.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>boolean</code> - `true` si el grafo es conexo, `false` en caso contrario.

Un grafo no es conexo si su matriz de caminos contiene al menos un 0.  
<a name="Grafo+esPonderado"></a>

### grafo.esPonderado ⇒ <code>boolean</code>
Comprueba si el grafo es ponderado.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>boolean</code> - `true` si el grafo es ponderado, `false` en caso contrario.  
<a name="Grafo+noEsPonderado"></a>

### grafo.noEsPonderado ⇒ <code>boolean</code>
Comprueba si el grafo no es ponderado.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>boolean</code> - `true` si el grafo no es ponderado, `false` en caso contrario.  
<a name="Grafo+matrizDeCaminos"></a>

### grafo.matrizDeCaminos ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Obtiene la matriz de caminos asociada al grafo.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;Array.&lt;number&gt;&gt;</code> - Matriz de caminos.

El cálculo de la matriz de caminos está definido como la sumatoria de `A^i`,
desde `i = 0`, hasta `i = n - 1`, donde `A` es la matriz de adyacencia del grafo,
y n es la cantidad de nodos del mismo grafo.
Desde `i = 2`, el resultado de `A^(i - 1)` se recuerda, para calcular el
próximo término `A^i` como `A^(i - 1) * A`.  
<a name="Grafo+arbolGeneradorMinimo"></a>

### grafo.arbolGeneradorMinimo ⇒ [<code>ArbolGeneradorMinimo</code>](#ArbolGeneradorMinimo)
Construye un árbol generador mínimo del grafo.

**Kind**: instance property of [<code>Grafo</code>](#Grafo)  
**Returns**: [<code>ArbolGeneradorMinimo</code>](#ArbolGeneradorMinimo) - Árbol generador mínimo del grafo.

Implementación del algoritmo de Kruskal, utilizando la estructura de conjuntos disjuntos.  
<a name="Grafo+adyacentes"></a>

### grafo.adyacentes(nodo) ⇒ <code>Array.&lt;number&gt;</code>
Obtiene los nodos adyacentes a un nodo.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>Array.&lt;number&gt;</code> - Adyacentes al nodo.  

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

grafo.adyacentes(0);
// Valor esperado: [new Adyacente(1, 2), new Adyacente(2, 6), new Adyacente(2, 4)]
```
<a name="Grafo+flujoMaximo"></a>

### grafo.flujoMaximo(entrada, salida) ⇒ <code>number</code>
Calcula el flujo máximo desde el nodo entrada hasta el nodo salida.

**Kind**: instance method of [<code>Grafo</code>](#Grafo)  
**Returns**: <code>number</code> - Flujo máximo desde el nodo entrada hasta el nodo salida.

Implementación del algoritmo de Edmonds-Karp.  

| Param | Type | Description |
| --- | --- | --- |
| entrada | <code>number</code> | Nodo entrada. |
| salida | <code>number</code> | Nodo salida. |

<a name="Grafo.desdeListaDeAdyacencia"></a>

### Grafo.desdeListaDeAdyacencia(listaDeAdyacencia, esDirigido) ⇒ [<code>Grafo</code>](#Grafo)
Construye un grafo a partir de una lista de adyacencia.

**Kind**: static method of [<code>Grafo</code>](#Grafo)  
**Returns**: [<code>Grafo</code>](#Grafo) - Grafo.

La implementación interna de `Grafo` es una lista de adyacencia,
por lo que éste constructor redirige al constructor principal.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| listaDeAdyacencia | <code>Map.&lt;number, Array.&lt;number&gt;&gt;</code> |  | Lista de adyacencia. |
| esDirigido | <code>boolean</code> | <code>false</code> | `true` si el grafo de la matriz de adyacencia es dirigido, `false` en caso contrario. |

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
const grafo = Grafo.desdeMatrizDeAdyacencia(matrizDeAdyacencia, esDirigido);
```
<a name="Grafo.desdeListaDeAristas"></a>

### Grafo.desdeListaDeAristas(listaDeAristas, esDirigido) ⇒ [<code>Grafo</code>](#Grafo)
Construye un grafo a partir de una lista de aristas.

**Kind**: static method of [<code>Grafo</code>](#Grafo)  
**Returns**: [<code>Grafo</code>](#Grafo) - Grafo.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| listaDeAristas | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  | Lista de aristas. |
| esDirigido | <code>boolean</code> | <code>false</code> | `true` si el grafo de la matriz de adyacencia es dirigido, `false` en caso contrario. |

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

<a name="CaminoMasCorto"></a>

## CaminoMasCorto : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| camino | <code>Array.&lt;number&gt;</code> | Camino más corto entre el nodo origen y el nodo destino. |
| distancia | <code>number</code> | Distancia total del camino más corto. |

<a name="ArbolGeneradorMinimo"></a>

## ArbolGeneradorMinimo : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| arbol | <code>Array.&lt;Arista&gt;</code> | Lista de aristas del árbol generador mínimo. |
| distancia | <code>number</code> | Distancia total del árbol generador mínimo. |

