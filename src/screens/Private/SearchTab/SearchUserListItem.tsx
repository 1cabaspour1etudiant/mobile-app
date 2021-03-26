import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Icon, ListItem } from '@ui-kitten/components';
import { getUserProfilePicture} from '../../../api/User';
import { UserSearch } from '../../../api/types';
import { useDistance, useUserInfos } from '../../hooks';
import { postSponsorship } from '../../../api/Sponsorship';
import { useNotifiCationModal } from '../../../NotificationModal';

export default function SearchUserListItem({ id, firstname, distance, contacted }: UserSearch) {
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

    const { status, userId } = useUserInfos();
    const { showNotification, hideNotification } = useNotifiCationModal();

    const toggleSendContactRequest = useCallback(() => {
        let godfatherId;
        let godsonId;
        
        if (status === 'godfather') {
            godfatherId = userId;
            godsonId = id;
        } else {
            godfatherId = id;
            godsonId = userId;
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
    }, [userId, status, id, showNotification, hideNotification]);

    const renderItemAccessoryRight = useCallback((props) => {
        if (contactRequestSent || contacted) {
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
    }, [toggleSendContactRequest, contactRequestSent, contacted]);

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
