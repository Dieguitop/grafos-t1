<a name="ConjuntoDisjunto"></a>

## ConjuntoDisjunto
Representación de un conjunto disjunto.

**Kind**: global class  

* [ConjuntoDisjunto](#ConjuntoDisjunto)
    * [.crear(x)](#ConjuntoDisjunto+crear) ⇒ <code>void</code>
    * [.buscar(x)](#ConjuntoDisjunto+buscar) ⇒ <code>any</code>
    * [.unir(x, y)](#ConjuntoDisjunto+unir) ⇒ <code>boolean</code>

<a name="ConjuntoDisjunto+crear"></a>

### conjuntoDisjunto.crear(x) ⇒ <code>void</code>
Crea un nuevo conjunto, donde el nodo x es el único nodo del conjunto.

**Kind**: instance method of [<code>ConjuntoDisjunto</code>](#ConjuntoDisjunto)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>any</code> | Nodo a agregar. |

<a name="ConjuntoDisjunto+buscar"></a>

### conjuntoDisjunto.buscar(x) ⇒ <code>any</code>
Busca el nodo raíz que representa al conjunto que contiene al nodo x.

**Kind**: instance method of [<code>ConjuntoDisjunto</code>](#ConjuntoDisjunto)  
**Returns**: <code>any</code> - Raíz que representa al conjunto que contiene al nodo x.

Implementación del algoritmo de división de camino, de una pasada.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>any</code> | Nodo cuya raíz representativa es buscada. |

<a name="ConjuntoDisjunto+unir"></a>

### conjuntoDisjunto.unir(x, y) ⇒ <code>boolean</code>
Une los conjuntos de los elementos x e y en un sólo conjunto.

**Kind**: instance method of [<code>ConjuntoDisjunto</code>](#ConjuntoDisjunto)  
**Returns**: <code>boolean</code> - `true` si los conjuntos fueron unidos, `false` en caso contrario.

Implementación del algoritmo de unión por grado (rank).  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>any</code> | Nodo cuyo conjunto se une con el conjunto del nodo y. |
| y | <code>any</code> | Nodo cuyo conjunto se une con el conjunto del nodo x. |

