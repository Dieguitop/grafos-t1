import React from "react";
import { Button } from "@material-ui/core";
import Link from "./Link.js";
// import swal from "sweetalert";

// const previewValidation = () => {
//   if (rows[0].length === 0) {
//     swal(
//       "Campos vacíos",
//       "Para continuar con la aplicación, debes completar los campos vacíos",
//       "error"
//     );
//   } else {
//     setValidation(true);
//   }
// };

export default function Links({ values, onAdd, onChange, onRemove }) {
  return (
    <>
      {values.map((link, index) => (
        <Link
          {...link}
          className="main_row"
          onChange={(from, to, text) =>
            onChange(link, { from, to, text, key: link.key })
          }
          onRemove={() => onRemove(link)}
          key={index}
        />
      ))}
      <Button variant="contained" color="secondary" onClick={onAdd}>
        Agregar link
      </Button>
    </>
  );
}
