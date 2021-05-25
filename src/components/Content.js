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
      new go.Binding(),
      $(go.Shape, 'Circle',
        { name: 'SHAPE', fill: 'white', strokeWidth: 1, portId: ""},
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 20, editable: false, font: "30px Verdana" },  // some room around the text
        new go.Binding('text').makeTwoWay()
      )
    );

  diagram.linkTemplate =
    $(go.Link,
      {curve: go.Link.Bezier},
      $(go.Shape),                           // this is the link shape (the line)
      $(go.Shape, { toArrow: "Standard" }),  // this is an arrowhead
      $(go.TextBlock,   
        {font: "30px Verdana" },                     // this is a Link label
        new go.Binding("text", "text"))
    );


  //* PARA MOSTRAR LÍNEAS DEBEN HABILITAR ESTE CÓDIGO COMENTADO
  /*diagram.linkTemplate =
  $(go.Link,       
  $(go.Shape)  
  );
  */
  return diagram;
}


const Content = ({ data, linksData }) => {
  return (
    <div className="content">
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName='diagram-component'
        nodeDataArray={data}
        linkDataArray={linksData}
      />
    </div>
  )
}
export default Content;