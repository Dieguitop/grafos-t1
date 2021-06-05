import React from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

// https://gojs.net/latest/samples/dragUnoccupied.html
function avoidNodeOverlap(node, pt, gridpt) {
  function isUnoccupied(r, node) {
    let diagram = node.diagram;

    function navig(obj) {
      let part = obj.part;
      if (part === node) return null;
      if (part instanceof go.Link) return null;
      if (part.isMemberOf(node)) return null;
      if (node.isMemberOf(part)) return null;
      return part;
    }

    let lit = diagram.layers;
    while (lit.next()) {
      let lay = lit.value;
      if (lay.isTemporary) continue;
      if (lay.findObjectsIn(r, navig, null, true).count > 0) return false;
    }

    return true;
  }

  if (node.diagram instanceof go.Palette) return gridpt;
  let bnds = node.actualBounds;
  let loc = node.location;
  let r = new go.Rect(
    gridpt.x - (loc.x - bnds.x),
    gridpt.y - (loc.y - bnds.y),
    bnds.width,
    bnds.height
  );

  r.inflate(-0.5, -0.5);

  if (
    !(node.diagram.currentTool instanceof go.DraggingTool) &&
    (!node._temp || !node.layer.isTemporary)
  ) {
    node._temp = true;
    while (!isUnoccupied(r, node)) {
      r.x += 10;
      r.y += 2;
    }
    r.inflate(0.5, 0.5);
    return new go.Point(r.x - (loc.x - bnds.x), r.y - (loc.y - bnds.y));
  }
  if (isUnoccupied(r, node)) return gridpt;
  return loc;
}

// https://gojs.net/latest/samples/fdLayout.html
function FDLayout() {
  go.ForceDirectedLayout.call(this);
}

go.Diagram.inherit(FDLayout, go.ForceDirectedLayout);

FDLayout.prototype.makeNetwork = function (coll) {
  let net = go.ForceDirectedLayout.prototype.makeNetwork.call(this, coll);

  net.vertexes.each(function (vertex) {
    let node = vertex.node;
    if (node !== null) vertex.isFixed = node.isSelected;
  });

  return net;
};

function initDiagram() {
  const $ = go.GraphObject.make;
  
  const diagram = $(go.Diagram, {
    "undoManager.isEnabled": true,
    "clickCreatingTool.archetypeNodeData": { text: "new node", color: "lightblue", fig: "Cloud" },
    initialAutoScale: go.Diagram.Uniform, // Zoom to make everything fit in the viewport.
    layout: $(go.CircularLayout),
    model: $(go.GraphLinksModel, {
      linkKeyProperty: "key",
    }),
  });

  var lay = diagram.layout;

  var spacing = 200;
  spacing = parseFloat(spacing, 200);
  lay.spacing = spacing;

  lay = go.CircularLayout.ConstantSpacing;

  diagram.nodeTemplate = $(
    go.Node,
    "Auto", // the Shape will go around the TextBlock
    new go.Binding(),
    $(
      go.Shape,
      "Circle",
      { name: "SHAPE", fill: "white", strokeWidth: 1, portId: "", },
      // Shape.fill is bound to Node.data.color
      new go.Binding("fill", "color")
    ),
    $(
      go.TextBlock,
      { margin: 10, editable: false, font: "26px Verdana" },
      new go.Binding("text").makeTwoWay()
    ),
    { dragComputation: avoidNodeOverlap }
  );

  diagram.linkTemplate = $(
    go.Link,
    { curve: go.Link.Bezier },
    $(go.Shape),
    $(go.Shape, { toArrow: "Standard" }),
    $(
      go.TextBlock,
      { font: "24px Verdana", segmentOffset: new go.Point(0, -20) },
      new go.Binding("text", "text")
    )
  );

  return diagram;
}

const Content = ({ data, linksData }) => {
  return (
    <div className="content">
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={data}
        linkDataArray={linksData}
      />
    </div>
  );
};

export default Content;
