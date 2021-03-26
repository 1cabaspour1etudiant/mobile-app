import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, View, Linking, TouchableOpacity } from 'react-native';
import { Icon, ListItem } from '@ui-kitten/components';
import { getUserProfilePicture} from '../../../api/User';
import { GodsonsInfos } from '../../../api/types';
import { deleteSponsorship } from '../../../api/Sponsorship';
import { useNotifiCationModal } from '../../../NotificationModal';
import {default as theme} from '../../../../theme.json';
import * as SMS from 'expo-sms';

interface GodsonsListItemProps extends GodsonsInfos {
    triggerRefreshing:() => void
}

export default function GodsonListItem({
    sponsorshipId,
    triggerRefreshing,
    userId,
    firstname,
    lastname,
    tel,
    sponsorshipDate,
    address,
}: GodsonsListItemProps) {
    const [ userPictureLoaded, setUserPictureLoaded ] = useState(false);
    const [ userPicture, setUserPicture ] = useState('');

    useEffect(() => {
        if (!userPictureLoaded) {
            let mounted = true;
            const abortController = new AbortController();

            getUserProfilePicture(userId, abortController)
                .then((pictureAsBase64) => {
                    if (mounted) {
                        setUserPictureLoaded(true);
                        setUserPicture(pictureAsBase64);
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
    }, [userPictureLoaded]);

    const { showNotification, hideNotification } = useNotifiCationModal();

    const toggleRefuseButtonClick = useCallback(() => {
        showNotification();
        deleteSponsorship(sponsorshipId)
            .then(() => {
                triggerRefreshing();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                hideNotification();
            });
    }, [sponsorshipId, triggerRefreshing]);

    const togglePressTel = useCallback(() => {
        Linking.openURL(`tel:${tel}`);
    }, [tel]);

    const togglePressSMS = useCallback(async () => {
        SMS.isAvailableAsync()
            .then(async (isAvailable) => {
                if (isAvailable) {
                    await SMS.sendSMSAsync(tel, '');
                } else {
                    console.log('isAvailable', isAvailable);
                }
            })
            .catch((e) => {
                console.log('isAvailableAsync', e);
            });
    }, [tel]);

    const renderItemAccessoryRight = useCallback(() => {
        return (
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={togglePressTel}
                    style={styles.buttonLeft}
                >
                    <Icon
                        name='phone-outline'
                        fill={theme['color-primary-700']}
                        style={styles.icon}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={togglePressSMS}>
                    <Icon
                        name='message-square-outline'
                        fill={theme['color-primary-700']}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        );
    }, [toggleRefuseButtonClick]);

    const renderItemAccessoryLeft = useCallback((props) => {
        if (userPictureLoaded) {
            return (
                <Image
                    style={styles.profilePicture}
                    source={{ uri: `data:;base64, ${userPicture}` }}
                />
            );
        }

        return (
            <Icon {...props} name='person'/>
        );
    }, [userPictureLoaded, userPicture]);

    return (
        <ListItem
            disabled
            title={`${firstname} ${lastname}`}
            description={address}
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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    buttonLeft: {
        right: 30,
    },
    icon: {
        width: 24,
        height: 24,
    }
});
