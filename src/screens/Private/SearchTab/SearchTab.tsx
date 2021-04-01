import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Layout, List, Text } from '@ui-kitten/components';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { getUserSearch } from '../../../api/User';
import { UserSearch } from '../../../api/types';
import SpinnerList from '../../../components/SpinnerList';
import SearchUserListItem from './SearchUserListItem';
import { useSearchRefreshIndex, useUserHasGodfather } from '../../hooks';
import {default as theme} from '../../../../theme.json';
import { actionPrivateUserRefreshSearchTab } from '../user.action';

export default function SearchTab() {
    const [loaded, setLoaded] = useState(false);
    const [users, setUsers] = useState<UserSearch[]>([]);
    const [page, setPage] = useState(-1);
    const [lastPage, setLastPage] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const hasGodfather = useUserHasGodfather();

    const searchRefreshIndex = useSearchRefreshIndex();
    const dispatch = useDispatch();

    useEffect(() => {
        if (loaded) {
            let mounted = true;

            setRefreshing(true);
            (async () => {
                const users:UserSearch[] = [];
                for (let i = 0; i <= page; i++) {
                    const { items } = await getUserSearch(i, 20);
                    if (!mounted) {
                        break;
                    }
                    users.push(...items);
                }

                if (mounted) {
                    setRefreshing(false);
                    setUsers(users);
                }
            })()
                .catch((error) => {
                    console.log(error);
                    setRefreshing(false);
                });

            return () => {
                mounted = false;
            };
        }
    }, [searchRefreshIndex]);

    useEffect(() => {
        if (!loaded && !refreshing) {
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
                contacted={item.contacted}
            />
        );
    }, []);

    const onEndReached = useCallback(() => {
        if (!lastPage) {
            setLoaded(false);
        }
    }, [lastPage]);

    const onRefresh = useCallback(() => {
        dispatch(actionPrivateUserRefreshSearchTab());
    }, [dispatch]);

    return (
        <Layout style={styles.container} level='1'>
            {
                hasGodfather ? (
                    <View style={styles.sentenceContainer}>
                        <Text category='h4'>Vous possedez déjà un parrain</Text>
                    </View>
                ) : (
                    <>
                        {
                            !loaded && (<SpinnerList />)
                        }
                        <List
                            data={users}
                            renderItem={renderItem}
                            keyExtractor={(item:UserSearch) => `${item.id}`}
                            onEndReachedThreshold={0.25}
                            onEndReached={onEndReached}
                            removeClippedSubviews={true}
                            refreshControl={
                                <RefreshControl
                                    colors={[theme['color-primary-700']]}
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        />
                    </>
                )
            }
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sentenceContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
