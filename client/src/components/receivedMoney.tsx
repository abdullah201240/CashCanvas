import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from './config';

const ReceivedMoney = (props: any) => {
    const { user } = props.route.params;
    const [pin, setPin] = useState('');
    const [isFocus1, setIsFocus1] = useState(false);
    const [value1, setValue1] = useState<{ cardType: string; cardNumber: string } | null>(null);
    interface AccountType {
        label: string;
        value: {
            cardType: string;
            cardNumber: string;
        };
    }
    const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);

    interface HistoryType {
        transactionType: string;
        transactionName: string;
        cardNumber: string;
        cardType: string;
        ammount: string;
    }
    const [historyTypes, setHistoryTypes] = useState<HistoryType[]>([]);
    useEffect(() => {
        const fetchAccountTypes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/RecivedMoney`, {
                    params: {
                        transactionName: user.phone,
                    },
                });

                if (!response.data.transactions) {
                    throw new Error('No account types found');
                }

                setHistoryTypes(response.data.transactions);
            } catch (error) {
                console.error('Error fetching account types:', error);
            }
        };
        const fetchAllAccount = async () => {
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

        if (user && user.email) {
            fetchAccountTypes();
            fetchAllAccount();
        }
    }, [user]);
    

    const handleAddMoney = async (amount: string,rcardNumber: string ,rcardType: string) => {
        if (user.password === pin) {
            

            try {

                const response = await axios.post(`${API_BASE_URL}/MoneyADD`, {
                    transactionType:"Add Money",
                    transactionName:value1?.cardNumber,
                    email: user.email,
                    cardNumber: value1?.cardNumber,
                    cardType: value1?.cardType,
                    ammount:amount,
                    rcardNumber:rcardNumber,
                    rcardType: rcardType
                    
                     
                });
                console.log(response.status)

                if (response.status === 201) {
                    Alert.alert('Success', 'Money add successful');
                    props.navigation.navigate('Home', { user });
                }
                
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError: AxiosError = error;
                    if (axiosError.response?.status === 400) {
                        Alert.alert('Error', 'All fields are required');
                    } else {
                        Alert.alert('Error', 'Money add failed. Please try again later.');
                    }
                  } else {
                    Alert.alert('Error', 'Money add failed. Please try again later.');
                }








                
            }
        } else {
            Alert.alert('Error', 'Wrong PIN');
        }
        
    }

    return (
        <View style={styles.container}>
            <View style={[styles.navbar, { backgroundColor: 'green' }]}>
                <View style={styles.leftNavbar}>
                    <Text style={{ color: 'white', fontSize: 40, paddingTop: 20 }}>Received Money </Text>
                </View>
                <View style={styles.rightNavbar}>
                    <Image style={styles.logo} source={require('../../assets/logo1.png')} />
                </View>
            </View>

            <ScrollView style={styles.cardContainer}>
                {historyTypes.map((history, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>Money received</Text>
                        <Text>Received Number: {history.cardNumber}</Text>
                        <Text>Card Type: {history.cardType}</Text>
                        <Text>Amount: {history.ammount}</Text>
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
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleAddMoney(history.ammount,history.cardNumber,history.cardType)}>
                            <Text style={styles.deleteButtonText}>Add Money</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.footerRow}>
                    <TouchableOpacity style={styles.footerOption}>
                        <Image style={styles.logo} source={require("../../assets/home.png")} />
                        <Text>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerOption}>
                        <Image style={styles.logo} source={require("../../assets/history.png")} />
                        <Text>History</Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity style={styles.footerOption}>
                        <Image style={styles.logo} source={require("../../assets/schedule.png")} />
                        <Text>Schedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerOption}>
                        <Image style={styles.logo} source={require("../../assets/notifications.png")} />
                        <Text>Inbox</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default ReceivedMoney

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navbar: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 60,
        fontSize: 30,
    },
    leftNavbar: {
        flexDirection: 'row',
        marginLeft: 30,
    },
    rightNavbar: {
        flexDirection: 'row',
        marginLeft: 5,
        marginTop: 29,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopColor: '#ccc',
        paddingHorizontal: 10,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flex: 1,
    },
    footerOption: {
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 16,
    },
    cardContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 70,
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
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 50,
        marginBottom: 10,
        paddingHorizontal: 8,
        width: 250,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 40,
        width: 250,
    },
})
