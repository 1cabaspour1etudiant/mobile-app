import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Icon, TopNavigationAction } from '@ui-kitten/components';

function BackIcon(props: any) {
    return (
        <Icon {...props} name='arrow-back'/>
    )
}

export default function BackAction({ backScreen = '' }) {
    const { navigate } = useNavigation();

    const togglePressBack = useCallback(() => {
        navigate(backScreen);
    }, [navigate, backScreen]);

    return (
        <TopNavigationAction
            onPress={togglePressBack}
            icon={BackIcon}
        />
    );
};

