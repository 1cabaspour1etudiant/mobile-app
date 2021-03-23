import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Icon, ListItem } from '@ui-kitten/components';
import { getUserProfilePicture} from '../../../api/User';
import { UserSearch } from '../../../api/types';

export default function SearchUserListItem({ id, firstname, distance }: UserSearch) {
    const [ pictureLoaded, setPictureLoaded ] = useState(false);
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

    const renderItemAccessoryRight = useCallback(() => {
        return (
            <Button size='tiny'>contacter</Button>
        );
    }, []);

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

    const description = useMemo(() => {
        const distanceAsInt = parseInt('' + distance, 10);
        if (distanceAsInt < 1000) {
            return 'Moin d\'un kilomètre';
        }

        return `${distanceAsInt / 1000} KM`;
    }, [distance]);

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
