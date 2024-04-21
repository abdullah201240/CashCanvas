import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

const Opening = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
        async function authenticate() {
          try {
            const result = await LocalAuthentication.authenticateAsync();
            setIsAuthenticated(result.success);
          } catch (error) {
            console.error('Authentication error:', error);
          }
        }
        authenticate();
      }, []);
    
      if (!isAuthenticated) {
        return (
          <View style={styles.container}>
            <Text>Authenticating...</Text>
          </View>
        );
      }
    return (
        <SafeAreaView style={styles.scrollViewContainer}>
          <Image style={styles.logo} source={require("../../assets/logo.png")} />
          <Text style={styles.text}>CashCanvas</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Signin')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainerSignup} onPress={() => props.navigation.navigate('Signup')}>
            <Text style={styles.buttonSignupText}>Sign Up</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    };
    
    export default Opening;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      scrollViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
      },
      text: {
        fontSize: 40,
        fontWeight: "bold",
        paddingBottom: 10,
        color: "black",
      },
      buttonText: {
        color: "white",
        fontSize: 18,
      },
      buttonContainer: {
        marginTop: 12,
        height: 50,
        width: 200,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginBottom: 10,
      },
      buttonContainerSignup: {
        marginTop: 10,
        height: 50,
        width: 200,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: "green",
      },
      buttonSignupText: {
        color: "green",
        fontSize: 18,
      },
    });
    
    