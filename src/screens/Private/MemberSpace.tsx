import React from 'react';
import {
    BottomNavigation,
    BottomNavigationTab,
} from '@ui-kitten/components';
import { BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';

import { useLeaveApp, useUserStatus } from '../hooks';
import SearchTab from './SearchTab/SearchTab';
import GodefatherTab from './GodfatherTab/GodefatherTab';
import GodsonTab from './GodsonTab/GodsonTab';
import ProfileTab from './ProfileTab/ProfileTab';
import RequestsTab from './RequestsTab/RequestsTab';

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

export default function MemberSpace() {
    useLeaveApp();
    const status = useUserStatus();
    let relationScreen;

    if (status === 'godson') {
        relationScreen = <Screen name='Parrain' component={GodefatherTab}/>
    } else {
        relationScreen = <Screen name='Filleuls' component={GodsonTab}/>
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Screen name='Recherche' component={SearchTab}/>
            {relationScreen}
            <Screen name='Demandes' component={RequestsTab}/>
            <Screen name='Profil' component={ProfileTab}/>
            </Navigator>
        </SafeAreaView>
    );
}
