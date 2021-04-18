import React from 'react';
import { Box } from '@material-ui/core';
import Content from './Content';
import Menu from './Menu';

const Main = () => {

    return (
        <Box display='flex'>
            <Menu />
            <Content />
        </Box>
    )
}

export default Main;