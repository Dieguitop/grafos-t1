import React, { useState } from "react";

// TODO: implementar.
export default function Cycles() {
  return (
    <div className="distanceFromTo">
      <p>
        {!isHamiltoniano ? "El grafo no es hamiltoniano" : "El grafo es hamiltoninao"}

        {hamiltonianCycle ? (
          <>
            <p>Tiene como ciclo: </p>
            {hamiltonianCycle.map((item) => (
              <p className="main_pathOrCycle"> {item} </p>
            ))}
          </>
        ) : (
          console.log(hamiltonianCycle)
        )}

        {hamiltonianPath ? (
          <>
            <p>Tiene como camino: </p>
            {hamiltonianPath.map((item) => (
              <p className="main_pathOrCycle"> {item} </p>
            ))}
          </>
        ) : (
          console.log(hamiltonianPath)
        )}
      </p>
      <p>
        {!isEuleriano ? "El grafo no es euleriano" : "El grano es euleriano"}

        {eulerianCycle ? (
          <>
            <p>Tiene como ciclo: </p>
            {eulerianCycle.map((item) => (
              <p className="main_pathOrCycle"> {item} </p>
            ))}
          </>
        ) : (
          console.log(eulerianCycle)
        )}

        {eulerianPath ? (
          <>
            <p>Tiene como camino: </p>
            {eulerianPath.map((item) => (
              <p className="main_pathOrCycle"> {item} </p>
            ))}
          </>
        ) : (
          console.log(eulerianPath)
        )}
      </p>
    </div>
  );
}
