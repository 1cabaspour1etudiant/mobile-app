import React, { useCallback } from 'react';
import { Layout, Text, Input, Button, } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { actionForgotPasswordSetEmail } from './action';
import { useNotifiCationModal } from '../../NotificationModal';
import { useNavigation } from '@react-navigation/core';

export default function ForgotPasswordSendCodeScreen() {
    const { showNotification, hideNotification } = useNotifiCationModal();
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const toggleOnChangeEmailAddress = useCallback((email: string) => {
        dispatch(actionForgotPasswordSetEmail(email));
    }, [dispatch]);

    const toggleSendRequestForRecoveryCode = useCallback(() => {
        navigate('ProvideCodeAndPassword');
    }, [showNotification, hideNotification, navigate]);

    return (
        <Layout style={styles.container}>
            <View style={styles.wrapper}>
                <Text category='h5' style={styles.title}>Réinitialiser votre mot de passe</Text>
                <Text category='h6' style={styles.subTitle}>Recevoir un code de reinitialisation</Text>
                <Input
                    style={styles.input}
                    placeholder='Email'
                    keyboardType='email-address'
                    onChangeText={toggleOnChangeEmailAddress}
                />

                <Button
                    style={styles.input}
                    onPress={toggleSendRequestForRecoveryCode}
                >
                    Envoyer
                </Button>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    wrapper: {
        height: '50%',
    },
    title: {

    },
    subTitle: {
        marginTop: 15,
    },
    input: {
        marginTop: 15,
    },
    button: {
        marginTop: 15,
    },
});