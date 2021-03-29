import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { putUserMePicture } from '../../../api/User';
import { useNotifiCationModal } from '../../../NotificationModal';
import ProfilePicture from '../../Features/ProfilePicture';
import { actionPrivateUserSetProfilePicture } from '../user.action';

export default function UpdateProfilePicture() {
    const [imageUri, setImageUri] = useState('');
    const [imageBase64, setImageBase64] = useState('');

    const {
        showNotification,
        hideNotification,
    } = useNotifiCationModal();

    const dispatch = useDispatch();
    const { navigate } = useNavigation();

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
        <ProfilePicture
            title='Changez votre photo de profil'
            imageUri={imageUri}
            onEnd={toggleOnEnd}
            onPictureProvided={toggleOnPictureProvided}
        />
    );
}
