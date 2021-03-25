import React, { useCallback, useEffect, useState } from 'react';
import { Layout, List, Text } from '@ui-kitten/components';
import { Sponsorship } from '../../../api/types';
import { getSponsorshipRequests } from '../../../api/Sponsorship';
import SpinnerList from '../../../components/SpinnerList';
import ReceivedRequestSponsorshipListItem from './ReceivedRequestSponsorshipListItem';
import { useUserStatus } from '../../hooks';
import { RefreshControl } from 'react-native';
import { default as theme } from '../../../../theme.json';


export default function RequestsTab() {
    const [loaded, setLoaded] = useState(false);
    const [sponsorships, setSponsorships] = useState<Sponsorship[]>([]);
    const [page, setPage] = useState(-1);
    const [lastPage, setLastPage] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const status = useUserStatus();

    useEffect(() => {
        if (!loaded) {
            let mounted = true;
            const abortController = new AbortController();

            getSponsorshipRequests(page + 1, 20, 'received', abortController)
                .then(({ page, items, lastPage }) => {
                    if (mounted) {
                        setPage(page);
                        setSponsorships([...sponsorships, ...items]);
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

    useEffect(() => {
        if (refreshing) {
            let mounted = true;
            (async () => {
                const sponsorships = [];
                for (let i = 0; i < page; i++) {
                    const { items } = await getSponsorshipRequests(i, 20, 'received');
                    sponsorships.push(...items);
                }

                if (mounted) {
                    setSponsorships(sponsorships);
                }
            })()
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    if (mounted) {
                        setRefreshing(false);
                    }
                });

            return () => {
                mounted = false;
            };
        }
    }, [refreshing]);

    const renderItem = useCallback(({ item }: { item: Sponsorship }) => {
        return (
            <ReceivedRequestSponsorshipListItem
                key={item.sponsorshipId}
                date={item.date}
                emitterId={item.emitterId}
                recipientId={item.recipientId}
                godsonId={item.godsonId}
                godfatherId={item.godfatherId}
                sponsorshipId={item.sponsorshipId}
                validated={item.validated}
            />
        );
    }, []);

    const onEndReached = useCallback(() => {
        if (!lastPage) {
            setLoaded(false);
        }
    }, [lastPage]);

    const onRefresh = useCallback(() => {
        if (!refreshing) {
            setRefreshing(true);
        }
    }, [refreshing]);

    return (
        <Layout style={{ flex: 1 }} level='1'>
            {
                !loaded && (<SpinnerList />)
            }
            {
                loaded && sponsorships.length !== 0 && (
                    <Text category='h6'>Vos { status === 'godfather' ? 'demandes' : 'propositions' } de sponsorisation</Text>
                )
            }
            {
                loaded && sponsorships.length === 0 && (
                    <Text category='h6' style={{ textAlign: 'center' }}>Vous n'avez pas de demandes de en attentes</Text>
                )
            }
            <List
                data={sponsorships}
                renderItem={renderItem}
                keyExtractor={(item:Sponsorship) => `${item.sponsorshipId}`}
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
