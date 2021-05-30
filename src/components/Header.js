import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom';
const Header = () => (
    <AppBar position='static'>
        <Toolbar className='header_header'>
            <Link to='/'>
                <h3 className='header_title'>App Grafos</h3>
            </Link>
            <div className='initalPage_item'>
                <Link to='/documentacion'>
                    DOCUMENTACIÓN
                </Link>
            </div>
            
        </Toolbar>


    </AppBar>

)

export default Header;
