import React from 'react';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';


function initDiagram() {
  const $ = go.GraphObject.make;
  const diagram =
    $(go.Diagram,
      {
        'undoManager.isEnabled': true,
        'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue', fig: 'Cloud' },
        model: $(go.GraphLinksModel,
          {
            linkKeyProperty: 'key'
          })
      });

  diagram.nodeTemplate =
    $(go.Node, 'Auto',  // the Shape will go around the TextBlock
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'Circle',
        { name: 'SHAPE', fill: 'white', strokeWidth: 0, portId: "", fromLinkable: true, toLinkable: true },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8, editable: true },  // some room around the text
        new go.Binding('text').makeTwoWay()
      )
    );

  //* PARA MOSTRAR LÍNEAS DEBEN HABILITAR ESTE CÓDIGO COMENTADO
  /*diagram.linkTemplate =
  $(go.Link,       
  $(go.Shape)  
  );
  */
  return diagram;
}


const Content = ({data}) => (
    <div className="content">
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName='diagram-component'
        nodeDataArray={data}
      />
    </div>
)
export default Content;