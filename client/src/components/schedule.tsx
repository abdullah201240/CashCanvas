import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Schedule = (props:any) => {
    const { user } = props.route.params;

    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Text style={styles.headerText}>Schedule</Text>
                <Image style={styles.logo} source={require('../../assets/logo1.png')} />
            </View>




            
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem} onPress={() => props.navigation.navigate('Home', { user })}>
                    <Image style={styles.footerIcon} source={require("../../assets/home.png")} />
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => props.navigation.navigate('History', { user })}>
                    <Image style={styles.footerIcon} source={require("../../assets/history.png")} />
                    <Text>History</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerItem}>
                    <Image style={styles.footerIcon} source={require("../../assets/schedule.png")} />
                    <Text>Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <Image style={styles.footerIcon} source={require("../../assets/notifications.png")} />
                    <Text>Inbox</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Schedule

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        backgroundColor: 'green',
    },
    headerText: {
        color: 'white',
        fontSize: 24,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 50,
        marginBottom: 10,
        alignSelf: 'center',
    },
    scrollContent: {
        flexGrow: 1,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
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
        alignSelf: 'center',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 40,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    footerItem: {
        alignItems: 'center',
    },
    footerIcon: {
        width: 30,
        height: 35,
        resizeMode: 'contain',
    },
});