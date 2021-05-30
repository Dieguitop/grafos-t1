import { Box, Button, FormControl, TextField } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';


const RowLink = ({ onChange, onRemove, from, to, text }) => {
    
    return (
        <FormControl m={10}>
            <Box display='flex' width='100%' justifyContent='space-between' p={1}>
                <TextField
                    id='filled-number'
                    label='Desde'
                    type='number'
                    value={from}
                    InputProps={{ inputProps: { min: 0, max: 99 } }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => onChange('from', e.target.value)}
                />
                <TextField
                    id='filled-number'
                    label='Hasta'
                    type='number'
                    value={to}
                    InputProps={{ inputProps: { min: 0, max: 99 } }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => onChange('to', e.target.value)}
                />

                <TextField
                    id='filled-number'
                    label='Peso'
                    type='number'
                    value={text}
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{ inputProps: { min: 0, max: 99 } }}
                    onChange={e => onChange( 'text', e.target.value )}
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
};

export default RowLink;