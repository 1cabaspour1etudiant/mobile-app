import React from 'react';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import LoginScreen from './screens/Login/Login';

import Store from './store';
import * as RootNavigation from './RootNavigation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer ref={RootNavigation.navigationRef}>
        <Stack.Navigator
          screenOptions={{
            animationEnabled: true,
            cardStyle: { backgroundColor: '#151515' },
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}