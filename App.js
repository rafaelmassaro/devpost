import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import AuthProider from './src/contexts/auth'

import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProider>
        <StatusBar
          backgroundColor="#36393f"
          barStyle="lightContent"
          translucent={false}
        />
        
        <Routes />
      </AuthProider>
    </NavigationContainer>
  );
}
