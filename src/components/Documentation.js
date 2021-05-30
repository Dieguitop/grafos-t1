import React from 'react';
import DocEx from '../assets/img/doc-ex.PNG';
import LinkEx from '../assets/img/link-ex.PNG';
import Graph from '../assets/img/graph.PNG';
import { Link } from 'react-router-dom';

const Documentation = () => {
    return (
        <div className='documentation_container'>
            <h2>Documentación de aplicación de grafos</h2>
            <p>A continuación encontrarás la documentación de nuestra aplicación de grafos además de una serie de recomendaciones para que
            tu experiencia dentro de la aplicación sea la más grata posible.
            </p>
            <h3>Recomendación inicial</h3>
            <ul>
                <p>Por motivos de la librería que utilizamos para el desarrollo y trabajo de nodos, estos
                deben trabajarse como si fuesen referenciados desde índice 0, independiente del nombre que
                posean. A continuación de mostrará un ejemplo de implementación:
                </p>
            </ul>
            <div className='documentation_ex'>
                <img src={DocEx} alt='Ejemplificación de nombre' />
                <p className='documentation_info'>Dada la imagen anterior, sumado a la información anterior, debemos concluir
                que <span className='spanBlack'> el nodo llamado &quot;Primer nodo&quot; tendrá como referencia el número &quot;0&quot;.</span> Por consiguiente, el nodo
                llamado &quot;Segundo nodo&quot; tendrá asignado el número &quot;1&quot;. Finalmente, los nodos &quot;Tercer
                nodo&quot; y &quot;Cuarto nodo&quot; tendrán asignados los valores &quot;2&quot; y &quot;3&quot;, respectivamente.
                </p>
            </div>
            <ul>
                Por lo tanto, si queremos unir los nodos anteriormente planteados, debemos hacerlo de la siguiente manera:
            </ul>
            <div className='documentation_ex'>
                <img src={LinkEx} alt='Ejemplificación de links' />
                <p className='documentation_info'>y obtenemos ... </p>
                <img src={Graph} alt='Grafo final' />
            </div>
            <ul>
                Finalmente, para que tu experiencia dentro de la aplicación sea la mejor, <span className='spanBlack'>te recomendamos trabajar los nodos con nombres
                que inicien desde el 0 hacia delante</span>. Sin embargo, puedes colocar cualquier nombre que desees y puedes editarlo en cualquier momento
                pero debes tener siempre en cuenta el ejemplo anterior.
            </ul>
            <h3>Limitaciones</h3>
            <ul>
                <li>
                    Nuestra aplicación está pensada para ser trabajada desde computadores o pantallas de grandes dimensiones,
                    motivo por el cual <span className='spanBlack'>nuestro programa no es responsive</span>, es decir, no es adaptable a dispositivos más pequeños
                    al anteriormente mencionado.
                </li>
            </ul>
            <h3>Comandos</h3>
            <ul>
                <li>
                    Si deseas agrandar o disminuir el tamaño de los nodos, solo debes usar la tecla <span className='spanBlack'>CTRL</span> y usar la rueda del mouse o el botón 
                    <span className='spanBlack'> +</span> o <span className='spanBlack'>-</span>
                </li>
            </ul>
            <h3>Páginas</h3>
            <p>Nuestra aplicación cuenta con 3 secciones además de esta:</p>
            <ul>
                <li>
                    <Link to='/'>
                        Página inicial
                    </Link >
                    <p>Página inicial de la aplicación, aquí podrás escoger entre trabajar con grafos dirigidos o no dirigidos</p>
                </li>
                <li>
                    <Link to='/dirigidos'>
                        Página para grafos dirigidos
                    </Link >
                    <p>Página para trabajar con grafos dirigidos</p>

                </li>
                <li>
                    <Link to='/no-dirigidos'>
                        Página para grafos no dirigidos
                </Link >
                <p>Página para trabajar con grafos no dirigidos</p>

                </li>
            </ul>
            <h3>Errores y alertas</h3>
            <ul>
                <li>
                    En caso de realizar alguna acción que no se encuentre permitida, nuestra aplicación está diseñada para <span className='spanBlack'>indicarte el error
                    además de la ubicación del mismo junto a su respectiva solución.</span>
                </li>

            </ul>
            <h3>Secciones</h3>
            <ul>
                <li className='spanBlue'>Matríz de camino</li>
                <p>Podrás visualizar una matriz de caminos y verificar si el grafo ingresado es o no conexo.</p>
                <li className='spanBlue'>Distancia entre dos nodos</li>
                <p>Mostrará el recorrido que hay entre dos nodos además de la distancia entre los mismos.</p>
                <li className='spanBlue'>Euleriano y/o hamiltoniano</li>
                <p>Determinará si un grafo es Euleriano y/o Hamiltoniano. Por otra parte, mostrará el camino o ciclo en caso de que exista.</p>
                <li className='spanBlue'>Flujo máximo</li>
                <p>Determina el flujo máximo que hay entre dos nodos.</p>
                <li className='spanBlue'>Árbol generador</li>
                <p>Podrás ver el árbol que se genera a causa del grafo. Tienes la libertad de mover los nodos como gustes dentro de el contenedor.</p>
            </ul>

            <h3>Tecnologías usadas</h3>
            <ul>
                <li>
                    <a href='https://es.reactjs.org/'>
                        React JS
                    </a>
                </li>
                <li>
                    <a href='https://www.javascript.com/'>
                        JavaScript
                    </a>
                </li>
                <li>
                    <a href='https://gojs.net/latest/index.html'>
                        GoJS
                    </a>
                </li>
                <li>
                    <a href='https://lodash.com/'>
                        Lodash
                    </a>
                </li>
                <li>
                    <a href='https://jestjs.io/'>
                        Jest
                    </a>
                </li>
            </ul>

        </div>
    )
}

export default Documentation;