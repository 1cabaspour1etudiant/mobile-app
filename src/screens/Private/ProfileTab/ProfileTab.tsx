import React from 'react';
import { Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useUserInfos } from '../../hooks';

export default function ProfileTab() {
    const userInfos = useUserInfos();
    return (
        <Layout style={{ flex: 1 }} level='1'>
            <Text>{userInfos.firstname}</Text>
            <Text>{userInfos.lastname}</Text>
        </Layout>
    );
}
