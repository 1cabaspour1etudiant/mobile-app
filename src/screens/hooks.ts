import { useEffect, useState, useCallback, useMemo } from 'react';
import {userTestEmail, userTestPassword} from '@env';
import { postLogin } from '../api/Auth';
import { Platform, BackHandler } from 'react-native';
import { useSelector } from 'react-redux';
import { State } from '../types';
import { useNavigation } from '@react-navigation/core';

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
}

export function useDistance(distance: number = 0) {
  const distanceAsKilometer = useMemo(() => {
    const distanceAsInt = parseInt('' + distance, 10);
    if (distanceAsInt < 1000) {
      return 'Moin d\'un kilomètre';
    }

    return `${distanceAsInt / 1000} KM`;
  }, [distance]);

  return distanceAsKilometer;
}

const selector = ({ user }: State) => ({ user });
export function useUser() {
  const { user } = useSelector(selector);
  return user;
}

export function useUserInfos() {
  const { infos } = useUser();
  return infos;
}

export function useUserProfilePicture() {
  const { profilePicture } = useUser();
  return profilePicture;
}

export function useUserStatus() {
  const { status } = useUserInfos();
  return status;
}

export function useUserHasGodfather() {
  const { hasGodfather } = useUser();
  return hasGodfather;
}

export function useSearchRefreshIndex() {
  const { searchTabRefreshIndex } = useUser();
  return searchTabRefreshIndex;
}

export function useGodfatherRefreshIndex() {
  const { godfatherTabRefreshIndex } = useUser();
  return godfatherTabRefreshIndex;
}

export function useGodsonRefreshIndex() {
  const { godsonTabRefreshIndex } = useUser();
  return godsonTabRefreshIndex;
}

export function useRequestRefreshIndex() {
  const { requestTabRefreshIndex } = useUser();
  return requestTabRefreshIndex;
}

/**
 *
 * @param {boolean} enabled
 * @param {Function} clearState
 * @desc Allow to prevent native back hardware and navigate to a provided
 * [origin] parameter in the screen
 */
 export function useBackHardware(
  previousScreen = '',
  enabled = true,
  clearState = () => {},
) {
  const { navigate } = useNavigation();

  useEffect(() => {
    if (enabled) {
      const listener = () => {
        navigate(previousScreen);
        clearState();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', listener);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', listener);
      };
    }
  }, [enabled]);
};
