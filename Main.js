import React, { useState } from 'react';
import { Box, Button, FormControl, TextField } from '@material-ui/core';
import Content from './Content';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import RefreshIcon from '@material-ui/icons/Refresh';

function Row({ onChange, onRemove, text }) {

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
                    startIcon={<DeleteIcon style={{ fontSize: 25 }} />}
                    onClick={onRemove}
                >
                </Button>
            </Box>
        </FormControl>
    );
}

function RowLink({ onChange, onRemove, from, to, text, onClick }) {
    ;
    return (
        <FormControl m={10}>
            <Box display='flex' width='100%' justifyContent='space-between' p={1}>
                <TextField
                    id='filled-number'
                    label='Desde'
                    type='number'
                    value={from}
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
                        shrink: true,
                    }}
                    onChange={e => onChange('text', e.target.value)}
                />
                <Button
                    size='small'
                    startIcon={<SaveAltIcon style={{ fontSize: 25 }} />}
                    onClick={onClick}
                >
                </Button>
                <Button
                    size='small'
                    startIcon={<DeleteIcon style={{ fontSize: 25 }} />}
                    onClick={onRemove}
                >
                </Button>
            </Box>
        </FormControl>
    );
}

const Main = () => {



    const defaultState = {
        text: '',
        color: 'lightskyblue',
    };

    const defaultStateLinks = {
        from: '',
        to: '',
        text: '',
    };

    const [rows, setRows] = useState([defaultState]); //nodos
    const [links, setLinks] = useState([defaultStateLinks]);
    const [doneFetch, setDoneFetch] = useState(false);
    const [doneFetchDistance, setDoneFetchDistance] = useState(false);
    const [array, setArray] = useState([]);
    const [doneFetchHamEul, setDoneFetchHamEul] = useState(false);
    const [doneFetchFlujoMaximo, setDoneFetchFlujoMaximo] = useState(false);
    const [doneFetchArbol, setDoneFetchArbol] = useState(false);
    const [cont, setCont] = useState([])
    const [datos, setDatos] = useState({
        desde: '',
        hasta: '',
    })

    //

    const handleArbol = () => {
        !doneFetchArbol ? (setDoneFetchArbol(true)) : setDoneFetchArbol(false);
    }

    const handleFlujoMaximo = () => {
        !doneFetchFlujoMaximo ? (setDoneFetchFlujoMaximo(true)) : setDoneFetchFlujoMaximo(false);
    }

    const handleDistance = () => {

        !doneFetchDistance ? (setDoneFetchDistance(true)) : setDoneFetchDistance(false);
    }

    const handleHamEul = () => {

        !doneFetchHamEul ? (setDoneFetchHamEul(true)) : setDoneFetchHamEul(false);
        for (const element in links) {
            //console.log(links[element].from, initialElmement);
            let saveElement = [...links[element].from]

            //console.log(...links[element].from)
            if (links[element].from !== saveElement[0]) {
                //console.log('Hola mundo')
            } else {
                //console.log(links[element].from, saveElement[0])
            }

        }

        console.log(links)
    }



    const handleMatriz = () => {
        const copySecondArray = [];
        console.log(copySecondArray);
        !doneFetch ? (setDoneFetch(true)) : setDoneFetch(false);
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows.length; j++) {
                copySecondArray.push(0);
                if (i === links[i].from && j === links[i].to) {
                    copySecondArray.push(69)
                }
            }
        }
        setArray(copySecondArray);
    }

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

    const handleOnChangeLinks = (index, from, value, text, to) => {
        const copyLinks = [...links];
        copyLinks[index] = {
            ...copyLinks[index],
            [from]: value,
            [to]: value,
            [text]: value,
        };
        setLinks(copyLinks);
    };

    const handleOnRemoveLink = index => {
        const copyLinks = [...links];
        copyLinks.splice(index, 1);
        setLinks(copyLinks);
    };


    //-------------DIJKSTRA---------------------------------------------------------
    // Función Dijkstra que se activa con un botón
    const dijkstra = () => {
        let initialNode = datos.desde;
        const finalNode = datos.hasta;
        let peso = 100;
        let j = 0;
        let auxNode = [];
        let saveData = [];
        for (let i = 0; i < links.length; i++) {
            if (links[i].from === initialNode) {
                while (j < links.length) {
                    if (links[j].from === initialNode) {
                        if (links[j].text < peso) {
                            peso = links[j].text;
                            auxNode = links[j];
                        };
                    }
                    j++;
                }
                saveData.push(initialNode);
                initialNode = auxNode.to;
            }
            // reinicializamos los valores para volver a iterar
            peso = 100;
            j = 0;

        }
        // filtramos valores que se hayan repetido
        saveData.push(finalNode);
        const filterData = new Set(saveData);
        let finalResult = [...filterData];
        setCont(finalResult);

    };

    // Obtener valores desde y hasta para implementar Dijkstra
    const handleInputChangeFromTo = (e) => {
        e.preventDefault();
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
        })
    }
    // Enviar datos para actualizar formulario
    const handleSubmitFromTo = (e) => {
        e.preventDefault();
    }

    return (
        <Box display='flex' className='main_view'>
            <div className='main_options'>
                <Button m={10} variant='contained' color='secondary' onClick={handleOnAdd}>Agregar</Button>
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
                <Button m={10} variant='contained' color='grey' onClick={handleOnAddLink}>Agregar link</Button>
                {links.map((link, index) => (
                    <RowLink
                        {...link}
                        className='main_row'
                        onChange={(from, to, value, text) => handleOnChangeLinks(index, from, to, value, text)}
                        onRemove={() => handleOnRemoveLink(index)}
                        key={index}
                    //onClick={(from, to) => getFromTo(from, to)}
                    />
                ))}


                <Button m={10}
                    className='main_row'
                    variant='contained'
                    color='primary'
                    onClick={handleMatriz}
                >
                    MATRIZ DE CAMINO
                    </Button>
                <div className={
                    doneFetch === true ? ('main_isMatriz') : 'main_noMatriz'
                }>
                    {
                        array.map(matrix => (
                            <p>{matrix}</p>
                        ))
                    }
                </div >

                {/* DISTANCIA ENTRE DOS NODOS */}
                <Button m={10}
                    className='main_row'
                    variant='contained'
                    color='primary'
                    onClick={handleDistance}
                >
                    DISTANCIA ENTRE DOS NODOS
                    </Button>
                <div
                    className={
                        doneFetchDistance === true ? ('main_isMatriz') : 'main_noMatriz'
                    }>
                    <form className='main_formDistance' onSubmit={handleSubmitFromTo}>
                        <TextField
                            className='main_textFieldDistance'
                            id='filled-number'
                            label='Desde'
                            type='number'
                            name='desde'
                            onChange={handleInputChangeFromTo}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className='main_textFieldDistance'
                            id='filled-number'
                            label='Hasta'
                            type='number'
                            name='hasta'
                            onChange={handleInputChangeFromTo}
                            InputLabelProps={{ shrink: true, }}
                        />
                        <Button
                            variant='contained'
                            color='gray'
                            type='submit'
                            onClick={dijkstra}
                        ><RefreshIcon />
                        </Button>
                    </form>
                    {
                        datos.desde && datos.hasta ? (
                            <div className='distanceFromTo'>
                                {cont.map(item => (
                                    <p>Nodo: {item}</p>
                                ))}
                            </div>
                        ) : console.log('faltan')
                    }
                </div >
                {/* DISTANCIA ENTRE DOS NODOS */}

                <Button m={10}
                    className='main_row'
                    variant='contained'
                    color='primary'
                    onClick={handleHamEul}
                >
                    HAMILTONIANO Y/O EULERIANO
                    </Button>
                <div className={
                    doneFetchHamEul === true ? ('main_isMatriz') : 'main_noMatriz'
                }>
                    HAMILTONIANO Y/O EULERIANO
                </div >

                <Button m={10}
                    className='main_row'
                    variant='contained'
                    color='primary'
                    onClick={handleFlujoMaximo}
                >
                    FLUJO MÁXIMO
                    </Button>
                <div className={
                    doneFetchFlujoMaximo === true ? ('main_isMatriz') : 'main_noMatriz'
                }>
                    FLUJO MÁXIMO
                </div >

                <Button m={10}
                    className='main_row'
                    variant='contained'
                    color='primary'
                    onClick={handleArbol}
                >
                    ÁRBOL GENERADOR
                    </Button>
                <div className={
                    doneFetchArbol === true ? ('main_isMatriz') : 'main_noMatriz'
                }>
                    ÁRBOL GENERADOR
                </div >

            </div >




            <Content data={rows} linksData={links} />
        </Box >
    )
}


export default Main;