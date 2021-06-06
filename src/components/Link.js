import React from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "8ch",
    },
  },
}));

export default function Link({ onChange, onRemove, from, to, text }) {
  const classes = useStyles();
  return (
    <form className={classes.root}>
      <TextField
        id="filled-number"
        label="Desde"
        value={from}
        variant="standard"
        InputLabelProps={{ shrink: true }}
        onChange={(event) => onChange(event.target.value, to, text)}
      />
      <TextField
        id="filled-number"
        label="Hasta"
        value={to}
        variant="standard"
        InputLabelProps={{ shrink: true }}
        onChange={(event) => onChange(from, event.target.value, text)}
      />
      <TextField
        id="filled-number"
        label="Peso"
        value={text}
        variant="standard"
        InputLabelProps={{ shrink: true }}
        onChange={(event) => onChange(from, to, event.target.value)}
        disabled={from.length === 0 || to.length === 0}
      />
      <Button
        size="small"
        startIcon={
          <DeleteIcon className="main_deleteIcon" style={{ fontSize: 25 }} />
        }
        onClick={onRemove}
      ></Button>
    </form>
  );
}
