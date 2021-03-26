import React, { useCallback } from 'react';

import { StyleSheet } from 'react-native';

import { Layout, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { actionLogOut } from '../../token.action';

export default function DrawerContent() {
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const toggleOnPressLogOutButton = useCallback(() => {
        dispatch(actionLogOut());
        navigate('LoginScreen');
    }, [navigate, dispatch]);

    return (
        <Layout style={styles.container} level='1'>
            <Button
                style={styles.logOutButton}
                appearance='outline'
                status='primary'
                onPress={toggleOnPressLogOutButton}
            >
                Se deconnecter
            </Button>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    logOutButton: {
        marginBottom:15,
    },
});
