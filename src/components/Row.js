import { Box, Button, FormControl, TextField } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

const Row = ({ onChange, onRemove, text }) => {

    return (
        <FormControl className='main_formControl'>
            <Box display='flex' width='100%' justifyContent='space-between' p={1}>
                <TextField
                    fullWidth='true'
                    className='main_textField'
                    label='Nombre del nodo'
                    value={text}
                    onChange={e => onChange('text', e.target.value)}
                />
                <Button
                    size='small'
                    startIcon={<DeleteIcon className='main_deleteIcon' style={{ fontSize: 25 }} />}
                    onClick={onRemove}
                >
                </Button>
            </Box>
        </FormControl>
    );
}

export default Row;