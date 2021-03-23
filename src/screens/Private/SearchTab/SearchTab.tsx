import React, { useCallback, useEffect, useState } from 'react';

import { Layout, List } from '@ui-kitten/components';
import { getUserSearch } from '../../../api/User';
import { UserSearch } from '../../../api/types';
import SpinnerList from '../../../components/SpinnerList';
import SearchUserListItem from './SearchUserListItem';

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
            <SearchUserListItem
                id = {item.id}
                firstname={item.firstname}
                activityArea = {item.activityArea}
                distance={item.distance}
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
