import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Layout } from '@ui-kitten/components';
import InputPassword from '../../components/InputPassword';
import { useDispatch, useSelector } from 'react-redux';
import { actionClearLogin, actionLoginSetEmail, actionLoginSetPassword } from './action';
import { Text, Button } from '@ui-kitten/components';
import { postLogin } from '../../api/Auth';
import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const selector = ({ login:{ email = '', password = '' } }) => ({ email, password });

export default function LoginScreen() {
  const { email, password } = useSelector(selector);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const toggleChangeEmail = useCallback((email: string) => {
    dispatch(actionLoginSetEmail(email));
  }, [dispatch]);

  const toggleChangePassword = useCallback((password: string) => {
    dispatch(actionLoginSetPassword(password));
  }, [dispatch]);

  const toggleConnexion = useCallback(() => {
    postLogin(email, password)
      .then((access_token: string) => {
        console.log(access_token);
        navigate("MemberSpaceScreen");
        dispatch(actionClearLogin());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email, password, navigate]);

  const toggleIscription = useCallback(() => {
    navigate('RegisterScreen');
  }, [navigate]);

  const toggleForgotPassword = useCallback(() => {
    navigate('ForgotPasswordSendCodeScreen');
  }, [navigate]);

  return (
    <Layout style={styles.container} level='1'>
      <View style={styles.titleContainer}>
        <Text style={styles.text} category='h1'>Connectez vous</Text>
      </View>

      <View style={{ flex:2 }}>
        <Input
          style={styles.input}
          value={email}
          placeholder='Email adress'
          onChangeText={toggleChangeEmail}
        />

        <InputPassword
          onChanchValue={toggleChangePassword}
          value={password}
        />
  
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            appearance='ghost'
            status='basic'
            onPress={toggleConnexion}
          >
            Connexion
          </Button>
          <Button
            style={styles.button}
            appearance='ghost'
            status='basic'
            onPress={toggleIscription}
          >
            Inscription
          </Button>
        </View>
        <TouchableWithoutFeedback onPress={toggleForgotPassword}>
          <Text style={styles.text} category='h6'>Mot de passe oublié ?</Text>
        </TouchableWithoutFeedback>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    margin: 2,
  },
  button: {
    margin: 2,
  },
  text: {
    margin: 2,
    textAlign: 'center'
  },
});
