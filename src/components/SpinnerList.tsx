import React from 'react';
import { Spinner } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
  },
});

const SpinnerList = ({ style = {} }) => (
    <View style={styles.indicator}>
        <Spinner
            size='giant'
            style={{ ...style }}
        />
    </View>
);

export default SpinnerList;
