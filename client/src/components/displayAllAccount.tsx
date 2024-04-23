import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios ,{ AxiosError } from 'axios';
import { API_BASE_URL } from './config';

const DisplayAllAccount = (props: any) => {
    const { user } = props.route.params;


    interface AccountType {
        cardType: string;
        cardNumber: string;
        ammount: string;
    }

    const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);

    useEffect(() => {
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

                setAccountTypes(response.data.accounts);
            } catch (error) {
                console.error('Error fetching account types:', error);
            }
        };

        if (user && user.email) {
            fetchAccountTypes();
        }
    }, [user]);
    const handleDelete = async (cardNumber: string, cardType: string) => {

        Alert.alert(
            'Confirm Deletion',
            `Are you sure you want to delete ${cardType} account ending in ${cardNumber.slice(-4)}?`, 
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await axios.delete(`${API_BASE_URL}/deleteAccount`, {
                                params: {
                                    cardNumber,
                                    cardType,
                                    email: user.email,
                                },
                            });

                            setAccountTypes(prevAccountTypes =>
                                prevAccountTypes.filter(account => account.cardNumber !== cardNumber)
                            );

                            Alert.alert('Success!', 'Account deleted successfully.');
                            const response = await axios.get(`${API_BASE_URL}/AllAccount`, {
                                params: {
                                    email: user.email,
                                },
                            });
    
                            if (!response.data.accounts.length) {
                                throw new Error('No account types found');
                            }
    
                            setAccountTypes(response.data.accounts);
 
                        } catch (error) {
                            if (axios.isAxiosError(error)) {
                                const axiosError: AxiosError = error;
                                if (axiosError.response?.status === 400) {
                                    Alert.alert('Error', 'Account deletion failed. Please try again.'); 
                                } else {
                                    Alert.alert('Error', 'Account deletion failed. Please try again.'); 
                                }
                              } else {
                                Alert.alert('Error', 'Account deletion failed. Please try again.'); 
                            }
            
                        }
                        
                    },
                },
            ]
        );
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={[styles.navbar, { backgroundColor: 'green' }]}>
                <View style={styles.leftNavbar}>
                    <Text style={{ color: 'white', fontSize: 50, paddingTop: 20 }}>All Account </Text>
                </View>
                <View style={styles.rightNavbar}>
                    <Image style={styles.logo} source={require('../../assets/logo1.png')} />
                </View>
            </View>

            <View style={styles.cardContainer}>
                {accountTypes.map((account, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{account.cardType}</Text>
                        <Text>Card Number: {account.cardNumber}</Text>
                        <Text>Amount: {account.ammount}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(account.cardNumber, account.cardType)}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <View style={styles.futerContainer}>
                <View style={styles.futerRow}>
                    <View style={styles.futer}>
                        <Image style={styles.logo} source={require("../../assets/home.png")} />
                        <Text>Home</Text>
                    </View>
                    <View style={styles.option}>
                        <Image style={styles.logo} source={require("../../assets/history.png")} />
                        <Text>History</Text>
                    </View>
                    <View style={styles.option}>
                        <Image style={styles.logo} source={require("../../assets/saving.png")} />
                        <Text>Saving</Text>
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

export default DisplayAllAccount;

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
        marginLeft: 20,


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
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
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
    cardContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
