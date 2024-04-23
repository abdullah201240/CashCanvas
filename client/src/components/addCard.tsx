import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // Assuming this is the correct import statement
import axios from 'axios';
import { API_BASE_URL } from './config';

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
