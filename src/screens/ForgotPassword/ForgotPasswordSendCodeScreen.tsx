import React from 'react';
import { Layout, Text, Input, Button, } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

export default function ForgotPasswordSendCodeScreen() {

    return (
        <Layout style={styles.container}>
            <View style={styles.wrapper}>
                <Text category='h5' style={styles.title}>Réinitialiser votre mot de passe</Text>
                <Text category='h6' style={styles.subTitle}>Recevoir un code de reinitialisation</Text>
                <Input
                    style={styles.input}
                    placeholder='Email'
                    keyboardType='email-address'
                />

                <Button
                    style={styles.input}
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