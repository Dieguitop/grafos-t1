import React, { useEffect, useMemo } from "react";
import { Grafo } from "../lib/grafo/grafo.js";
import log from "../lib/log.js";
import Matrix from "./Matrix.js";
// import ShortestPath from "./ShortestPath.js";
// import Cycles from "./Cycles.js";
// import MaxFlow from "./MaxFlow.js";
// import MinimumSpanningTree from "./MinimumSpanningTree.js";

export default function Algorithms({ links, names, isDirected }) {
  const graph = useMemo(() => computeGraph(links, isDirected), [links]);

  function computeGraph(links, isDirected) {
    function findIsolatedNodes(links) {
      let isolatedNodes = [];
      for (const { from, to } of links) {
        for (const [a, b] of [
          [from, to],
          [to, from],
        ]) {
          // Si uno de los extremos del link está definido, y el otro no,
          // agregarlo como nodo aislado.
          if (a != null && b == null) {
            isolatedNodes.push(a);
          }
        }
      }

      return isolatedNodes;
    }

    // Filtrar links cuyos origen y destino no estén definidos.
    const sanitizedLinks = links.filter(
      ({ from, to }) => from != null && to != null
    );

    let newGraph = Grafo.desdeListaDeLinks(sanitizedLinks, isDirected);

    for (const isolated of findIsolatedNodes(links)) {
      newGraph.agregarNodo(isolated);
    }

    return newGraph;
  }

  useEffect(() => {
    log("Grafo (post modificación): %o (context = %o)", graph, {
      names,
      links,
    });
  }, [graph]);

  return (
    <>
      <Matrix value={graph.matrizDeAdyacencia} names={names} />
      <hr />
      <Matrix value={graph.matrizDeCaminos} names={names} />
      {/* <ShortestPath graph={graph} /> */}
      {/* <Cycles graph={graph} /> */}
      {/* <MaxFlow graph={graph} /> */}
      {/* <MinimumSpanningTree graph={graph} /> */}
    </>
  );
}
