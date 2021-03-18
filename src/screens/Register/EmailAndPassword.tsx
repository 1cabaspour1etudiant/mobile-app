import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Layout, Text, Button } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import InputPassword from '../../components/InputPassword';
import { actionRegisterSetEmail, actionRegisterSetPassword } from './action';
import { getUserEmailIsAvailable } from '../../api/User';

const selector = ({
    register: {
        email = '',
        password = ''
    },
}) => ({ email, password });

export default function EmailAndPassword() {
    const inputRef = useRef(null);
    const { email, password } = useSelector(selector);
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const [emailPatternIsValid, setEmailPatternIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [emailIsAvailable, setEmailIsAvailable] = useState(true);

    const toggleChangeEmail = useCallback((email) => {
        getUserEmailIsAvailable(email)
            .then((emailIsAvailable: boolean) => {
                setEmailIsAvailable(emailIsAvailable);
                setEmailPatternIsValid(true);
            })
            .catch(() => {
                setEmailPatternIsValid(false);
            });
        dispatch(actionRegisterSetEmail(email));
    }, [dispatch]);

    const toggleEmailSubmitEditing = useCallback(() => {
        if (inputRef) {
            const current = inputRef.current as any;
            current.focus();
        }
    }, []);

    const toggleChangePassword = useCallback((password: string) => {
        const passwordIsValid = (
            /[A-Z]/.test(password)
            && /[0-9]/.test(password)
            && /(?=.{8,32})/.test(password)
        );

        setPasswordIsValid(passwordIsValid);
        dispatch(actionRegisterSetPassword(password));
    }, []);

    const goToMainInfos = useCallback(() => {
        if (emailPatternIsValid && passwordIsValid && emailIsAvailable) {
            navigate('RegisterMainInfosScreen');
        }
    }, [
        emailPatternIsValid,
        passwordIsValid,
        emailIsAvailable,
        navigate,
    ]);

    return (
        <Layout style={styles.container} level='1'>
            <View style={styles.titleContainer}>
                <Text style={styles.text} category='h1'>Inscrivez-vous</Text>
            </View>
            <View style={{ flex:2 }}>
                {
                    !emailIsAvailable && (
                        <Text
                            style={styles.text}
                            status='danger'
                        >
                            Cette adresse email n'est pas disponible
                        </Text>
                    )
                }

                {
                    !passwordIsValid && (
                        <>
                            <Text style={styles.text} status='danger'>Votre mot de passe doit avoir au moins:</Text>
                            <Text style={styles.text} status='danger'>- Une majuscule</Text>
                            <Text style={styles.text} status='danger'>- Huit characteres</Text>
                            <Text style={styles.text} status='danger'>- Un chiffre</Text>
                        </>
                    )
                }

                <Input
                    style={styles.input}
                    value={email}
                    placeholder='Adresse email'
                    onChangeText={toggleChangeEmail}
                    autoFocus={true}
                    returnKeyType='next'
                    onSubmitEditing={toggleEmailSubmitEditing}
                    blurOnSubmit={false}
                    status={ emailPatternIsValid || email === '' ? 'primary' : 'danger' }
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoCompleteType='email'
                />

                <InputPassword
                    ref={inputRef}
                    onChanchValue={toggleChangePassword}
                    value={password}
                    status={ passwordIsValid || password === '' ? 'primary' : 'danger' }
                />

                <Button 
                    style={styles.button}
                    appearance='ghost'
                    status='basic'
                    onPress={goToMainInfos}
                >
                    Suivant
                </Button>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    titleContainer: {
        flex:1,
        justifyContent:'center',
    },
    input: {
        margin: 2,
    },
    text: {
        margin: 2,
        textAlign: 'center'
    },
    button: {
        margin: 2,
    },
});
