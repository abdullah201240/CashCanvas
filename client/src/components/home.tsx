import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { LineChart } from "react-native-chart-kit";
const Home = (props: any) => {
  const { user } = props.route.params;

  return (
    <ScrollView style={styles.container}>

      <View style={[styles.navbar, { backgroundColor: 'green' }]}>
        <View style={styles.leftNavbar}>
          {user.photo === "photo" ? (
            <Image style={styles.logo} source={require("../../assets/user.png")} />
          ) : (
            <Image style={styles.logo} source={require("../../assets/logo.png")} />
          )}
          <View style={styles.nameAndAmount}>
            <Text style={{ fontSize: 20, color: "white" }}>{user.name}</Text>
            <Text style={{ fontSize: 50, color: "white" }}>500 tk</Text>
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
              <Image style={styles.logo} source={require("../../assets/addmoney.webp")} />
              <Text>Add Card</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Image style={styles.logo} source={require("../../assets/sentMoney.png")} />
            <Text>Sent Money</Text>
          </View>
          <View style={styles.option}>
            <Image style={styles.logo} source={require("../../assets/pyment.jpeg")} />
            <Text>Make Payment</Text>
          </View>
        </View>
        <View style={styles.optionsRow}>
          <View style={styles.option}>
            <Image style={styles.logo} source={require("../../assets/recived_money.png")} />
            <Text>Received Money</Text>
          </View>
          <View style={styles.option}>
            <Image style={styles.logo} source={require("../../assets/paybill.png")} />
            <Text>Pay Bill</Text>
          </View>
        </View>
      </View>
      <View style={styles.chart}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Expense Chart</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
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
    fontSize: 80
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



});
