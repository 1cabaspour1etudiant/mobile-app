import { Spinner } from '@ui-kitten/components';
import React from 'react';

import { View, StyleSheet } from 'react-native';

export default function LoadingIndicator (props: any) {
    return (
        <View style={[props.style, styles.indicator]}>
            <Spinner size='small'/>
        </View>
    );
}

const styles = StyleSheet.create({
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
