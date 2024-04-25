import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { API_BASE_URL } from './config';
import { LineChart } from "react-native-chart-kit";
import { useFocusEffect } from '@react-navigation/native';
const Home = (props: any) => {
  const { user } = props.route.params;
  const [amount, setAmount] = useState('');
  const [dailyTransactions, setDailyTransactions] = useState({});

  const totalemount = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/AllAmount`, {
        params: {
          email: user.email,
        },
      });

      if (!response) {
        throw new Error('No account types found');
      }

      setAmount(response.data.totalAmount);
    } catch (error) {
      console.error('Error fetching account types:', error);
    }
  };
  const fetchDailyTransactions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/AllCost`, {
        params: {
          email: user.email,
        },
      });

      setDailyTransactions(response.data.dailyTransactions || {});
    } catch (error) {
      console.error('Error fetching daily transactions:', error);
    }
  };

  useEffect(() => {

    if (user && user.email) {
      totalemount();
      fetchDailyTransactions();

    }
  }, [user]);
  useFocusEffect(
    React.useCallback(() => {
      totalemount();
      fetchDailyTransactions();

    }, [])
  );

  return (
    <ScrollView style={styles.container}>


      <View style={[styles.navbar, { backgroundColor: 'green' }]}>
        <View style={styles.leftNavbar}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Profile', { user })}>
          {user.photo === "photo" ? (
            <Image style={[ styles.roundedImage]} source={require("../../assets/user.png")} />
          ) : (
            <Image style={[ styles.roundedImage]} source={{ uri: `${API_BASE_URL}/${user.photo}` }} />
          )}
          </TouchableOpacity>

          <View style={styles.nameAndAmount}>
            <Text style={{ fontSize: 20, color: "white" }}>{user.name}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('DisplayAllAccount', { user })}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.buttonText}>{amount}</Text>
                <Image
                  style={{ width: 25, height: 25, resizeMode: 'contain', marginLeft: 5 }}
                  source={require("../../assets/5784811.png")}
                />
              </View>
            </TouchableOpacity>
          </View>


        </View>
        <View style={styles.rightNavbar}>
          <Image style={styles.logo} source={require("../../assets/logo1.png")} />
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <View style={styles.option}>
            <TouchableOpacity onPress={() => props.navigation.navigate('AddCard', { user })}>
              <Image style={[styles.logo, { marginLeft: 12 }]} source={require("../../assets/addmoney.webp")} />
              <Text>Add Card</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <TouchableOpacity onPress={() => props.navigation.navigate('SentMoney', { user })}>
              <Image style={[styles.logo, { marginLeft: 16 }]} source={require("../../assets/sentMoney.png")} />
              <Text>Sent Money</Text>
            </TouchableOpacity>


          </View>
          <View style={styles.option}>
            <TouchableOpacity onPress={() => props.navigation.navigate('MakePayment', { user })}>
              <Image style={[styles.logo, { marginLeft: 22 }]} source={require("../../assets/pyment.png")} />
              <Text>Make Payment</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.optionsRow}>
          <View style={styles.option}>

          <TouchableOpacity onPress={() => props.navigation.navigate('ReceivedMoney', { user })}>
          <Image style={[styles.logo, { marginLeft: 22 }]}source={require("../../assets/recived_money.png")} />
            <Text>Received Money</Text>
            </TouchableOpacity>
            
          </View>
          <View style={styles.option}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Paybill', { user })}>
              <Image style={styles.logo} source={require("../../assets/paybill.png")} />
              <Text>Pay Bill</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
      <View style={styles.chart}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Expense Chart</Text>
        <LineChart
          data={{
            labels: Object.keys(dailyTransactions),
            datasets: [
              {
                data: Object.values(dailyTransactions),
              },
            ],

          }}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
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
}

export default Home;

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
    fontSize: 80,
    height: 150
  },
  leftNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameAndAmount: {
    marginLeft: 10,

  },
  rightNavbar: {},
  optionsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 20,
  },
  chart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  buttonText: {
    color: "green",
    fontSize: 18,
  },
  buttonContainer: {
    height: 40,
    width: 150,
    backgroundColor: "white",
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",

  },
  roundedImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 100, 
    marginBottom: 10,
    marginTop: 30,
  },


});
