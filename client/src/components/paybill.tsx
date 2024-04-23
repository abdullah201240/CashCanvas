import { ScrollView, StyleSheet, Text, View,Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
const data = [
    { label: 'Electricity', value: 'Electricity' },
    { label: 'Gas', value: 'Gas' },
    { label: 'Water', value: 'Water' },
    { label: 'Internet', value: 'Internet' },
    { label: 'Telephone', value: 'Telephone' },
    { label: 'TV', value: 'TV' },

    
];
const Paybill = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState<string | null>(null); 
    const [amount, setAmount] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.navbar, { backgroundColor: 'green' }]}>
                <View style={styles.leftNavbar}>
                    <Text style={{ color: 'white', fontSize: 50, paddingTop: 20 }}>Pay Bill</Text>
                </View>
                <View style={styles.rightNavbar}>
                    <Image style={styles.logo} source={require('../../assets/logo1.png')} />
                </View>
            </View>

            <View style={styles.contentContainer}>
            <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    data={data}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Al Organizations' : '...'}
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
  )
}

export default Paybill

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