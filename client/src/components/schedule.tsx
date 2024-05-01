import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker'; // Update import
const data = [
    { label: 'Once', value: 'Once' },
    { label: 'Every Month', value: 'Every Month' },
];

const Schedule = (props: any) => {
    const { user } = props.route.params;
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [value, setValue] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(new Date()); 

    const handleAddCard = () => {
        console.log(name)
        console.log(amount)

        console.log(pin)

        console.log(value)

        console.log(date)

    };

    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={styles.container}>
            <View style={[styles.navbar, { backgroundColor: 'green' }]}>
                <View style={styles.leftNavbar}>
                    <Text style={{ color: 'white', fontSize: 50, paddingTop: 20 }}>Schedule</Text>
                </View>
                <View style={styles.rightNavbar}>
                    <Image style={styles.logo} source={require('../../assets/logo1.png')} />
                </View>
            </View>

            <View style={styles.contentContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    value={amount}
                    onChangeText={setAmount}
                />
                <Text> Pick  date</Text>

                <View style={styles.input1}>
                    <DateTimePicker
                        value={date || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setDate(currentDate);
                        }}
                    />
                </View>


                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    data={data}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Notification Type' : '...'}
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
                    placeholder="PIN"
                    secureTextEntry
                    value={pin}
                    onChangeText={setPin}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={handleAddCard}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footerContainer}>
                <View style={styles.footerRow}>
                    <View style={styles.footer}>
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
        </View>
    )
}

export default Schedule;

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
        marginLeft: 60,
    },
    rightNavbar: {
        flexDirection: 'row',
        marginLeft: 70,
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
    input1: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 40,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
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
    datePicker: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 40,
        width: 350,
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
    footerContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flex: 1,
    },
    footer: {
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
