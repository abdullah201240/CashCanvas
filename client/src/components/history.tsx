import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_BASE_URL } from './config';

const History = (props: any) => {
    const { user } = props.route.params;
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
                const response = await axios.get(`${API_BASE_URL}/History`, {
                    params: {
                        email: user.email,
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

        if (user && user.email) {
            fetchAccountTypes();
        }
    }, [user]);

    return (
        <View style={styles.container}>


            <View style={[styles.navbar, { backgroundColor: 'green' }]}>
                <View style={styles.leftNavbar}>
                    <Text style={{ color: 'white', fontSize: 50, paddingTop: 20 }}>History </Text>
                </View>
                <View style={styles.rightNavbar}>
                    <Image style={styles.logo} source={require('../../assets/logo1.png')} />
                </View>
            </View>



            <ScrollView style={styles.cardContainer}>
                {historyTypes.map((history, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{history.transactionType}</Text>
                        <Text>Transaction Name: {history.transactionName}</Text>
                        
                     <Text>Card Number: {history.cardNumber}</Text>
                    <Text>Card Type: {history.cardType}</Text>

                        <Text>Amount: {history.ammount}</Text>
                        
                    </View>
                ))}
            </ScrollView>


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

        </View>
    )
}

export default History

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
        marginLeft: 80,
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
        paddingVertical: 15,
    },
    option: {
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 16,
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

})