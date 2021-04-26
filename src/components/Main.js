import React, { useState } from 'react';
import { Box, Button, FormControl, TextField } from '@material-ui/core';
import Content from './Content';
import DeleteIcon from '@material-ui/icons/Delete';

function Row({ onChange, onRemove, text }) {

    return (
        <FormControl className='main_formControl'>
            <Box display="flex" width="100%" justifyContent="space-between" p={1}>
                <TextField
                    fullWidth="true"
                    className='main_textField'
                    label="Nombre del nodo"
                    value={text}
                    onChange={e => onChange("text", e.target.value)}
                /> 
                <Button
                    size="small"
                    startIcon={<DeleteIcon style={{ fontSize: 25}} />}
                    onClick={onRemove}
                >
                </Button>
            </Box>
        </FormControl>
    );
}

function RowLink({ onChange, onRemove, from, to}) {
;
    return (
        <FormControl m={10}>
            <Box display="flex" width="100%" justifyContent="space-between" p={1}>
                <TextField
                    id="filled-number"
                    label="Desde"
                    type="number"
                    value={from}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => onChange("from", e.target.value)}
                />
                <TextField
                    id="filled-number"
                    label="Hasta"
                    type="number"
                    value={to}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => onChange("to", e.target.value)}
                />
                <Button
                    size="small"
                    startIcon={<DeleteIcon style={{ fontSize: 25}} />}
                    onClick={onRemove}
                >
                </Button>
            </Box>
        </FormControl>
    );
}

const Main = () => {

    const defaultState = {
        text: "",
        color: "lightskyblue",
    };

    const defaultStateLinks = {
        from: '',
        to: '',
    }

    const [rows, setRows] = useState([defaultState]);
    const [links, setLinks] = useState([defaultStateLinks]);

    const handleOnChange = (index, text, value) => {
        const copyRows = [...rows];
        const key = index;
        copyRows[index] = {
            ...copyRows[index],
            key,
            [text]: value
        };
        setRows(copyRows);
    };

    const handleOnAdd = () => {
        setRows(rows.concat(defaultState));
    };

    const handleOnAddLink = () => {
        setLinks(links.concat(defaultStateLinks));

    };

    const handleOnRemove = index => {
        const copyRows = [...rows];
        copyRows.splice(index, 1);
        setRows(copyRows);
    };

    const handleOnChangeLinks = (index, from, value, to) => {
        const copyLinks = [...links];
        copyLinks[index] = {
            ...copyLinks[index],
            [from]: value,
            [to]: value,
        };
        setLinks(copyLinks);
    };

    const handleOnRemoveLink = index => {
        const copyLinks = [...links];
        copyLinks.splice(index, 1);
        setLinks(copyLinks);
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

                    <hr />
                    <Button m={10} variant="contained" color="grey" onClick={handleOnAddLink}>Agregar link</Button>
                    {links.map((link, index) => (
                        <RowLink
                            {...link}
                            className='main_row'
                            onChange={(from, to, value) => handleOnChangeLinks(index, from, to, value)}
                            onRemove={() => handleOnRemoveLink(index)}
                            key={index}
                        />
                    ))}
            </div>


            <Content data={rows} linksData={links} />
        </Box>
    )
}

export default Main;