import React, { useCallback } from 'react';

import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';

import { Layout, Button, Text, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { actionLogOut } from '../../token.action';
import { useUserInfos, useUserProfilePicture } from '../../hooks';
import {default as theme} from '../../../../theme.json';

export default function DrawerContent() {
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const userInfos = useUserInfos();
    const profilePicture = useUserProfilePicture();

    const toggleOnPressLogOutButton = useCallback(() => {
        dispatch(actionLogOut());
        navigate('LoginScreen');
    }, [navigate, dispatch]);

    const togglePressProfilePicture = useCallback(() => {
        navigate('UpdateProfilePictureScreen');
    }, []);

    return (
        <Layout style={styles.container} level='1'>
            <View style={styles.topSection}>
                <TouchableWithoutFeedback onPress={togglePressProfilePicture}>
                {
                    profilePicture === '' ? (
                        <Icon
                            fill={theme['color-primary-700']}
                            name='person-outline'
                            style={styles.pictureProfile}
                        />
                    ) : (
                        
                            <Image
                                source={{ uri:`data:;base64, ${profilePicture}` }}
                                style={styles.pictureProfile}
                            />
                    )
                }
                </TouchableWithoutFeedback>
                <View style={styles.fullnameContainer}>
                    <Text category='h5'>{userInfos.firstname}</Text>
                    <Text category='h5'>{userInfos.lastname}</Text>
                </View>
            </View>
            <View style={styles.bottomSection}>
                <Button
                    style={styles.logOutButton}
                    appearance='outline'
                    status='primary'
                    onPress={toggleOnPressLogOutButton}
                >
                    Se deconnecter
                </Button>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
    },
    topSection: {
        flex: 3,
        alignItems: 'center'
    },
    pictureProfile: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    fullnameContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 120,
    },
    bottomSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    logOutButton: {
        marginBottom:15,
    },
});
