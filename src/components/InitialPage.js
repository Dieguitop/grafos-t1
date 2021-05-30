import React from 'react'
import { Link } from 'react-router-dom'

const InitialPage = () => {
    return (
        <div className='initialPage_container'>
            <div className='initalPage_item'>
                <Link to='/dirigido'>
                    DIRIGIDO
            </Link>
            </div>
            <div className='initalPage_item'>
                <Link to='/no-dirigido'>
                    NO DIRIGIDO
            </Link>
            </div>

            <div className='initalPage_item'>
                <Link to='/documentacion'>
                    DOCUMENTACIÓN
                </Link>
            </div>

        </div>
    )
}

export default InitialPage;
