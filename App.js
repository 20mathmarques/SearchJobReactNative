import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const Stack = createNativeStackNavigator();

const Navigator = () => {

  const isLoggedIn = true

  return (

    isLoggedIn ? (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    )

  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  )
};

export default App;