import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Icon, ListItem } from '@ui-kitten/components';
import { getUserProfilePicture} from '../../../api/User';
import { UserSearch } from '../../../api/types';
import { useDistance, useUserStatus } from '../../hooks';
import { useSelector } from 'react-redux';
import { postSponsorship } from '../../../api/Sponsorship';
import { useNotifiCationModal } from '../../../NotificationModal';

const selector = ({ user: { infos: { status, id } } }: any) => ({ status, id });

export default function SearchUserListItem({ id, firstname, distance }: UserSearch) {
    const [ pictureLoaded, setPictureLoaded ] = useState(false);
    const [contactRequestSent, setContactRequestSent] = useState(false);
    const [ picture, setPicture ] = useState('');

    useEffect(() => {
        if (!pictureLoaded) {
            let mounted = true;
            const abortController = new AbortController();

            getUserProfilePicture(id, abortController)
                .then((pictureAsBase64) => {
                    if (mounted) {
                        setPictureLoaded(true);
                        setPicture(pictureAsBase64);
                    }
                })
                .catch((error) => {
                    // console.log(error);
                });

            return () => {
                mounted = false;
                abortController.abort();
            };
        }
    }, [pictureLoaded]);

    const { status, id: currentUserId } = useSelector(selector);
    const { showNotification, hideNotification } = useNotifiCationModal();

    const toggleSendContactRequest = useCallback(() => {
        let godfatherId;
        let godsonId;
        
        if (status === 'godfather') {
            godfatherId = currentUserId;
            godsonId = id;
        } else {
            godfatherId = id;
            godsonId = currentUserId;
        }

        showNotification();
        postSponsorship(godfatherId, godsonId)
            .then(() => {
                setContactRequestSent(true);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                hideNotification();
            });
    }, [currentUserId, status, id, showNotification, hideNotification]);

    const renderItemAccessoryRight = useCallback((props) => {
        if (contactRequestSent) {
            return (
                <Icon {...props} name='checkmark-outline' />
            );
        }

        return (
            <Button
                size='tiny'
                onPress={toggleSendContactRequest}
            >
                contacter
            </Button>
        );
    }, [toggleSendContactRequest, contactRequestSent]);

    const renderItemAccessoryLeft = useCallback((props) => {
        if (pictureLoaded) {
            return (
                <Image
                    style={styles.profilePicture}
                    source={{ uri: `data:;base64, ${picture}` }}
                />
            );
        }

        return (
            <Icon {...props} name='person'/>
        );
    }, [pictureLoaded, picture]);

    const description = useDistance(distance);

    return (
        <ListItem
            disabled
            title={firstname}
            description={description}
            accessoryLeft={renderItemAccessoryLeft}
            accessoryRight={renderItemAccessoryRight}
        />
    );
}

const styles = StyleSheet.create({
    profilePicture: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
});
