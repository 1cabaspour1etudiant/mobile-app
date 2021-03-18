import React from 'react';
import {
    BottomNavigation,
    BottomNavigationTab,
} from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';

import { useLeaveApp } from '../hooks';
import SearchTab from './SearchTab';
import GodefatherTab from './GodefatherTab';
import ProfileTab from './ProfileTab';

const { Navigator, Screen } = createBottomTabNavigator();

function BottomTabBar(props: any) {
    const { navigation, state} = props;

    return (
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}
        >
            <BottomNavigationTab title='Recherche' />
            <BottomNavigationTab title='Parrain'/>
            <BottomNavigationTab title='Profil'/>
        </BottomNavigation>
    );
}

export default function MemberSpace() {
    useLeaveApp();
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 25 }}>
            <Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Screen name='Recherche' component={SearchTab}/>
            <Screen name='Parrain' component={GodefatherTab}/>
            <Screen name='Profil' component={ProfileTab}/>
            </Navigator>
        </SafeAreaView>
    );
}
