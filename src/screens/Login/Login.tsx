import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Layout } from '@ui-kitten/components';
import InputPassword from '../../components/InputPassword';
import { useDispatch, useSelector } from 'react-redux';
import { actionClearLogin, actionLoginSetEmail, actionLoginSetPassword } from './action';
import { Text, Button } from '@ui-kitten/components';
import { postLogin } from '../../api/Auth';
import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNotifiCationModal } from '../../NotificationModal';
import { getUserMeHasGodfather, getUserMeInfos, getUserMeProfilePicture } from '../../api/User';
import { actionPrivateUserSetHasGodfather, actionPrivateUserSetInfos, actionPrivateUserSetProfilePicture } from '../Private/user.action';

const selector = ({ login:{ email = '', password = '' } }) => ({ email, password });

export default function LoginScreen() {
  const inputRef = useRef(null);
  const { email, password } = useSelector(selector);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [connectionFailed, setConnectionFailed] = useState(false);

  const { showNotification, hideNotification } = useNotifiCationModal();

  const toggleEmailSubmitEditing = useCallback(() => {
    if (inputRef.current) {
      const current = inputRef.current as any;
      current.focus();
    }
  }, []);

  const toggleChangeEmail = useCallback((email: string) => {
    dispatch(actionLoginSetEmail(email));
  }, [dispatch]);

  const toggleChangePassword = useCallback((password: string) => {
    dispatch(actionLoginSetPassword(password));
  }, [dispatch]);

  const toggleConnexion = useCallback(() => {
    showNotification();
    postLogin(email, password)
      .then(async () => {
        const [
          userMeInfos,
          userMeProfilePicture,
          hasGodfather,
        ] = await Promise.all([
          getUserMeInfos(),
          getUserMeProfilePicture()
          .catch((error) => {
            console.log(error);
            return '';
          }),
          getUserMeHasGodfather(),
        ]);

        dispatch(actionPrivateUserSetInfos(userMeInfos));
        dispatch(actionPrivateUserSetProfilePicture(userMeProfilePicture));
        dispatch(actionPrivateUserSetHasGodfather(hasGodfather));
      })
      .then(() => {
        if (connectionFailed) {
          setConnectionFailed(false);
        }
        navigate("MemberSpaceScreen");
        dispatch(actionClearLogin());
      })
      .catch((error) => {
        setConnectionFailed(true);
        console.log(error);
      })
      .finally(() => {
        hideNotification();
      });
  }, [email, password]);

  const toggleIscription = useCallback(() => {
    navigate('EmailAndPasswordScreen');
  }, [navigate]);

  const toggleForgotPassword = useCallback(() => {
    navigate('ForgotPasswordSendCodeScreen');
  }, [navigate]);

  return (
    <Layout style={styles.container} level='1'>
      <View style={styles.titleContainer}>
        <Text style={styles.text} category='h1'>Connectez-vous</Text>
      </View>

      <View style={{ flex:2 }}>
        {
          connectionFailed && (
            <Text style={styles.text} status='danger'>Email ou mot de passe incorrect</Text>
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
          keyboardType='email-address'
          textContentType='emailAddress'
          autoCompleteType='email'
        />

        <InputPassword
          ref={inputRef}
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
