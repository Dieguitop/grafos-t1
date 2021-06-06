import React, { useState } from "react";
import { TextField } from "@material-ui/core";

// TODO: implementar.
export default function ShortestPath(props) {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [path, setPath] = useState([]);

  function handleChange(event) {
    const name = event.target.name;
    if (name === "from") {
      setFrom(event.target.value);
    } else {
      setTo(event.target.value);
    }

    setPath(props.graph.caminoMasCorto(from, to).camino);
  }

  return (
    <div>
      <form className="main_formDistance">
        <TextField
          className="main_textFieldDistance"
          id="filled-number"
          label="Desde"
          type="number"
          name="from"
          InputProps={{ inputProps: { min: 0, max: 99 } }}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          className="main_textFieldDistance"
          id="filled-number"
          label="Hasta"
          type="number"
          name="to"
          InputProps={{ inputProps: { min: 0, max: 99 } }}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </form>
      <div className="distanceFromTo">
        <p>
          Los nodos recorridos desde {from} hasta {to} son los siguientes: {path}
        </p>
        {path.length > 0 && path.map((item) => <p className="main_distanceItem">{item}</p>)}
        <p>Distancia : {0}</p>
      </div>
    </div>
  );
}
