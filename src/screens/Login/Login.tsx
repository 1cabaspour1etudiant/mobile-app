import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Layout } from '@ui-kitten/components';
import InputPassword from '../../components/InputPassword';
import { useDispatch, useSelector } from 'react-redux';
import { actionLoginSetEmail, actionLoginSetPassword } from './action';
import { Text, Button } from '@ui-kitten/components';

const selector = ({ login:{ email = '', password = '' } }) => ({ email, password });

export default function LoginScreen() {
  const { email, password } = useSelector(selector);
  const dispatch = useDispatch();

  const toggleChangeEmail = useCallback((email: string) => {
    dispatch(actionLoginSetEmail(email));
  }, [dispatch]);

  const toggleChangePassword = useCallback((password: string) => {
    dispatch(actionLoginSetPassword(password));
  }, [dispatch]);

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
          <Button style={styles.button} appearance='ghost' status='basic'>
            Connexion
          </Button>
          <Button style={styles.button} appearance='ghost' status='basic'>
            Inscription
          </Button>
        </View>
        <Text style={styles.text} category='h6'>Mot de passe oublié ?</Text>
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
