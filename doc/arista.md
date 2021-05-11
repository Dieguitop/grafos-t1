## Classes

<dl>
<dt><a href="#Arista">Arista</a></dt>
<dd><p>Representación de una arista.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Link">Link</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Arista"></a>

## Arista
Representación de una arista.

**Kind**: global class  

* [Arista](#Arista)
    * [new Arista(origen, destino, peso)](#new_Arista_new)
    * _instance_
        * [.esPonderada](#Arista+esPonderada) ⇒ <code>boolean</code>
    * _static_
        * [.desdeLink(link)](#Arista.desdeLink)

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
<a name="Arista.desdeLink"></a>

### Arista.desdeLink(link)
Construye una lista a partir de un link.

**Kind**: static method of [<code>Arista</code>](#Arista)  

| Param | Type | Description |
| --- | --- | --- |
| link | [<code>Link</code>](#Link) | Link. |

<a name="Direccion"></a>

## Direccion : <code>enum</code>
Representa la dirección de una arista.

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

