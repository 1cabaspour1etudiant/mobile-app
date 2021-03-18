import { useEffect, useState, useCallback } from 'react';
import {userTestEmail, userTestPassword} from '@env';
import { postLogin } from '../api/Auth';
import { Platform, BackHandler } from 'react-native';

export function useLoginForTest() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if (!isLoggedIn) {
            postLogin(userTestEmail, userTestPassword)
                .then(() => {
                    setIsLoggedIn(true);
                });
        }
    }, [isLoggedIn]);

    return isLoggedIn;
}

/**
 * @desc Leave the app after 2 taps when using this hook on a screen
 */
 export function useLeaveApp() {
    if (Platform.OS === 'android') {
      const [counter, setCounter] = useState(0);
  
      const handler = useCallback(() => {
        setTimeout(() => {
          setCounter(0); // Reset counter after 2s
        }, 2000);
  
        if (counter === 0) {
          setCounter(counter + 1);
        } else if (counter === 1) {
          BackHandler.exitApp();
        }
  
        return true;
      }, [counter]);
  
      useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handler);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handler);
        };
      }, [handler]);
    }
  };
