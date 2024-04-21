import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, Image, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
const AddCard = (props: any) => {
    const [cardNumber, setCardNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [accountType, setAccountType] = useState('card'); // Default to 'card'

    const handleSignup = () => {
        // Add your signup logic here
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={[styles.navbar, { backgroundColor: 'green' }]}>
                <View style={styles.leftNavbar}>

                    <Text style={{ color: "white", fontSize: 50, paddingTop: 20 }}>Add Card</Text>
                </View>
                <View style={styles.rightNavbar}>
                    <Image style={styles.logo} source={require("../../assets/logo1.png")} />
                </View>
            </View>
            <KeyboardAvoidingView style={styles.contentContainer} behavior="padding" enabled>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Card Number"
                        value={cardNumber}
                        onChangeText={(text) => setCardNumber(text)}
                    />
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={(value) => setAccountType(value)}
                        items={[
                            { label: 'Card', value: 'card' },
                            { label: 'Bkash', value: 'bkash' },
                            { label: 'Nagad', value: 'nogot' },
                            { label: 'Rocket', value: 'roket' },
                            { label: 'Upay', value: 'upay' },
                        ]}
                        value={accountType}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        value={amount}
                        onChangeText={(text) => setAmount(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Pin"
                        secureTextEntry
                        value={pin}
                        onChangeText={(text) => setPin(text)}
                    />
                    
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        marginLeft: 50,


    },
    rightNavbar: {
        flexDirection: 'row',
        marginLeft: 60,
        marginTop: 20
    },

    contentContainer: {

        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 120,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 350,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 40,
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
        marginLeft: 70
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',

        borderRadius: 50,
        color: 'black',
        paddingRight: 30,
        marginBottom: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 50,
        color: 'black',
        paddingRight: 30,
        marginBottom: 10,
    },

});
