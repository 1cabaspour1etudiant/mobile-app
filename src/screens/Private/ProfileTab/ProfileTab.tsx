import React, { useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Button } from '@ui-kitten/components';
import { useUserInfos } from '../../hooks';
import InputUpdateInfos from './InputUpdateInfos';
import { useNotifiCationModal } from '../../../NotificationModal';
import { UserPathInfos } from '../../../api/types';
import { patchUserMe } from '../../../api/User';
import { useDispatch } from 'react-redux';
import { actionPrivateUserSetInfos } from '../user.action';

function getRef(label:string, defaultValue: string) {
    return {
        label,
        disabled: true,
        value: defaultValue,
    };
}

export default function ProfileTab() {
    const userInfos = useUserInfos();
    const refEmail = useRef(getRef('email', userInfos.email));
    const refTel = useRef(getRef('tel', userInfos.tel));
    const refAddress = useRef(getRef('address', userInfos.address.address));
    const refZipCode = useRef(getRef('zipCode', userInfos.address.zipCode));
    const refCity = useRef(getRef('city', userInfos.address.city));
    const refPassword = useRef(getRef('password', ''));

    const {
        showNotification,
        hideNotification,
    } = useNotifiCationModal();

    const dispatch = useDispatch();

    const toggleUpdate = useCallback(() => {
        const userInfos: UserPathInfos = {};

        if (!refEmail.current.disabled) {
            userInfos.email = refEmail.current.value; 
        }

        if (!refTel.current.disabled) {
            userInfos.tel = refTel.current.value; 
        }

        if (!refAddress.current.disabled) {
            userInfos.address = refAddress.current.value; 
        }

        if (!refZipCode.current.disabled) {
            userInfos.zipCode = refZipCode.current.value; 
        }

        if (!refCity.current.disabled) {
            userInfos.city = refCity.current.value; 
        }

        if (!refPassword.current.disabled) {
            userInfos.password = refPassword.current.value; 
        }

        showNotification();
        patchUserMe(userInfos)
            .then((newUserInfos) => {
                dispatch(actionPrivateUserSetInfos(newUserInfos));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                hideNotification();
            });
    }, [refEmail, refTel, refAddress, refZipCode, refCity, refPassword, dispatch]);

    return (
        <Layout style={styles.container} level='1'>
            <InputUpdateInfos
                label={userInfos.email}
                labelName='email'
                keyboardType='email-address'
                refInput={refEmail}
            />

            <InputUpdateInfos
                label={userInfos.tel}
                labelName='tel'
                keyboardType='phone-pad'
                refInput={refTel}
            />

            <InputUpdateInfos
                label={userInfos.address.address}
                labelName='address'
                keyboardType='default'
                refInput={refAddress}
            />

            <InputUpdateInfos
                label={userInfos.address.zipCode}
                labelName='zipCode'
                keyboardType='number-pad'
                refInput={refZipCode}
            />

            <InputUpdateInfos
                label={userInfos.address.city}
                labelName='city'
                keyboardType='default'
                refInput={refCity}
            />

            <InputUpdateInfos
                label={'Password'}
                labelName='password'
                keyboardType='visible-password'
                refInput={refPassword}
            />

            <Button
                style={styles.button}
                onPress={toggleUpdate}
            >
                Modifier
            </Button>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
    },
    button: {
        marginTop: 10,
    },
});
