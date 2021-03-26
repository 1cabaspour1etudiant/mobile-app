import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, Text } from 'react-native';
import { Layout, List } from '@ui-kitten/components';
import { getSponsorshipGodfatherGodsons } from '../../../api/User';
import { GodsonsInfos } from '../../../api/types';
import {default as theme} from '../../../../theme.json';
import GodsonListItem from './GodsonListItem';

export default function GodsonTab() {
    const [godsonsLoaded, setGodsonsLoaded] = useState(false);
    const [godsons, setGodsons] = useState<GodsonsInfos[]>([]);
    const [page, setPage] = useState(-1);
    const [lastPage, setLastPage] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!godsonsLoaded) {
            let mounted = true;

            const abortController = new AbortController();
            getSponsorshipGodfatherGodsons(page + 1, 20, abortController)
                .then(({ page, lastPage, items }) => {
                    if (mounted) {
                        setPage(page);
                        setLastPage(lastPage);
                        setGodsons([...godsons, ...items]);
                        setGodsonsLoaded(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            return () => {
                mounted = false;
            };
        }
    }, [godsonsLoaded]);

    useEffect(() => {
        if (refreshing) {
            let mounted = true;

            (async () => {
                const godsons:GodsonsInfos[] = [];

                for (let i = 0; i <= page; i++) {
                    const { items } = await getSponsorshipGodfatherGodsons(i, 20);
                    godsons.push(...items);
                }

                if (mounted) {
                    setGodsons(godsons);
                }
            })()
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    if (mounted) {
                        setRefreshing(false);
                    }
                });

            return () => {
                mounted = false;
            };
        }
    }, [refreshing]);

    const triggerRefreshing = useCallback(() => {
        if (!refreshing) {
            setRefreshing(true);
        }
    }, [refreshing]);

    const renderItem = useCallback(({ item }: { item: GodsonsInfos }) => {
        return (
            <GodsonListItem
                userId={item.userId}
                firstname={item.firstname}
                lastname={item.lastname}
                sponsorshipId={item.sponsorshipId}
                tel={item.tel}
                address={item.address}
                sponsorshipDate={item.sponsorshipDate}
                triggerRefreshing={triggerRefreshing}
            />
        );
    }, [triggerRefreshing]);

    const onEndReached = useCallback(() => {
        if (!lastPage) {
            setGodsonsLoaded(false);
        }
    }, [lastPage]);

    const onRefresh = useCallback(() => {
        if (!refreshing) {
            setRefreshing(true);
        }
    }, [refreshing]);

    console.log('godsons', godsons);
    return (
        <Layout style={{ flex: 1 }} level='1'>
            <List
                data={godsons}
                renderItem={renderItem}
                keyExtractor={(item:GodsonsInfos) => `${item.sponsorshipId}`}
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
        </Layout>
    );
}


