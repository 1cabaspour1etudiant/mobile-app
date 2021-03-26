import React from 'react';
import {
    BottomNavigation,
    BottomNavigationTab,
} from '@ui-kitten/components';
import { BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useLeaveApp, useUserStatus } from '../hooks';
import SearchTab from './SearchTab/SearchTab';
import GodefatherTab from './GodfatherTab/GodefatherTab';
import GodsonTab from './GodsonTab/GodsonTab';
import ProfileTab from './ProfileTab/ProfileTab';
import RequestsTab from './RequestsTab/RequestsTab';
import {default as theme} from '../../../theme.json';

const Drawer = createDrawerNavigator();
const { Navigator, Screen } = createBottomTabNavigator();

function BottomTabBar({ navigation, state}: BottomTabBarProps<BottomTabBarOptions>) {
    const onSelect = React.useCallback(
        (index) => navigation.navigate(state.routeNames[index]),
    []);

    const status = useUserStatus();
    return (
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={onSelect}
        >
            <BottomNavigationTab title='Recherche' />
            <BottomNavigationTab title={status === 'godson' ? 'Parrain' : 'Filleuls' }/>
            <BottomNavigationTab title='Demandes'/>
            <BottomNavigationTab title='Profil'/>
        </BottomNavigation>
    );
}

function TabBarContainer() {
    useLeaveApp();
    const status = useUserStatus();
    let relationScreen;

    if (status === 'godson') {
        relationScreen = <Screen name='Parrain' component={GodefatherTab}/>
    } else {
        relationScreen = <Screen name='Filleuls' component={GodsonTab}/>
    }

    return (
        <Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Screen name='Recherche' component={SearchTab}/>
            {relationScreen}
            <Screen name='Demandes' component={RequestsTab}/>
            <Screen name='Profil' component={ProfileTab}/>
        </Navigator>
    );
}

function DrawerContent() {
    return (
        <></>
    );
}

export default function MemberSpace() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Drawer.Navigator
                initialRouteName="TabBarContainer"
                overlayColor={theme['color-primary-transparent-600']}
                edgeWidth={25}
                drawerContent={(props:any) => <DrawerContent {...props} />}
            >
                <Drawer.Screen name="TabBarContainer" component={TabBarContainer} />
            </Drawer.Navigator>
        </SafeAreaView>
    );
}
