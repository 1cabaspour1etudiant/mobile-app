import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native'
import { Layout } from '@ui-kitten/components';

import { putUserMePicture } from '../../../api/User';
import { useLoginForTest } from '../../hooks';
import { useNavigation } from '@react-navigation/core';
import { useNotifiCationModal } from '../../../NotificationModal';
import { useDispatch } from 'react-redux';
import { actionPrivateUserSetProfilePicture } from '../../Private/user.action';
import ProfilePicture from '../../Features/ProfilePicture';

export default function OnBoardingProfilePicture() {
    const [imageUri, setImageUri] = useState('');
    const [imageBase64, setImageBase64] = useState('');

    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const {
        showNotification,
        hideNotification,
    } = useNotifiCationModal();

    const toggleOnPictureProvided = useCallback((imageUri: string, imageBase64: string) => {
        setImageUri(imageUri);
        setImageBase64(imageBase64);
    }, []);

    const toggleOnEnd = useCallback(() => {
        showNotification();
        putUserMePicture(imageUri)
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                hideNotification();
                dispatch(actionPrivateUserSetProfilePicture(imageBase64));
                navigate('MemberSpaceScreen');
            });
    }, [
        imageUri,
        imageBase64,
        showNotification,
        hideNotification,
        dispatch,
        navigate,
    ]);

    return (
        <Layout style={styles.container} level='1'>
            <ProfilePicture
                title='Renseignez votre photo de profil'
                imageUri={imageUri}
                onEnd={toggleOnEnd}
                onPictureProvided={toggleOnPictureProvided}
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15
    },
});
