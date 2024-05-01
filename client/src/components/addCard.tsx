import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // Assuming this is the correct import statement
import axios from 'axios';
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
 

const data = [
    { label: 'Card', value: 'Card' },
    { label: 'Bkash', value: 'Bkash' },
    { label: 'Nagad', value: 'Nagad' },
    { label: 'Rocket', value: 'Rocket' },
    { label: 'Upay', value: 'Upay' },
    
];

const AddCard = (props:any) => {
    const { user } = props.route.params;
    const [cardNumber, setCardNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [value, setValue] = useState<string | null>(null); 
    const [isFocus, setIsFocus] = useState(false);

    const [expoPushToken, setExpoPushToken] = useState<string>('');
    const [notification, setNotification] = useState<NotificationData | null>(null);
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();


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
    
        return () => {
          if (notificationListener.current) {
            Notifications.removeNotificationSubscription(notificationListener.current);
          }
          if (responseListener.current) {
            Notifications.removeNotificationSubscription(responseListener.current);
          }
        };
      }, []);
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

                const response = await axios.post(`${API_BASE_URL}/AddCards`, {
                    email: user.email,
                    cardNumber:cardNumber,
                    cardType: value,
                    ammount:amount
                    
                     
                });
                console.log(response)


                if (response) {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                          title: "Card Add",
                          body: 'Card added successfully',
                          
                        },
                        trigger: { seconds: 2 },
                      });
                    Alert.alert('Success', 'Card added successfully');
                    props.navigation.navigate('Home', { user });
                } else {
                    Alert.alert('Error', 'Card addition failed');
                }
            } catch (error) {
                console.log(error)
                Alert.alert('Error', 'Card addition failed. Please try again later.');
            }
        } else {
            Alert.alert('Error', 'Wrong PIN');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={[styles.navbar, { backgroundColor: 'green' }]}>
                <View style={styles.leftNavbar}>
                    <Text style={{ color: 'white', fontSize: 50, paddingTop: 20 }}>Add Account</Text>
                </View>
                <View style={styles.rightNavbar}>
                    <Image style={styles.logo} source={require('../../assets/logo1.png')} />
                </View>
            </View>
            <View style={styles.contentContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Card Number"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                />
                 


                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    data={data}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Account Type' : '...'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    value={amount}
                    onChangeText={setAmount}
                />
                <TextInput
                    style={styles.input}
                    placeholder="PIN"
                    secureTextEntry
                    value={pin}
                    onChangeText={setPin}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={handleAddCard}>
                    <Text style={styles.buttonText}>Add</Text>
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
          
        </View>
      </View>




        </ScrollView>
    );
};

export default AddCard;

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
