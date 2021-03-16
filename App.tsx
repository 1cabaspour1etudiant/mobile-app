import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import LoginScreen from './src/screens/Login/Login';
import RegisterScreen from './src/screens/Register/Register';
import MemberSpaceScreen from './src/screens/Private/MemberSpace';
import ForgotPasswordSendCodeScreen from './src/screens/ForgotPassword/ForgotPasswordSendCodeScreen';

import Store from './store';
import * as RootNavigation from './RootNavigation';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const Stack = createStackNavigator();

export default function App() {
  const [loaded, setLoaded]  = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
  }, [loaded]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {
          loaded && (
            <Provider store={Store}>
              <NavigationContainer ref={RootNavigation.navigationRef}>
                <Stack.Navigator
                  screenOptions={{
                    animationEnabled: true,
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                >
                  <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                  />

                  <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                  />

                  <Stack.Screen
                    name="MemberSpaceScreen"
                    component={MemberSpaceScreen}
                  />

                  <Stack.Screen
                    name="ForgotPasswordSendCodeScreen"
                    component={ForgotPasswordSendCodeScreen}
                  />

                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
          )
        }
      </ApplicationProvider>
    </>
  );
}