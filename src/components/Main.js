import React, { useState } from 'react';
import { Box, Button, FormControl, TextField } from '@material-ui/core';
import Content from './Content';
import DeleteIcon from '@material-ui/icons/Delete';

function Row({ onChange, onRemove, text }) {
    return (
        <FormControl m={10}>
            <TextField
                label="Nombre del nodo"
                value={text}
                onChange={e => onChange("text", e.target.value)}
            />
            <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={onRemove}
            >
                Delete
      </Button>
        </FormControl>
    );
}

const Main = () => {

    const defaultState = {
        text: "",
        color: "lightskyblue"
    };

    const [rows, setRows] = useState([defaultState]);

    const handleOnChange = (index, text, value) => {
        const copyRows = [...rows];
        copyRows[index] = {
            ...copyRows[index],
            [text]: value
        };
        setRows(copyRows);
    };

    const handleOnAdd = () => {
        setRows(rows.concat(defaultState));

    };

    const handleOnRemove = index => {
        const copyRows = [...rows];
        copyRows.splice(index, 1);
        setRows(copyRows);
    };


    return (
        <Box display='flex' className='main_view'>
            <div className="main_options">
            <Button m={10} variant="contained" color="secondary" onClick={handleOnAdd}>Agregar</Button>

                {rows.map((row, index) => (
                    <Row
                        {...row}
                        className='main_row'
                        onChange={(text, value, color) => handleOnChange(index, text, value, color)}
                        onRemove={() => handleOnRemove(index)}
                        key={index}
                    />
                ))}
            </div>
            <Content data={rows} />
        </Box>
    )
}

export default Main;