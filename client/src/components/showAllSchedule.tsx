import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from './config';

const ShowAllSchedule = (props: any) => {
    const { user } = props.route.params;
    interface ScheduleType {
        _id: string; 
        name: string;
        date: string;
        ammount: string;
        notification: string;
    }
    const [allscheduleTypes, setAllscheduleTypes] = useState<ScheduleType[]>([]);

    useEffect(() => {
        const fetchAccountTypes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/ShowAllSchedule`, {
                    params: {
                        email: user.email,
                    },
                });

                if (!response) {
                    throw new Error('No Schedule types found');
                }

                setAllscheduleTypes(response.data.Allschedule);
            } catch (error) {
                console.error('Error fetching account types:', error);
            }
        };

        if (user && user.email) {
            fetchAccountTypes();
        }
    }, [user]);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${API_BASE_URL}/DeleteSchedule`, {
                params: {
                    id,
                    email: user.email,
                },
            });

            setAllscheduleTypes(prevAccountTypes =>
                prevAccountTypes.filter(schedule => schedule._id !== id)
            );

            Alert.alert('Success!', 'Schedule deleted successfully.');
        } catch (error) {
            let errorMessage = 'Schedule deletion failed. Please try again.';
            if (axios.isAxiosError(error)) {
                const axiosError: AxiosError = error;
                if (axiosError.response?.status === 400) {
                    errorMessage = 'Bad request. Please try again.';
                }
            }
            Alert.alert('Error', errorMessage);
        }
    };
    return (
        <View style={styles.container}>
            <View style={[styles.navbar, { backgroundColor: 'green' }]}>
                <View style={styles.leftNavbar}>
                    <Text style={{ color: 'white', fontSize: 50, paddingTop: 20 }}>All Schedule  </Text>
                </View>
                <View style={styles.rightNavbar}>
                    <Image style={styles.logo} source={require('../../assets/logo1.png')} />
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={() => props.navigation.navigate('Schedule', { user })}>
                <Image style={styles.logo} source={require('../../assets/addicon.png')} />


                </TouchableOpacity>


            </View>

            <ScrollView style={styles.cardContainer}>
                   {allscheduleTypes.map((schedule, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{schedule.name}</Text>
                       
                       <Text>Amount: {schedule.ammount}</Text>
                       <Text>Date: {schedule.date}</Text>
                       <Text>Type: {schedule.notification}</Text>
                       <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(schedule._id)}>
                           <Text style={styles.deleteButtonText}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.footerRow}>
                    <TouchableOpacity style={styles.footerOption} onPress={() => props.navigation.navigate('Home', { user })}>
                        <Image style={styles.logo} source={require("../../assets/home.png")} />
                        <Text>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerOption}onPress={() => props.navigation.navigate('History', { user })}>
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

export default ShowAllSchedule

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginLeft: 20,
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
        marginHorizontal: 15,
        paddingVertical: 16,
    },
    cardContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 100, 
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
})

