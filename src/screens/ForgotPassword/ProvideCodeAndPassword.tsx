import React, {} from 'react';

import { StyleSheet, View } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import InputPassword from '../../components/InputPassword';

export default function ProvideCodeAndPassword() {
    return (
        <Layout style={styles.container} level='1'>
            <Text category='h3' style={styles.title}>Reinitialisation</Text>
            <View style={styles.wrapper}>
                <Input
                    placeholder='Code de vérfication'
                    style={styles.input}
                />
                <InputPassword
                    style={styles.input}
                />
                <Button style={styles.button}>
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
