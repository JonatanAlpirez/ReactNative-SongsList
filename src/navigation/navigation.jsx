import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Top10 from '../componets/Main';
import Profile from '../componets/profile'
import Playing from '../componets/Playing';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return(
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Top10" screenOptions={{headerShown: false}}>
      <Stack.Screen name='Top10' component={Top10} />
      <Stack.Screen name='Playing' component={Playing} />
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
    </NavigationContainer>

    
  )
};

export default MainStack;
