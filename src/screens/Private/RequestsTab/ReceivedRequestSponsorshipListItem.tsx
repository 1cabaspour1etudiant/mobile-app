import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Icon, ListItem } from '@ui-kitten/components';
import { getUserInfos, getUserProfilePicture} from '../../../api/User';
import { GetUserInfos, Sponsorship } from '../../../api/types';
import { PrivateUserInfos } from '../types';
import { useSelector } from 'react-redux';
import { useDistance } from '../../hooks';

const selector = ({
    user: { status }}: { user: PrivateUserInfos
}) => ({ currentUserStatus: status });

export default function ReceivedRequestSponsorshipListItem({ sponsorshipId, godfatherId, godsonId, emitterId }: Sponsorship) {
    const [emitterInfos, setEmitterInfos] = useState<GetUserInfos>();
    const [emitterInfosLoaded, setEmitterInfosLoaded] = useState(false);

    const [ emitterPictureLoaded, setEmitterPictureLoaded ] = useState(false);
    const [ emitterPicture, setEmitterPicture ] = useState('');

    const { currentUserStatus } = useSelector(selector);

    useEffect(() => {
        if (!emitterPictureLoaded) {
            let mounted = true;
            const abortController = new AbortController();

            getUserProfilePicture(emitterId, abortController)
                .then((pictureAsBase64) => {
                    if (mounted) {
                        setEmitterPictureLoaded(true);
                        setEmitterPicture(pictureAsBase64);
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
    }, [emitterPictureLoaded]);

    useEffect(() => {
        if (!emitterInfosLoaded) {
            let mounted = true;
            const abortController = new AbortController();

            getUserInfos(emitterId, abortController)
                .then((emitterInfos) => {
                    if (mounted) {
                        setEmitterInfos(emitterInfos);
                        setEmitterInfosLoaded(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            return () => {
                mounted = false;

            };
        }
    }, [emitterInfosLoaded]);

    const toggleAcceptButtonClick = useCallback(() => {

    }, [sponsorshipId]);

    const toggleRefuseButtonClick = useCallback(() => {

    }, [sponsorshipId]);

    const renderItemAccessoryRight = useCallback(() => {
        return (
            <View style={styles.buttonsContainer}>
                <Button
                    size='tiny'
                    onPress={toggleAcceptButtonClick}
                >
                    Accepter
                </Button>
                <Button
                    style={styles.buttonRight}
                    size='tiny'
                    onPress={toggleRefuseButtonClick}
                >
                    Refuser
                </Button>
            </View>
        );
    }, [toggleAcceptButtonClick, toggleRefuseButtonClick]);

    const renderItemAccessoryLeft = useCallback((props) => {
        if (emitterPictureLoaded) {
            return (
                <Image
                    style={styles.profilePicture}
                    source={{ uri: `data:;base64, ${emitterPicture}` }}
                />
            );
        }

        return (
            <Icon {...props} name='person'/>
        );
    }, [emitterPictureLoaded, emitterPicture]);

    const distance = useDistance(emitterInfos?.distance);

    return (
        <ListItem
            disabled
            title={emitterInfos?.firstname || ''}
            description={distance}
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
        right: 15,
    },
    buttonRight: {
        left: 15,
    },
});
