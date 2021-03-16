import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Layout, Text, Button } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import InputPassword from '../../components/InputPassword';
import { actionRegisterSetEmail, actionRegisterSetPassword } from './action';

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
    const [emailValide, setEmailValide] = useState(true);

    const toggleChangeEmail = useCallback((email) => {
        dispatch(actionRegisterSetEmail(email));
    }, [dispatch]);

    const toggleEmailSubmitEditing = useCallback(() => {
        if (inputRef) {
            const current = inputRef.current as any;
            current.focus();
        }
    }, []);

    const toggleChangePassword = useCallback((password) => {
        dispatch(actionRegisterSetPassword(password));
    }, []);

    const goToMainInfos = useCallback(() => {
        navigate('RegisterMainInfosScreen');
    }, [navigate]);

    return (
        <Layout style={styles.container} level='1'>
            <View style={styles.titleContainer}>
                <Text style={styles.text} category='h1'>Inscriver vous</Text>
            </View>
            <View style={{ flex:2 }}>
                {
                    !emailValide && (
                        <Text
                            style={styles.text}
                            status='danger'
                        >
                            Cette adresse email n'est pas disponible
                        </Text>
                    )
                }

                <Input
                    style={styles.input}
                    value={email}
                    placeholder='Email adress'
                    onChangeText={toggleChangeEmail}
                    autoFocus={true}
                    returnKeyType='next'
                    onSubmitEditing={toggleEmailSubmitEditing}
                    blurOnSubmit={false}
                />

                <InputPassword
                    ref={inputRef}
                    onChanchValue={toggleChangePassword}
                    value={password}
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
