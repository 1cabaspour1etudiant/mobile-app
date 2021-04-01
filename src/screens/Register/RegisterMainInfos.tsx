import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    Layout,
    Text,
    Input,
    Button,
    CheckBox,
} from '@ui-kitten/components';

import {
    actionRegisterSetAddress,
    actionRegisterSetCity,
    actionRegisterSetFirstname,
    actionRegisterSetLastname,
    actionRegisterSetPhoneNumber,
    actionRegisterSetStatus,
    actionRegisterSetZipCode,
} from './action';

import { useNavigation } from '@react-navigation/core';
import { useNotifiCationModal } from '../../NotificationModal';
import { postUser } from '../../api/User';
import { State, UserRegister } from '../../types';

function selector({
    register: {
        email,
        password,
        tel,
        firstname,
        lastname,
        address,
        city,
        zipCode,
        status,
    },
}: State) {
    return {
        email,
        password,
        tel,
        firstname,
        lastname,
        address,
        city,
        zipCode,
        status,
    };
}

export default function RegisterMainInfos() {
    const {
        email,
        password,
        tel,
        firstname,
        lastname,
        address,
        city,
        zipCode,
        status,
    } = useSelector(selector);
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const {
        showNotification,
        hideNotification,
    } = useNotifiCationModal();

    const [isStudent, setIsStudent] = useState(true);

    const refInputFirstname = useRef(null);
    const refInputLastname = useRef(null);
    const refInputAddress = useRef(null);
    const refInputCity = useRef(null);
    const refInputZipCode = useRef(null);

    const toggleOnChangePhoneNumer = useCallback((phoneNumber) => {
        dispatch(actionRegisterSetPhoneNumber(phoneNumber));
    }, [dispatch]);

    const callbackSubmitEditing = (refInput: any) => {
        return () => {
            const current = refInput.current as any;
            current.focus();
        };
    };

    const toggleOnChangeFirstname = useCallback((firstname) => {
        dispatch(actionRegisterSetFirstname(firstname));
    }, [dispatch]);

    const toggleOnChangeLastname = useCallback((lastname) => {
        dispatch(actionRegisterSetLastname(lastname));
    }, [dispatch]);

    const toggleOnChangeAddress = useCallback((address) => {
        dispatch(actionRegisterSetAddress(address));
    }, [dispatch]);

    const toggleOnChangeCity = useCallback((city) => {
        dispatch(actionRegisterSetCity(city));
    }, [dispatch]);

    const toggleOnChangeZipCode = useCallback((zipCode) => {
        dispatch(actionRegisterSetZipCode(zipCode));
    }, [dispatch]);

    const toggleOnchangeCheckBoxes = useCallback(() => {
        const newIsStudentValue = !isStudent;
        setIsStudent(newIsStudentValue);
        dispatch(actionRegisterSetStatus(newIsStudentValue ? 'Etudiant' : 'Parain'));
    }, [dispatch, isStudent]);

    const toggleOnPressSaveButton = useCallback(() => {
        if (
            firstname === ''
            || lastname === ''
            || tel === ''
            || address === ''
            || zipCode === ''
        ) {
            return;
        }

        showNotification();
        const user: UserRegister = {
            email,
            password,
            firstname,
            lastname,
            tel,
            address,
            city,
            zipCode,
            status,
        };

        postUser(user)
            .then(() => {
                hideNotification();
                navigate('OnBoardingProfilePictureScreen');
            })
            .catch((error) => {
                hideNotification();
                console.log(error);
            });
    }, [
        navigate,
        email,
        password,
        tel,
        firstname,
        lastname,
        address,
        city,
        zipCode,
        status,
    ]);

    return (
        <Layout style={styles.container} level='1'>
            <View style={styles.titleContainer}>
                <Text style={styles.text} category='h1'>Inscrivez-vous</Text>
            </View>
            <View style={styles.formContainer}>
                <Layout style={styles.rowContainer} level='1'>
                    <Input
                        style={styles.input}
                        value={tel}
                        placeholder='Tel'
                        onChangeText={toggleOnChangePhoneNumer}
                        autoFocus={true}
                        returnKeyType='next'
                        onSubmitEditing={callbackSubmitEditing(refInputFirstname)}
                        blurOnSubmit={false}
                        keyboardType={'phone-pad'}
                        autoCompleteType='tel'
                        textContentType='telephoneNumber'
                        dataDetectorTypes='phoneNumber'
                    />
                </Layout>
                <Layout style={styles.rowContainer} level='1'>
                    <Input
                        ref={refInputFirstname}
                        style={styles.input}
                        value={firstname}
                        placeholder='Prenom'
                        onChangeText={toggleOnChangeFirstname}
                        returnKeyType='next'
                        onSubmitEditing={callbackSubmitEditing(refInputLastname)}
                        blurOnSubmit={false}
                        autoCompleteType='username'
                        textContentType='name'
                    />

                    <Input
                        ref={refInputLastname}
                        style={styles.input}
                        value={lastname}
                        placeholder='Nom'
                        onChangeText={toggleOnChangeLastname}
                        returnKeyType='next'
                        onSubmitEditing={callbackSubmitEditing(refInputAddress)}
                        blurOnSubmit={false}
                        autoCompleteType='name'
                        textContentType='name'
                    />
                </Layout>

                <Layout style={styles.rowContainer} level='1'>
                    <Input
                        ref={refInputAddress}
                        style={styles.input}
                        value={address}
                        placeholder='Adresse'
                        onChangeText={toggleOnChangeAddress}
                        returnKeyType='next'
                        onSubmitEditing={callbackSubmitEditing(refInputCity)}
                        blurOnSubmit={false}
                        autoCompleteType='street-address'
                        textContentType='streetAddressLine1'
                        dataDetectorTypes='address'
                    />
                </Layout>

                <Layout style={styles.rowContainer} level='1'>
                    <Input
                        ref={refInputCity}
                        style={styles.input}
                        value={city}
                        placeholder='Ville'
                        onChangeText={toggleOnChangeCity}
                        returnKeyType='next'
                        onSubmitEditing={callbackSubmitEditing(refInputZipCode)}
                        blurOnSubmit={false}
                        textContentType='addressCity'
                    />

                    <Input
                        ref={refInputZipCode}
                        style={styles.input}
                        value={zipCode}
                        placeholder='Code postal'
                        onChangeText={toggleOnChangeZipCode}
                        returnKeyType='done'
                        keyboardType={'numeric'}
                    />
                </Layout>
                <Layout style={styles.rowContainer} level='1'>
                    <View style={styles.checkBoxesContainer}>
                        <CheckBox
                            checked={!isStudent}
                            onChange={toggleOnchangeCheckBoxes}
                        >
                            Parrain
                        </CheckBox>

                        <CheckBox
                            checked={isStudent}
                            onChange={toggleOnchangeCheckBoxes} 
                        >
                            Etudiant
                        </CheckBox>
                    </View>
                </Layout>
                <Button
                    style={styles.button}
                    appearance='ghost'
                    status='basic'
                    onPress={toggleOnPressSaveButton}
                >
                    Enregistrer
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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        flex:1,
        justifyContent:'center',
    },
    formContainer: {
        flex:3,
        justifyContent:'space-around',
    },
    input: {
        flex: 1,
        margin: 2,
    },
    text: {
        margin: 2,
        textAlign: 'center'
    },
    button: {
        margin: 2,
    },
    checkBoxesContainer: {
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
    },
});
