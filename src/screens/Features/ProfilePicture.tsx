import React, { useCallback, useState } from 'react';

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  launchCameraAsync,
} from 'expo-image-picker';

import Modal from 'react-native-modal';

import { Button, Text, Icon, Layout } from '@ui-kitten/components';

import {default as theme} from '../../../theme.json';

type ProfilePictureProps = {
    imageUri: string;
    onPictureProvided: (imageUri:string, base64: string) => void;
    onEnd: () => void;
    title: string;
};

export default function ProfilePicture ({
    imageUri = '',
    onPictureProvided = (imageUri:string, base64: string) => {},
    onEnd = () => {},
    title = 'Changez votre photo de profil',
}: ProfilePictureProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const toggleGaleryPhoto = useCallback(async () => {
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
      });

      if (!result.cancelled) {
        onPictureProvided(result.uri, result.base64 as string);
        setModalVisible(false);
      }
    } catch (E) {
      console.log(E);
    }
  }, []);

  const toggleCamera = useCallback(async () => {
    try {
      const result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
      });

      if (!result.cancelled) {
        onPictureProvided(result.uri, result.base64 as string);
        setModalVisible(false);
      }
    } catch (E) {
      console.log(E);
    }
  }, []);

  const toggleBackModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <Layout style={{ flex: 1, paddingRight: 15, paddingLeft: 15 }} level='1'>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.pictureContainer}>
          <TouchableOpacity onPress={showModal}>
            <View style={styles.pictureHandler}>
              {
                imageUri ? (
                  <Image
                    style={styles.pictureImage}
                    source={{ uri: imageUri }}
                    borderRadius={80}
                  />
                )
                  : (
                    <Icon
                        fill='#FFF'
                        style={{ width: 64, height: 64 }}
                        name='camera-outline'
                    />
                  )
              }
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={modalVisible}
        onBackButtonPress={toggleBackModal}
        onBackdropPress={toggleBackModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver
        backdropColor="#151515"
      >
        <View style={styles.modalContainer}>
            <Button
                style={{ marginBottom: 20 }}
                onPress={toggleCamera}
            >
            Prendre une photo
          </Button>
          <Button onPress={toggleGaleryPhoto}>
            Choisir un photo existante
          </Button>
        </View>
      </Modal>
      {
        imageUri ? (
            <Button
                onPress={onEnd}
                style={{ marginTop: 15 }}
            >
                Valider
            </Button>
        ) : (<></>)
      }
    </Layout>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      lineHeight: 35,
      letterSpacing: 0.02,
    },
    pictureContainer: {
      marginTop: 50,
      width: 250,
      height: 250,
      borderRadius: 250,
      borderWidth: 1,
      borderColor: theme['color-primary-700'],
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pictureHandler: {
      width: 150,
      height: 150,
      borderRadius: 80,
      backgroundColor: theme['color-primary-700'],
      justifyContent: 'center',
      alignItems: 'center',
    },
    pictureImage: {
      width: 160,
      height: 160,
    },
    modalContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
  });
