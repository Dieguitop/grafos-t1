import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

// TODO: implementar.
export default function MaxFlow() {
  return (
    <>
      <form className="main_formDistance" onSubmit={handleSubmitPeak}>
        <TextField
          className="main_textFieldDistance"
          id="filled-number-peak"
          label="Desde"
          type="number"
          name="from"
          InputProps={{ inputProps: { min: 0, max: 99 } }}
          onChange={handleInputPeakFlow}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className="main_textFieldDistance"
          id="filled-number-peak"
          label="Hasta"
          type="number"
          name="to"
          InputProps={{ inputProps: { min: 0, max: 99 } }}
          onChange={handleInputPeakFlow}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="gray" type="submit" onClick={saveData}>
          <RefreshIcon />
        </Button>
      </form>
      {changePeakData.from && changePeakData.to ? (
        <div className="distanceFromTo">
          <p>Flujo máximo es: {peakFlow}</p>
        </div>
      ) : (
        <div className="distanceFromTo">
          <p>Flujo máximo resultante es: {peakFlow}</p>
        </div>
      )}
    </>
  );
}
