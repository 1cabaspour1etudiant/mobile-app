import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Button, Icon, Layout, List, ListItem } from '@ui-kitten/components';
import { getUserProfilePicture, getUserSearch } from '../../api/User';
import { UserSearch } from '../../api/types';
import SpinnerList from '../../components/SpinnerList';

function UserListItem({ id, firstname, activityArea }: UserSearch) {
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
            <Button size='tiny'>Contacte</Button>
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
            title={firstname}
            description={activityArea}
            accessoryLeft={renderItemAccessoryLeft}
            accessoryRight={renderItemAccessoryRight}
        />
    );
}

export default function SearchTab() {
    const [loaded, setLoaded] = useState(false);
    const [users, setUsers] = useState<UserSearch[]>([]);
    const [page, setPage] = useState(-1);
    const [lastPage, setLastPage] = useState(false);

    useEffect(() => {
        if (!loaded) {
            let mounted = true;
            const abortController = new AbortController();

            getUserSearch(page + 1, 20, abortController)
                .then(({ page, items, lastPage }) => {
                    if (mounted) {
                        setPage(page);
                        setUsers([...users, ...items]);
                        setLoaded(true);
                        setLastPage(lastPage);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            return () => {
                mounted = false;
                abortController.abort();
            };
        }
    }, [loaded]);

    const renderItem = useCallback(({ item }: { item: UserSearch }) => {
        return (
            <UserListItem
                firstname = {item.firstname}
                id = {item.id}
                activityArea = {item.activityArea}
            />
        )
    }, []);

    const onEndReached = useCallback(() => {
        if (!lastPage) {
            setLoaded(false);
        }
    }, [lastPage]);

    return (
        <Layout style={{ flex: 1 }} level='1'>
            {
                !loaded && (<SpinnerList />)
            }
            <List
                data={users}
                renderItem={renderItem}
                keyExtractor={(item:any) => item.id}
                onEndReachedThreshold={0.5}
                onEndReached={onEndReached}
            />
        </Layout>
    );
}