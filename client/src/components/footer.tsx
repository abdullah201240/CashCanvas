import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'

const Footer = (props: any) => {
    
  return (
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

  )
}

export default Footer

const styles = StyleSheet.create({
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
      logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
      },
})