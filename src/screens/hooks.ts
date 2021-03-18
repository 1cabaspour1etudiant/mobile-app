import { useEffect, useState } from 'react';
import {userTestEmail, userTestPassword} from '@env';
import { postLogin } from '../api/Auth';

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
