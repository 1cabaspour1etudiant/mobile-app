import React, {
    useState,
    useContext,
    createContext,
    useCallback,
} from 'react';

import { View, StyleSheet } from 'react-native';

import { Spinner } from '@ui-kitten/components';
import Modal from 'react-native-modal';

const NotificationContext = createContext({
    showNotification: () => {},
    hideNotification: () => {},
});
  
export const useNotifiCationModal = () => useContext(NotificationContext);
  
export const NofificationContextProvider = (props: any) => {
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notificationKind, setNotificationKind] = useState('loading');
    const [notificationText, setNotificationText] = useState('');

    const showNotification = useCallback((kind = 'loading', text = '') => {
        if (kind !== notificationKind) {
            setNotificationKind(kind);
        }

        if (text !== '' && notificationText !== text) {
            setNotificationText(text);
        }

        setNotificationVisible(true);
    }, [notificationKind, notificationText]);

    const hideNotification = useCallback(() => {
        setNotificationVisible(false);
    }, []);

    const value = {
        showNotification,
        hideNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {props.children}
            <Modal
                isVisible={notificationVisible}
                backdropOpacity={0}
                animationIn="fadeIn"
                animationOut="fadeOut"
                useNativeDriver
            >
                <View style={styles.spinnerContainer}>
                    <Spinner size='giant' />
                </View>
            </Modal>
        </NotificationContext.Provider>
    );
};

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
