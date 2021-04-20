import { Box, Button, Grid, TextField } from '@material-ui/core';
import { ArrowDownward, Save } from '@material-ui/icons';
import React from 'react';

const Menu = () => {
    const handleMessage = () => {
        alert(`La opción dirigida está activa`)
    };

    const handleMessageNot = () => {
        alert(`La opción no dirigida está activa`)
    };


    return (
        <Grid xs={3} container justify='center' >
            <div>
            <h1>ESTA SECCIÓN AÚN NO ESTÁ FUNCIONADO</h1>

                <h3>Crear grafo</h3>
                
                <div>
                <Box marginBottom={5}>
                    <TextField
                        id="standard-number"
                        label="Cantidad de nodos"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                    <Box marginBottom={10}>
                        <Grid container direction='column'>
                            <TextField
                                id="standard-number"
                                label="Origen"
                                type="number"
                                min
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Box  marginTop={2}>
                                <Grid justify='center'>
                                    <ArrowDownward fontSize='large'/>
                                </Grid>
                            </Box>
                            <TextField
                                id="standard-number"
                                label="Destino"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Box>
                    <Button onClick={handleMessage} variant="contained" color="primary">
                        Dirigido
                    </Button>
                    <Button onClick={handleMessageNot} variant="contained" color="secondary">
                        No dirigido
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled
                        startIcon={<Save />}
                    >Crear</Button>
                </div>
            </div>
        </Grid>
    )
}

export default Menu;