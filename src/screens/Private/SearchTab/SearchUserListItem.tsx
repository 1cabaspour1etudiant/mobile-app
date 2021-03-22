import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Button, Icon, ListItem } from '@ui-kitten/components';
import { getUserProfilePicture} from '../../../api/User';
import { UserSearch } from '../../../api/types';

export default function SearchUserListItem({ id, firstname, activityArea }: UserSearch) {
    const [ pictureLoaded, setPictureLoaded ] = useState(false);
    const [picture, setPicture] = useState('');

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
            <Button size='tiny'>Contacter</Button>
        );
    }, []);

    const renderItemAccessoryLeft = useCallback((props) => {
        if (pictureLoaded) {
            return (
                <Image source={{ uri: picture }}/>
            );
        }

        return (
            <Icon {...props} name='person'/>
        );
    }, [pictureLoaded, picture]);

    return (
        <ListItem
            disabled
            title={firstname}
            description={activityArea}
            accessoryLeft={renderItemAccessoryLeft}
            accessoryRight={renderItemAccessoryRight}
        />
    );
}
