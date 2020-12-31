import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer'

import Login from './src/pages/login';
import Home from './src/pages/home';
import CheckList from './src/pages/checkList'
import Finish from './src/pages/finish';
import Sobre from './src/pages/sobre';
import NewMaquina from './src/pages/NewMaquina';
import CameraView from './src/components/CameraView';

import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function stacks() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="CheckList" component={CheckList} />
      <Stack.Screen name="Finish" component={Finish} options={{ headerShown: false }} />
      <Stack.Screen name="Sobre" component={Sobre} />
    </Stack.Navigator>
  )
}

function logout({ navigation }) {
  AsyncStorage.removeItem('usuario_logado')
  AsyncStorage.removeItem('Authorization')
  delete axios.defaults.headers.common['Authorization']
  navigation.navigate('Login')
  return (
    stacks()
  )
}

const mainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="CheckList" component={CheckList} />
        <Stack.Screen name="Finish" component={Finish} options={{ headerShown: false }} />
        <Stack.Screen name="Sobre" component={Sobre} />
        <Stack.Screen name="Camera" component={CameraView} />
        <Stack.Screen name="NewMaquina" component={NewMaquina} options={{title: 'Nova Maquina'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default mainStack

