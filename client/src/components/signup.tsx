import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config'; 
import * as Contacts from 'expo-contacts';

const Signup = (props: any) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [nid, setNid] = useState('');
  const [contactSuggestions, setContactSuggestions] = useState<string[]>([]);
  
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        const validEmails = data
          .filter(contact => contact.emails && contact.emails.length > 0)
          .map(contact => contact.emails![0].email) 
          .filter(email => email !== undefined); 
        setContactSuggestions(validEmails);
      } else {
        console.error('Permission to access contacts was denied');
      }
    })();
  }, []);

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Signup`, {
        name: name,
        phone: phone,
        email: email,
        password: password,
        address:address,
        nid: nid
      });
      if (response) {
        Alert.alert('Success', 'Signup successful');
        props.navigation.navigate('Signin');
      } else {
        Alert.alert('Error', 'Signup failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Signup failed. Please try again later.');
    }
  };
  
 

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.text}>Create Account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
         <View style={styles.emailSuggestionsContainer}>
            {contactSuggestions.map((contactEmail, index) => (
              <TouchableOpacity key={index} onPress={() => setEmail(contactEmail)}>
                <Text style={styles.emailSuggestion}>{contactEmail}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nid"
            value={nid}
            onChangeText={(text) => setNid(text)}
          />
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signupButton}>
          <Text style={styles.signupText}>
            Already have an account?{' '}
            <Text style={styles.signupLink} onPress={() => props.navigation.navigate('Signin')}>
              Login
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
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
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'black',
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
  },
  inputContainer: {
    marginTop: 20,
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
  signupText: {
    paddingTop: 10,
  },
  signupLink: {
    color: '#6529C9',
    fontWeight: 'bold',
  },
  signupButton: {
    marginTop: 10,
  },
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailSuggestionsContainer: {
    marginTop: 5,
    width: '100%',
    alignItems: 'flex-start',
  },
  emailSuggestion: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 5,
    fontSize: 16,
    color: 'black',
  },
});
