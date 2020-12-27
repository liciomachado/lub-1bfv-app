import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import Login from './src/pages/login';
import Home from './src/pages/home';
import CheckList from './src/pages/checkList'
import Finish from './src/pages/finish';
import Sobre from './src/pages/sobre';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="CheckList" component={CheckList} />
        <Stack.Screen name="Finish" component={Finish} options={{ headerShown: false }} />
        <Stack.Screen name="Sobre" component={Sobre} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

