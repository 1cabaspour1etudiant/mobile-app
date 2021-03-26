import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { Layout, Icon, Button, Text } from '@ui-kitten/components';
import { getSponsorshipGodsonGodfather, getUserProfilePicture } from '../../../api/User';
import { GodfatherInfos } from '../../../api/types';
import {default as theme} from '../../../../theme.json';
import * as SMS from 'expo-sms';
import { deleteSponsorship } from '../../../api/Sponsorship';
import { useNotifiCationModal } from '../../../NotificationModal';

export default function GodefatherTab() {
    const [godfatherInfosLoaded, setGodFatherInfosLoaded] = useState(false);
    const [godfatherInfos, setGodfatherInfos] = useState<GodfatherInfos|null>(null);
    const [godfatherPictureLoaded, setGodfatherPictureLoaded] = useState(false);
    const [godfatherPicture, setGodfatherPicture] = useState('');
    const [godfatherNotFound, setGodfatherNotFound] = useState(false);

    useEffect(() => {
        if (!godfatherInfosLoaded) {
            let mounted = true;
            const abortController = new AbortController();

            getSponsorshipGodsonGodfather(abortController)
                .then((godfatherInfos) => {
                    if (mounted) {
                        setGodfatherInfos(godfatherInfos);
                        setGodFatherInfosLoaded(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (mounted && error?.statusCode && error.statusCode === 404) {
                        setGodfatherNotFound(true);
                    }
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

    const { showNotification, hideNotification } = useNotifiCationModal();

    const togglePressTel = useCallback(() => {
        if (godfatherInfos) {
            Linking.openURL(`tel:${godfatherInfos?.tel}`);
        }
    }, [godfatherInfos]);

    const togglePressSMS = useCallback(async () => {
        if (godfatherInfos) {
            SMS.isAvailableAsync()
                .then(async (isAvailable) => {
                    if (isAvailable) {
                        await SMS.sendSMSAsync(godfatherInfos?.tel, '');
                    } else {
                        console.log('isAvailable', isAvailable);
                    }
                })
                .catch((e) => {
                    console.log('isAvailableAsync', e);
                });
        }
    }, [godfatherInfos]);

    const toggleRemoveSponsorship = useCallback(() => {
        Alert.alert(
            'Suppression du parrainage',
            'Êtes-vous sûrs de vouloir supprimer ce parrainage ?',
            [
                {
                    onPress:() => {
                        if (godfatherInfos) {
                            showNotification();
                            deleteSponsorship(godfatherInfos.sponsorshipId)
                                .then(() => {
                                    setGodFatherInfosLoaded(false);
                                    setGodfatherPictureLoaded(false);
                                    setGodfatherInfos(null);
                                    setGodfatherPicture('');
                                })
                                .finally(() => {
                                    hideNotification();
                                });
                        }
                    },
                    text:'Oui'
                },
                {
                    text:'Annuler'
                }
            ])
    }, [godfatherInfos]);

    const toggleRefresh = useCallback(() => {
        setGodFatherInfosLoaded(false);
        setGodfatherPictureLoaded(false);
    }, []);

    return (
        <Layout style={styles.container} level='1'>
            {
                godfatherNotFound ? (
                    <View style={styles.notFoundWrapper}>
                        <Text category='h6'>Vous n'avez pas de parrain</Text>
                        <Button
                            style={styles.buttons}
                            onPress={toggleRefresh}
                        >
                            Rafraîchir
                        </Button>
                    </View>
                ) : (
                    <>
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

                                    <TouchableOpacity onPress={togglePressSMS}>
                                        <Icon
                                            name='message-square-outline'
                                            fill={theme['color-primary-700']}
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Button
                            style={styles.buttons}
                            onPress={toggleRemoveSponsorship}
                        >
                            Rompre le parrainage
                        </Button>           
                    </>
                )
            }
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notFoundWrapper: {
        alignItems:'center',
        justifyContent:'center',
        flex: 1,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        alignSelf:'center',
        alignItems:'center',
        paddingTop: 15,
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
        borderRadius: 50,
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
    buttons: {
        width:'50%',
        alignSelf:'center',
        marginTop: 20,
    },
});
