import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import * as Notifications from 'expo-notifications';

import LoginScreen from './src/screens/Login/Login';
import MemberSpaceScreen from './src/screens/Private/MemberSpace';
import ForgotPasswordSendCodeScreen from './src/screens/ForgotPassword/ForgotPasswordSendCodeScreen';
import EmailAndPasswordScreen from './src/screens/Register/EmailAndPassword';
import RegisterMainInfosScreen from './src/screens/Register/RegisterMainInfos';
import OnBoardingProfilePictureScreen from './src/screens/Register/OnBoarding/ProfilePicture';
import UpdateProfilePictureScreen from './src/screens/Private/DrawerContent/UpdateProfilePicture';

import Store from './store';
import * as RootNavigation from './RootNavigation';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NofificationContextProvider } from './src/NotificationModal';
import ProvideCodeAndPassword from './src/screens/ForgotPassword/ProvideCodeAndPassword';
import { default as theme } from './theme.json';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldSetBadge: false,
    shouldPlaySound: true,
  }),
});

if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: theme['color-primary-100'],
  });
}

function handleNotification(notification: Notifications.Notification, tap?:boolean) {

}

export default function App() {
  const [loaded, setLoaded]  = useState(false);

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      handleNotification(notification, false);
    });

    // This listener is fired whenever a user taps on or interacts with a notification
    // (works when app is foregrounded, backgrounded, or killed)
    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      handleNotification(response.notification, true);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
  }, [loaded]);

  return (
    <Provider store={Store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <NofificationContextProvider>
        {
          loaded && (
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
                  name="MemberSpaceScreen"
                  component={MemberSpaceScreen}
                />

                <Stack.Screen
                  name="ForgotPasswordSendCodeScreen"
                  component={ForgotPasswordSendCodeScreen}
                />

                <Stack.Screen
                  name="EmailAndPasswordScreen"
                  component={EmailAndPasswordScreen}
                />

                <Stack.Screen
                  name="RegisterMainInfosScreen"
                  component={RegisterMainInfosScreen}
                />

                <Stack.Screen
                  name="OnBoardingProfilePictureScreen"
                  component={OnBoardingProfilePictureScreen}
                />

                <Stack.Screen
                  name="UpdateProfilePictureScreen"
                  component={UpdateProfilePictureScreen}
                />

                <Stack.Screen
                  name='ProvideCodeAndPassword'
                  component={ProvideCodeAndPassword}
                />

              </Stack.Navigator>
            </NavigationContainer>
          )
        }
        </NofificationContextProvider>
      </ApplicationProvider>
    </Provider>
  );
}