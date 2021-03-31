import React, { useCallback } from 'react';

import { StyleSheet, View } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import InputPassword from '../../components/InputPassword';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { useNotifiCationModal } from '../../NotificationModal';
import { actionForgotPasswordSetNewPassword, actionForgotPasswordSetVerificationCode } from './action';
import { State } from '../../types';
import { postPasswordRecover } from '../../api/Auth';

function selector ({ forgottenPassword }: State) {
    return forgottenPassword;
}

export default function ProvideCodeAndPassword() {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const { showNotification, hideNotification } = useNotifiCationModal();
    const { email, code, password } = useSelector(selector);

    const toggleOnChangeVerificationCode = useCallback((code: string) => {
        dispatch(actionForgotPasswordSetVerificationCode(parseInt(code)));
    }, [dispatch]);

    const toggleOnChangePassword = useCallback((password: string) => {
        dispatch(actionForgotPasswordSetNewPassword(password));
    }, [dispatch]);

    const toggleSendNewPassword = useCallback(() => {
        showNotification();
        postPasswordRecover(email, code, password)
            .then(() => {
                hideNotification();
                navigate('LoginScreen');
            })
            .catch((error) => {
                hideNotification();
                console.log(error);
            });
    }, [navigate, showNotification, hideNotification, email, password, code]);

    return (
        <Layout style={styles.container} level='1'>
            <Text category='h3' style={styles.title}>Reinitialisation</Text>
            <View style={styles.wrapper}>
                <Input
                    placeholder='Code de vérfication'
                    style={styles.input}
                    onChangeText={toggleOnChangeVerificationCode}
                    keyboardType='numeric'
                    maxLength={6}
                />
                <InputPassword
                    value={password}
                    style={styles.input}
                    onChanchValue={toggleOnChangePassword}
                />
                <Button
                    style={styles.button}
                    onPress={toggleSendNewPassword}
                >
                    Envoyer
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
        justifyContent: 'center',
    },
    wrapper: {
        height: '50%',
    },
    title: {
        textAlign: 'center'
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
