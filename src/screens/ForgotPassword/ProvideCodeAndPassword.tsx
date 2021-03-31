import React, {} from 'react';

import { StyleSheet, View } from 'react-native';
import { Layout, Input } from '@ui-kitten/components';
import InputPassword from '../../components/InputPassword';

export default function ProvideCodeAndPassword() {
    return (
        <Layout style={styles.container} level='1'>
            <View style={styles.wrapper}>
                <Input
                    placeholder='Code de vérfication'
                />
                <InputPassword
                    
                />
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        height: '50%',
    },
});
