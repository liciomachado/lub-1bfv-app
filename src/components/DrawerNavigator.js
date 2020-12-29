import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'

import Home from '../pages/home';
import Sobre from '../pages/sobre';

const Drawer = createDrawerNavigator();


export default props = () => {
    return (
        <Drawer.Navigator >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Sobre" component={Sobre} />
        </Drawer.Navigator>
    )
}