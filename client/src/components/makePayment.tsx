import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, Platform } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import axios, { AxiosError } from 'axios';

import { API_BASE_URL } from './config';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-notifications';
interface NotificationData {
    title: string;
    body: string;
    data: any;
}
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});
const MakePayment = (props: any) => {
    const { user } = props.route.params;
    const [id, setId] = useState('');



    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [isFocus1, setIsFocus1] = useState(false);
    const [value1, setValue1] = useState<{ cardType: string; cardNumber: string } | null>(null);
    const [salary, setSalary] = useState('');
    const [saving, setSaving] = useState('');

    const [expoPushToken, setExpoPushToken] = useState<string>('');
    const [notification, setNotification] = useState<NotificationData | null>(null);
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();
    interface AccountType {
        label: string;
        value: {
            cardType: string;
            cardNumber: string;
        };
    }

    const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(receivedNotification => {
            const notificationData = receivedNotification.request.content.data as NotificationData | null;
            if (notificationData) {
                setNotification(notificationData);
            }
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });















        const fetchAccountTypes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/AllAccount`, {
                    params: {
                        email: user.email,
                    },
                });

                if (!response.data.accounts.length) {
                    throw new Error('No account types found');
                }

                const accountData: AccountType[] = response.data.accounts.map((account: { cardType: string, cardNumber: string }) => ({
                    label: `${account.cardType} (${account.cardNumber})`,
                    value: { cardType: account.cardType, cardNumber: account.cardNumber }
                }));
                setAccountTypes(accountData);
            } catch (error) {
                console.error('Error fetching account types:', error);
            }
        };
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/Profile`, {
                    params: {
                        email: user.email,
                    },
                });

                if (!response) {
                    throw new Error('No account types found');
                }


                setSalary(response.data.salary);
                setSaving(response.data.saving);

            } catch (error) {
                console.error('Error fetching account types:', error);
            }
        };


        if (user && user.email) {
            fetchAccountTypes();
            fetchProfile();
        }
        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, [user]);

    async function registerForPushNotificationsAsync(): Promise<string> {
        let token = '';

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return token;
            }
            const expoPushToken = await Notifications.getExpoPushTokenAsync({ projectId: '84a78ded-8058-4166-a96c-0420780afe6a' });
            if (expoPushToken.data) {
                token = expoPushToken.data;
                console.log(token);
            }
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }



    const handleAddCard = async () => {
        if (user.password === pin) {
            try {
                const nsaving = parseInt(saving);
                const nsalary = parseInt(salary);

                if (!isNaN(nsaving) && !isNaN(nsalary)) {
                    const newper = nsaving / 100;
                    const newsalary = nsalary * newper;
                    const updatesalary = nsalary - newsalary;
                    const dailyamount = updatesalary / 30;

                    const response = await axios.get(`${API_BASE_URL}/RegularCost`, {
                        params: {
                            email: user.email,
                        },
                    });
                    const finalcost = parseInt(response.data.totalCost) + parseInt(amount);


                    if (finalcost > dailyamount) {
                        Alert.alert(
                            'Warning',
                            'You have exceeded your daily spending limit. Do you still want to send money?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                {
                                    text: 'Yes',
                                    onPress: async () => {
                                        try {
                                            await payment();
                                        } catch (error) {
                                            console.error(error);
                                            Alert.alert('Error', 'Payment failed. Please try again later.');
                                        }
                                    },
                                },
                            ]
                        );
                    } else {
                        await payment();
                    }
                } else {
                    console.error('Saving or salary is not a valid number');
                }
            } catch (error) {
                handlePaymentError(error);
            }
        } else {
            Alert.alert('Error', 'Wrong PIN');
        }
    };

    const payment = async () => {
        const response = await axios.post(`${API_BASE_URL}/AllTransaction`, {
            transactionType: "Payment",
            transactionName: id,
            email: user.email,
            cardNumber: value1?.cardNumber,
            cardType: value1?.cardType,
            ammount: amount
        });
        if (response.status === 201) {
            await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Payment ",
                  body: 'Payment successfully',
                  
                },
                trigger: { seconds: 2 },
              });
            Alert.alert('Success', 'Payment successful');
            props.navigation.navigate('Home', { user });
        } else {
            Alert.alert('Error', 'Insufficient balance');
        }
    }
    const handlePaymentError = (error: unknown) => {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 400) {
                Alert.alert('Error', 'Insufficient balance');
            } else if (axiosError.response?.status === 404) {
                Alert.alert('Error', 'User Not Found');
            } else {
                Alert.alert('Error', 'Payment failed. Please try again later.');
            }
        } else if (error instanceof Error) {
            Alert.alert('Error', 'Payment failed. Please try again later.');
        } else {
            Alert.alert('Error', 'An unknown error occurred. Please try again later.');
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={[styles.navbar, { backgroundColor: 'green' }]}>
                <View style={styles.leftNavbar}>
                    <Text style={{ color: 'white', fontSize: 50, paddingTop: 20 }}>Payment</Text>
                </View>
                <View style={styles.rightNavbar}>
                    <Image style={styles.logo} source={require('../../assets/logo1.png')} />
                </View>
            </View>

            <View style={styles.contentContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Account Id"
                    value={id}
                    onChangeText={setId}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    value={amount}
                    onChangeText={setAmount}
                />



                <Dropdown
                    style={[styles.dropdown, isFocus1 && { borderColor: 'blue' }]}
                    data={accountTypes}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus1 ? 'Account' : '...'}
                    value={value1 ? { label: `${value1.cardType} (${value1.cardNumber})`, value: value1 } : null}
                    onFocus={() => setIsFocus1(true)}
                    onBlur={() => setIsFocus1(false)}
                    onChange={(item: { label: string, value: { cardType: string, cardNumber: string } }) => {
                        setValue1(item.value);
                        setIsFocus1(false);
                    }}
                />








                <TextInput
                    style={styles.input}
                    placeholder="PIN"
                    secureTextEntry
                    value={pin}
                    onChangeText={setPin}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={handleAddCard}>
                    <Text style={styles.buttonText}>Payment</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.futerContainer}>
                <View style={styles.futerRow}>
                    <View style={styles.futer}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Home', { user })}>
                            <Image style={styles.logo} source={require("../../assets/home.png")} />
                            <Text>Home</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.option}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('History', { user })}>
                            <Image style={styles.logo} source={require("../../assets/history.png")} />
                            <Text>History</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.option}>
                        <Image style={styles.logo} source={require("../../assets/schedule.png")} />
                        <Text>Schedule</Text>
                    </View>
                    <View style={styles.option}>
                        <Image style={styles.logo} source={require("../../assets/notifications.png")} />
                        <Text>Inbox</Text>
                    </View>
                </View>
            </View>




        </ScrollView>
    )
}

export default MakePayment

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    navbar: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 60,
        fontSize: 80,
    },
    leftNavbar: {
        flexDirection: 'row',
        marginLeft: 80,


    },
    rightNavbar: {
        flexDirection: 'row',
        marginLeft: 50,
        marginTop: 29,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 120,
        backgroundColor: 'white',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 40,
        width: 350,
    },
    buttonContainer: {
        marginTop: 12,
        height: 50,
        width: 200,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 50,
        marginBottom: 10,
        paddingHorizontal: 8,
        width: 350,
    },
    futerContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',

    },
    futerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flex: 1,

    },
    futer: {
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 20,
    },
    option: {
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 20,
    },
});