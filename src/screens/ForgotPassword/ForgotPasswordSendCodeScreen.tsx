import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export default function ForgotPasswordSendCodeScreen() {
    return (
        <Layout style={styles.container}>
            <Text category='h5'>Mot de passe oublié: envoi de code</Text>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});