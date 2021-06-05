import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import Content from './Content';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Grafo, Trayecto } from '../lib/grafo/grafo.js';
import { Arista } from '../lib/grafo/arista.js';
import { SaveAlt } from '@material-ui/icons';
import swal from 'sweetalert';
import CachedIcon from '@material-ui/icons/Cached';
import RowLink from './RowLink';
import Row from './Row';

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
    const [doneFetchHamEul, setDoneFetchHamEul] = useState(false);
    const [doneFetchFlujoMaximo, setDoneFetchFlujoMaximo] = useState(false);
    const [doneFetchArbol, setDoneFetchArbol] = useState(false);
    const [changeData, setChangeData] = useState({
        desde: '',
        hasta: '',
    })
    const [changePeakData, setChangePeakData] = useState({
        from: '',
        to: '',
    });
    const [edgesClass, setEdgesClass] = useState([]);
    const [grafo, setGrafo] = useState([]);
    const [arbolGenerador, setArbolGenerador] = useState([])
    const [matrizDeCamino, setMatrizDeCamino] = useState([]);
    const [saveAllData, setSaveAllData] = useState(false)
    const [isHamiltoniano, setIsHamiltoniano] = useState(false);
    const [isEuleriano, setIsEuleriano] = useState(false);
    const [isConexo, setIsConexo] = useState(false);
    const [distance, setDistance] = useState();
    const [shortPath, setShortPath] = useState([]);
    const [distanceFrom, setDistanceFrom] = useState(0);
    const [distanceTo, setDistanceTo] = useState(0);
    const [peakFlowFrom, setPeakFlowFrom] = useState(0);
    const [peakFlowTo, setPeakFlowTo] = useState(0);
    const [peakFlow, setPeakFlow] = useState();
    const [validation, setValidation] = useState(false);
    const [eulerianPath, setEulerianPath] = useState([]);
    const [eulerianCycle, setEulerianCycle] = useState([]);
    const [hamiltonianPath, setHamiltonianPath] = useState([]);
    const [hamiltonianCycle, setHamiltonianCycle] = useState([]);

    const saveArista = (from, to, peso) => {

        const edge = new Arista(from, to, peso);
        setEdgesClass(edgesClass.concat(edge));
        grafoClass(from, to, peso)

    };

    const grafoClass = (from, to, peso) => {
        const numberFrom = Number(from);
        const numberTo = Number(to);
        const numberPeso = Number(peso);
        const listaDeAristas = [
            new Arista(numberFrom, numberTo, numberPeso),
        ];
        setGrafo(grafo.concat(listaDeAristas));
    };

    const previewValidation = () => {
        (rows[0].length === 0 || links[0].from.length === 0) ? (
            swal('Campos vacíos','Para continuar con la aplicación, debes completar los campos vacíos', 'error')
        ) : setValidation(true);
    };

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
    }



    const handleMatriz = () => {
        !doneFetch ? (setDoneFetch(true)) : setDoneFetch(false);
    }


    const saveData = () => {
        previewValidation();
        if(validation === true){
            setSaveAllData(true);
            const gra = Grafo.desdeListaDeAristas(grafo, true);
            const { esEuleriano , esHamiltoniano, esConexo, matrizDeCaminos, arbolGeneradorMinimo: agm } = gra;
            const { camino: shortPathGraph, distancia: distanceShortes } = gra.caminoMasCorto(distanceFrom , distanceTo);
            const peak = gra.flujoMaximo(peakFlowFrom, peakFlowTo);

            setArbolGenerador(agm.arbol.map((arista) => arista.link));
            setMatrizDeCamino(matrizDeCaminos);
            setIsHamiltoniano(esHamiltoniano);
            setIsEuleriano(esEuleriano);
            setIsConexo(esConexo);
            setDistance(distanceShortes);
            setShortPath(shortPathGraph);
            setPeakFlow(peak);
            setEulerianPath(gra.euleriano(Trayecto.camino))
            setEulerianCycle(gra.euleriano(Trayecto.ciclo))
            setHamiltonianPath(gra.hamiltoniano(Trayecto.camino))
            setHamiltonianCycle(gra.hamiltoniano(Trayecto.ciclo))
        } else console.log('error')

    };

    function refreshPage(e){
        e.preventDefault()
        window.location.reload();
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
        let len = rows.length - 1;
        rows[len].text.length > 0 ? setRows(rows.concat(defaultState)) : swal('Error en los nodos', 'Campos vacíos, por favor asigne nombre a los nodos creados', 'error');
    };

    const handleOnAddLink = () => {
        let len = links.length - 1;
        (links[len].from.length > 0 || links[len].to.length > 0 || links[len].text.length > 0 ) ? (
            setLinks(links.concat(defaultState))
        ) : swal('Error en los links', 'Campos vacíos en los links, por favor complete los datos antes de continuar', 'error');
    };

    const handleOnRemove = index => {
        if(rows.length === 1){
            swal('Error en los nodos','No se puede eliminar el único campo de nodos', 'error')
        } else {
            const copyRows = [...rows];
            copyRows.splice(index, 1);
            setRows(copyRows);
        }

        saveData();
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
        if (copyLinks[index].from && copyLinks[index].to && copyLinks[index].text)
            saveArista(copyLinks[index].from, copyLinks[index].to, copyLinks[index].text)
    };

    const handleOnRemoveLink = index => {
        if(links.length === 1){
            swal("Error en los links", 'No se puede eliminar el único elemento de los links', 'error')
        } else {
            const copyLinks = [...links];
            copyLinks.splice(index, 1);
            setLinks(copyLinks);
        }
        saveData();
    };

    const handleSubmitFromTo = (e) => {
        e.preventDefault();
        getFromTo(changeData)
    };

    const handleInputChangeFromTo = (e) => {
        e.preventDefault();
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmitPeak = (e) => {
        e.preventDefault();
        peakFlowFromTo(changePeakData);
    };

    const peakFlowFromTo = ({from, to}) => {
        if( from && to ){
            setPeakFlowFrom(Number(from));
            setPeakFlowTo(Number(to));
        }

    };

    const getFromTo = ({desde, hasta}) => {
        if(desde && hasta){
            setDistanceFrom(Number(desde));
            setDistanceTo(Number(hasta));
        }
    };

    const handleInputPeakFlow = (e) => {
        e.preventDefault();
        setChangePeakData({
            ...changePeakData,
            [e.target.name]: e.target.value,
        })
    };

    return (
        <Box display='flex' className='main_view'>
            <div className='main_options'>
                <Button m={10} variant='contained' color='secondary' onClick={handleOnAdd}>Agregar</Button>
                {rows.map((row, index) => (

                    <Row
                        {...row}
                        className='main_row'
                        onChange={(text, value) => handleOnChange(index, text, value)}
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
                    />
                ))}

                <div>
                    {
                        (links.length < 1 || rows.length < 1 ) ? (
                            <Button m={10}
                                className='main_row'
                                variant='contained'
                                color='primary'
                                disabled
                            >
                                GUARDAR DATOS
                                <SaveAlt/>
                            </Button>
                        ) : (
                            <Button m={10}
                                className='main_row'
                                variant='contained'
                                color='primary'
                                onClick={saveData}
                            >
                                GUARDAR DATOS
                                <SaveAlt />
                            </Button>
                        )
                    }
                </div>

{/* ------------------------ MATRIZ DE CAMINO ------------------------ */}

                {
                    !saveAllData ? (
                        <Button m={10}
                            className='main_row'
                            variant='contained'
                            color='primary'
                            onClick={handleMatriz}
                            disabled
                        >
                            MATRIZ DE CAMINO
                        </Button>
                    ) : (
                        <Button m={10}
                            className='main_row'
                            variant='contained'
                            color='primary'
                            onClick={handleMatriz}
                        >
                            MATRIZ DE CAMINO
                        </Button>
                    )
                }

                <div className={
                    doneFetch === true ? ('main_isMatriz') : 'main_noMatriz'
                }>
                    <Button
                        variant='contained'
                        color='gray'
                        type='submit'
                        className="main_buttonMargin"
                    ><RefreshIcon />
                    </Button>
                    <div className="item">

                    {
                        matrizDeCamino &&
                            matrizDeCamino.map((item, index) => (
                                <div className="main_boxItem">
                                    <p>{index}</p>
                                    {

                                        item.map(miniItem => (
                                            <div className="main_boxMiniItem">
                                                <p className='main_p'>{miniItem} &nbsp; </p>
                                            </div>
                                        ))

                                    }
                                </div>
                            ))
                    }
                    <p className='main_isConexo'>
                        {
                            (isConexo===true) ? ('El grafo es conexo') : ('El grafo no es conexo')
                        }
                    </p>
                    </div>
                </div >
{/* ------------------------ MATRIZ DE CAMINO ------------------------ */}


{/* ------------------------ DISTANCIA ENTRE DOS NODOS ------------------------ */}

                {
                    !saveAllData ? (
                        <Button m={10}
                            className='main_row'
                            variant='contained'
                            color='primary'
                            onClick={handleDistance}
                            disabled
                        >
                            DISTANCIA ENTRE DOS NODOS
                        </Button>
                    ) : (
                        <Button m={10}
                            className='main_row'
                            variant='contained'
                            color='primary'
                            onClick={handleDistance}

                        >
                            DISTANCIA ENTRE DOS NODOS
                        </Button>
                    )
                }

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
                            InputProps={{ inputProps: { min: 0, max: 99 } }}
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
                            InputProps={{ inputProps: { min: 0, max: 99 } }}
                            onChange={handleInputChangeFromTo}
                            InputLabelProps={{ shrink: true, }}
                        />

                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            onClick={saveData}
                        ><RefreshIcon />
                        </Button>
                    </form>
                    {
                        changeData.desde && changeData.hasta ? (
                            <div className='distanceFromTo'>
                                <p>Los nodos recorridos son los siguientes: </p>
                                {shortPath.map(item => (
                                    <p className='main_distanceItem'>{item}</p>
                                ))}
                            <p>
                                Distancia : {distance}
                            </p>
                            </div>
                        ) : console.log()
                    }

                </div >
{/* ------------------------ DISTANCIA ENTRE DOS NODOS ------------------------ */}

{/* ------------------------ HAMILTONIANO/EULERIANO ------------------------ */}

                {
                    !saveAllData ? (
                        <Button m={10}
                            className='main_row'
                            variant='contained'
                            color='primary'
                            onClick={handleHamEul}
                            disabled
                        >
                            HAMILTONIANO Y/O EULERIANO
                        </Button>
                    ) : (
                        <Button m={10}
                            className='main_row'
                            variant='contained'
                            color='primary'
                            onClick={handleHamEul}
                        >
                            HAMILTONIANO Y/O EULERIANO
                        </Button>
                    )
                }

                <div className={
                    doneFetchHamEul === true ? ('main_isMatriz') : 'main_noMatriz'
                }>
                    <div className='distanceFromTo'>
                    <p>
                        {
                            !isHamiltoniano ? ('El grafo no es hamiltoniano') : ('El grafo es hamiltoninao')
                        }

                        {
                            hamiltonianCycle ? (
                                <>
                                    <p>Tiene como ciclo: </p>
                                    {
                                        hamiltonianCycle.map(item => (
                                            <p className='main_pathOrCycle'> {item} </p>
                                        ))
                                    }
                                </>

                            ) : console.log(hamiltonianCycle)
                        }

{
                            hamiltonianPath ? (
                                <>
                                    <p>Tiene como camino: </p>
                                    {
                                        hamiltonianPath.map(item => (
                                            <p className='main_pathOrCycle'> {item} </p>
                                        ))
                                    }
                                </>

                            ) : console.log(hamiltonianPath)
                        }

                    </p>
                    <p>
                        {
                            !isEuleriano ? ('El grafo no es euleriano') : ('El grafo es euleriano')
                        }

{
                            eulerianCycle ? (
                                <>
                                    <p>Tiene como ciclo: </p>
                                    {
                                        eulerianCycle.map(item => (
                                            <p className='main_pathOrCycle'> {item} </p>
                                        ))
                                    }
                                </>

                            ) : console.log(eulerianCycle)
                        }

{
                            eulerianPath ? (
                                <>
                                    <p>Tiene como camino: </p>
                                    {
                                        eulerianPath.map(item => (
                                            <p className='main_pathOrCycle'> {item} </p>
                                        ))
                                    }
                                </>

                            ) : console.log(eulerianPath)
                        }
                    </p>
                    </div>
                </div >
{/* ------------------------ HAMILTONIANO/EULERIANO ------------------------ */}


{/* ------------------------ FLUJO MÁXIMO ------------------------ */}
                {
                    !saveAllData ? (
                        <Button m={10}
                            className='main_row'
                            variant='contained'
                            color='primary'
                            onClick={handleFlujoMaximo}
                            disabled
                        >
                            FLUJO MÁXIMO
                        </Button>
                    ) : (
                        <Button m={10}
                            className='main_row'
                            variant='contained'
                            color='primary'
                            onClick={handleFlujoMaximo}
                        >
                            FLUJO MÁXIMO
                        </Button>
                    )
                }

                <div className={
                    doneFetchFlujoMaximo === true ? ('main_isMatriz') : 'main_noMatriz'
                }>
                    <form className='main_formDistance' onSubmit={handleSubmitPeak}>
                        <TextField
                            className='main_textFieldDistance'
                            id='filled-number-peak'
                            label='Desde'
                            type='number'
                            name='from'
                            InputProps={{ inputProps: { min: 0, max: 99 } }}
                            onChange={handleInputPeakFlow}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className='main_textFieldDistance'
                            id='filled-number-peak'
                            label='Hasta'
                            type='number'
                            name='to'
                            InputProps={{ inputProps: { min: 0, max: 99 } }}
                            onChange={handleInputPeakFlow}
                            InputLabelProps={{ shrink: true, }}
                        />
                        <Button
                            variant='contained'
                            color='gray'
                            type='submit'
                            onClick={saveData}
                        ><RefreshIcon />
                        </Button>
                    </form>
                    {
                        changePeakData.from && changePeakData.to ? (
                            <div className='distanceFromTo'>
                                <p>Flujo máximo es: {peakFlow}</p>
                            </div>
                        ) : (
                            <div className='distanceFromTo'>
                                <p>Flujo máximo resultante es: {peakFlow}</p>
                            </div>
                        )
                    }
                </div >

{/* ------------------------ FLUJO MÁXIMO ------------------------ */}

{/* ------------------------ ÁRBOL GENERADOR ------------------------ */}
                {
                    !saveAllData ? (
                        <Button
                            m={10}
                            className='main_row'
                            variant='contained'
                            color='primary'
                            onClick={handleArbol}
                            disabled
                        >
                            ÁRBOL GENERADOR
                        </Button>
                    ) : (
                        <Button
                            m={10}
                            className='main_row'
                            variant='contained'
                            color='primary'
                            onClick={handleArbol}
                        >
                            ÁRBOL GENERADOR
                        </Button>
                    )
                }

                <div className={
                    doneFetchArbol === true ? ('main_isMatriz') : 'main_noMatriz'
                }>
                    <Button
                        variant='contained'
                        color='gray'
                        type='submit'
                    ><RefreshIcon />
                    </Button>
                    <div className='main_contentInside'>
                        {
                            arbolGenerador &&
                            <Content className="hola" data={rows} linksData={arbolGenerador} />
                        }
                    </div>
                </div >

{/* ------------------------ ÁRBOL GENERADOR ------------------------ */}

            <Button type="button" onClick={ refreshPage }> Recargar la página <span><CachedIcon className='main_reloadIcon' /></span> </Button>

            </div >




            <Content data={rows} linksData={links} />
        </Box >
    )
}


export default Main;
