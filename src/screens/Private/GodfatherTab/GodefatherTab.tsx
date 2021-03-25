import React, { useCallback, useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Layout, Icon, Button } from '@ui-kitten/components';
import { getSponsorshipGodsonGodfather, getUserProfilePicture } from '../../../api/User';
import { GodfatherInfos } from '../../../api/types';
import {default as theme} from '../../../../theme.json';

export default function GodefatherTab() {
    const [godfatherInfosLoaded, setGodFatherInfosLoaded] = useState(false);
    const [godfatherInfos, setGodfatherInfos] = useState<GodfatherInfos>();
    const [godfatherPictureLoaded, setGodfatherPictureLoaded] = useState(false);
    const [godfatherPicture, setGodfatherPicture] = useState('');

    useEffect(() => {
        if (!godfatherInfosLoaded) {
            let mounted = true;
            const abortController = new AbortController();

            getSponsorshipGodsonGodfather(abortController)
                .then((godfatherInfos) => {
                    if (mounted) {
                        setGodFatherInfosLoaded(true);
                        setGodfatherInfos(godfatherInfos);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            return () => {
                mounted = false;
            };
        }
    }, [godfatherInfosLoaded]);
 
    useEffect(() => {
        if (godfatherInfosLoaded && !godfatherPictureLoaded && godfatherInfos) {
            let mounted = true;

            const abortController = new AbortController();
            getUserProfilePicture(godfatherInfos?.userId, abortController)
                .then((profilePictureAsBase64) => {
                    if (mounted) {
                        setGodfatherPictureLoaded(true);
                        setGodfatherPicture(profilePictureAsBase64);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            return () => {
                mounted = false;
            };
        }
    }, [godfatherPictureLoaded, godfatherInfosLoaded]);

    const togglePressTel = useCallback(() => {
        if (godfatherInfos) {
            Linking.openURL(`tel:${godfatherInfos?.tel}`);
        }
    }, [godfatherInfos]);

    return (
        <Layout style={styles.container} level='1'>
            <View style={styles.wrapper}>
                <View style={styles.profilePictureContainer}>
                {
                    godfatherPictureLoaded ? (
                        <Image
                            source={{ uri: `data:;base64, ${godfatherPicture}` }}
                            style={styles.profilePicture}
                        />
                    ) : (
                        <Icon
                            name='person-outline'
                            fill={theme['color-primary-700']}
                            style={styles.profilePicture}
                        />
                    )
                }
            </View>
                <View style={styles.infosContainer}>
                <View style={styles.fullnameContainer}>
                    <Text>{godfatherInfos?.firstname}</Text>
                    <Text>{godfatherInfos?.lastname}</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={togglePressTel}>
                        <Icon
                            name='phone-outline'
                            fill={theme['color-primary-700']}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                    <Icon
                        name='message-square-outline'
                        fill={theme['color-primary-700']}
                        style={styles.icon}
                    />
                </View>
            </View>
            </View>
            <Button
                style={styles.buttonRemoveSponsorship}
            >
                Rompre le parrainage
            </Button>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        alignSelf:'center',
        alignItems:'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    profilePictureContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '30%',
    },
    profilePicture: {
        width: 100,
        height: 100,
    },
    infosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
    },
    fullnameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
    },
    buttonRemoveSponsorship: {
        width:'50%',
        alignSelf:'center',
    },
});
