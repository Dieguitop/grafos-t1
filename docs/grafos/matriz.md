## Functions

<dl>
<dt><a href="#contiene">contiene(matriz, valor)</a> ⇒ <code>boolean</code></dt>
<dd><p>Comprueba si una matriz contiene un valor determinado.</p>
</dd>
<dt><a href="#noContiene">noContiene(matriz, valor)</a> ⇒ <code>boolean</code></dt>
<dd><p>Comprueba si una matriz no contiene un valor determinado.</p>
</dd>
<dt><a href="#algun">algun(matriz, predicado)</a> ⇒ <code>boolean</code></dt>
<dd><p>Comprueba si en una matriz, al menos un elemento cumple con el predicado.</p>
</dd>
<dt><a href="#solo">solo(matriz, ...valores)</a> ⇒ <code>boolean</code></dt>
<dd><p>Comprueba si una matriz solo contiene los valores dados.</p>
</dd>
<dt><a href="#rellenar">rellenar(m, n, valor)</a></dt>
<dd><p>Crea una matriz rellenada con un valor específico.</p>
</dd>
</dl>

<a name="contiene"></a>

## contiene(matriz, valor) ⇒ <code>boolean</code>
Comprueba si una matriz contiene un valor determinado.

**Kind**: global function  
**Returns**: <code>boolean</code> - `true` si la matriz contiene el valor, `false` en caso contrario.  

| Param | Type | Description |
| --- | --- | --- |
| matriz | <code>Array.&lt;Array.&lt;any&gt;&gt;</code> | Matriz a examinar. |
| valor | <code>any</code> | Valor a buscar. |

<a name="noContiene"></a>

## noContiene(matriz, valor) ⇒ <code>boolean</code>
Comprueba si una matriz no contiene un valor determinado.

**Kind**: global function  
**Returns**: <code>boolean</code> - `true` si la matriz no contiene el valor, `false` en caso contrario.  

| Param | Type | Description |
| --- | --- | --- |
| matriz | <code>Array.&lt;Array.&lt;any&gt;&gt;</code> | Matriz a examinar. |
| valor | <code>any</code> | Valor a buscar. |

<a name="algun"></a>

## algun(matriz, predicado) ⇒ <code>boolean</code>
Comprueba si en una matriz, al menos un elemento cumple con el predicado.

**Kind**: global function  
**Returns**: <code>boolean</code> - `true` si al menos un elemento de la matriz cumple con el predicado,
`false` en caso contrario.  

| Param | Type | Description |
| --- | --- | --- |
| matriz | <code>Array.&lt;Array.&lt;any&gt;&gt;</code> | Matriz a examinar. |
| predicado | <code>function</code> | Callback con la condición que debe cumplir al menos un elemento. |

<a name="solo"></a>

## solo(matriz, ...valores) ⇒ <code>boolean</code>
Comprueba si una matriz solo contiene los valores dados.

**Kind**: global function  
**Returns**: <code>boolean</code> - `true` si la matriz solo contiene los valores dados, `false` en caso contrario.  

| Param | Type | Description |
| --- | --- | --- |
| matriz | <code>Array.&lt;Array.&lt;any&gt;&gt;</code> | Matriz a examinar. |
| ...valores | <code>any</code> | Valores a buscar. |

<a name="rellenar"></a>

## rellenar(m, n, valor)
Crea una matriz rellenada con un valor específico.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| m | <code>number</code> | Cantidad de filas de la matriz. |
| n | <code>number</code> | Cantidad de columnas de la matriz. |
| valor | <code>any</code> | Valor utilizado como relleno. |

