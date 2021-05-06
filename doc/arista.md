## Classes

<dl>
<dt><a href="#Arista">Arista</a></dt>
<dd><p>Representación de una arista.</p>
</dd>
</dl>

<a name="Arista"></a>

## Arista
Representación de una arista.

**Kind**: global class  

* [Arista](#Arista)
    * [new Arista(origen, destino, peso)](#new_Arista_new)
    * [.esPonderada](#Arista+esPonderada) ⇒ <code>boolean</code>

<a name="new_Arista_new"></a>

### new Arista(origen, destino, peso)

| Param | Type | Description |
| --- | --- | --- |
| origen | <code>number</code> | Nodo origen. |
| destino | <code>number</code> \| <code>Adyacente</code> | Nodo destino. |
| peso | <code>number</code> | Peso de la arista. Notar que si el nodo destino es de tipo `Adyacente`, el parámetro peso es ignorado. |

<a name="Arista+esPonderada"></a>

### arista.esPonderada ⇒ <code>boolean</code>
Comprueba si la arista es ponderada.

**Kind**: instance property of [<code>Arista</code>](#Arista)  
**Returns**: <code>boolean</code> - `true` si la arista es ponderada, `false` en caso
contrario.  
<a name="Direccion"></a>

## Direccion : <code>enum</code>
Representa la dirección de una arista.

**Kind**: global enum  
