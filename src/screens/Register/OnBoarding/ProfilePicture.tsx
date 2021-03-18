import React, { useCallback, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native'
import { Layout, Text, Button, Icon } from '@ui-kitten/components';

import {
    MediaTypeOptions,
    launchCameraAsync,
} from 'expo-image-picker';

import { putUserMePicture } from '../../../api/User';
import { useLoginForTest } from '../../hooks';
import { useNavigation } from '@react-navigation/core';
import { useNotifiCationModal } from '../../../NotificationModal';

export default function ProfilePicture() {
    const [image, setImage] = useState('');
    useLoginForTest();

    const { navigate } = useNavigation();
    const {
        showNotification,
        hideNotification,
    } = useNotifiCationModal();

    const toggleCamera = useCallback(async () => {
        try {
          const result = await launchCameraAsync({
            mediaTypes: MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
    
          if (!result.cancelled) {
            setImage(result.uri);
          }
        } catch (E) {
          console.log(E);
        }
    }, []);

    const toggleOnPressSendButton = useCallback(() => {
        showNotification();
        putUserMePicture(image)
            .then(() => {   
                hideNotification();
                navigate('MemberSpaceScreen');
            })
            .catch((error) => {
                hideNotification();
                console.log(error);
            });
    }, [image, navigate, showNotification, hideNotification]);

    return (
        <Layout style={styles.container} level='1'>
            <View style={styles.titleContainer}>
                <Text style={styles.text} category='h1'>Renseignez votre photo de profil</Text>
            </View>
            <View style={styles.screenBody}>
                <TouchableWithoutFeedback
                    onPress={toggleCamera}
                >
                    <View style={styles.buttonPicture}>
                        {
                            image === '' ? (
                                <Icon
                                    style={styles.icon}
                                    fill='#8F9BB3'
                                    name='camera-outline'
                                />
                            ) : (
                                <Image source={{ uri: image }} style={styles.image} />
                            )
                        }
                    </View>
                </TouchableWithoutFeedback>

                <Button
                    appearance='ghost'
                    status='basic'
                    onPress={toggleOnPressSendButton}
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
        paddingRight: 15
    },
    titleContainer: {
        flex:1,
        justifyContent:'center',
    },
    text: {
        margin: 2,
        textAlign: 'center'
    },
    screenBody: {
        flex: 3,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15
    },
    buttonPicture: {
        width:250,
        borderColor: '#8F9BB3',
        borderWidth: 1,
        height: 250,
        borderRadius: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width:250,
        height: 250,
        borderRadius: 250,
    },
    icon: {
        width: 100,
        height: 100,
    },
});
