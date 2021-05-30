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
        { name: 'SHAPE', fill: 'white', strokeWidth: 1, portId: "" },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 20, editable: false, font: "30px Verdana" },
        new go.Binding('text').makeTwoWay()
      )
    );

  diagram.linkTemplate =
    $(go.Link,
      { curve: go.Link.Bezier },
      $(go.Shape),
      $(go.Shape, { toArrow: "Standard" }),
      $(go.TextBlock,
        { font: "30px Verdana" },                     
        new go.Binding("text", "text"))
    );


  diagram.linkTemplate =
    $(go.Link,
      $(go.Shape)
    );

  return diagram;
}


const NotDirected = ({ data, linksData }) => {
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
export default NotDirected;