// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/home';
import Calendario from './components/calendario';
import CanchaDetalle from './components/canchadetalle';


const Stack = createNativeStackNavigator();



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" options={{headerShown: false}} component={Home} /> */}
        {/* <Stack.Screen name="Calendario" options={{headerShown: false}} component={Calendario} /> */}
        <Stack.Screen name="CanchaDetalle" options={{headerShown: false}} component={CanchaDetalle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;