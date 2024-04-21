import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Pressable, Alert } from 'react-native';
import axios, { AxiosError } from 'axios';

import { API_BASE_URL } from './config'; 

const Signin = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const { email, name, phone, photo,address,nid } = response.data.data;

        if (email) {
          props.navigation.navigate('Home', {
            user: {
              email: email as string,
              name: name as string,
              phone: phone as string,
              photo: photo as string,
              address: address as string,
              nid: nid as string,
            },
          });
          console.log('Login successful');
        } else {
          Alert.alert('Login Failed', 'Invalid email or password');
        }
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response?.status === 401) {
          Alert.alert('Login Failed', 'Invalid email or password');
        } else {
          console.error('Error during login:', error);
          Alert.alert('Login Failed', 'An error occurred during login');
        }
      } else {
        console.error('Error during login:', error);
        Alert.alert('Login Failed', 'An error occurred during login');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.text}>Welcome Back</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <Pressable onPress={() => props.navigation.navigate("ForgetPassword")} style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forget your password?</Text>
        </Pressable>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <Pressable onPress={() => props.navigation.navigate("Signup")} style={styles.signupButton}>
          <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink}>Signup</Text></Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
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
  inputContainer: {
    marginTop: 20,
    width: 300,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
  },
  forgotPasswordText: {
    color: "black",
    paddingBottom: 8,
    paddingRight: 10
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end'
  },
  signupText: {
    paddingTop: 10
  },
  signupLink: {
    color: "#6529C9",
    fontWeight: "bold"
  },
  signupButton: {
    marginTop: 10
  }
});
