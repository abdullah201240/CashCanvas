import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { API_BASE_URL } from './config';

const Profile = (props: any) => {
    const { user } = props.route.params;

    const apiUrl = `${API_BASE_URL}/UpdateProfileImage`;
    const [image, setImage] = useState('');
    const [profile, setProfile] = useState<Profile | null>(null); // State to hold the fetched profile

    interface Profile {
        name: string;
        phone: string;
        email: string;
        address: string;
        nid: string;
        photo: string;
    }
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/Profile`, {
                    params: {
                        email: user.email,
                    },
                });
                console.log(response.data);

                if (!response) {
                    throw new Error('No account types found');
                }

                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching account types:', error);
            }
        };

        if (user && user.email) {
            fetchProfile();
        }
    }, [user]);


    const pickSomething = async () => {
        try {
            const docRes = await DocumentPicker.getDocumentAsync({
                type: "image/*",
            });
            const formData = new FormData();
            const assets = docRes.assets;
            if (!assets) return;
            const file = assets[0];

            const imageFile = {
                name: file.name,
                uri: file.uri,
                type: file.mimeType,
                size: file.size,
            };
        formData.append("email", user.email);

        formData.append("photo", imageFile as any);
        const axiosConfig = {
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "multipart/form-data",
                    },
                  };
         const response = await axios.put(apiUrl, formData, axiosConfig);

          setImage(response.data.image);



        } catch (error) {
            console.error("Error while selecting file: ", error);

        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={[styles.navbar, { backgroundColor: 'green' }]}>
                <View style={styles.leftNavbar}>
                    <Text style={{ color: 'white', fontSize: 50, paddingTop: 20 }}>Profile</Text>
                </View>
                <View style={styles.rightNavbar}>
                    <Image style={styles.logo} source={require('../../assets/logo1.png')} />
                </View>
            </View>

            <View style={styles.contentContainer} >
            {profile && <Image style={styles.img} source={{ uri: `${API_BASE_URL}/${profile.photo}` }} />}
                <TouchableOpacity style={styles.buttonContainer} onPress={pickSomething}>
                    <Text style={styles.buttonText}>Set Image</Text>


                </TouchableOpacity>

                {profile && <Text>Name: {profile.name}</Text>}





            </View>




        </ScrollView>
    )
}

export default Profile

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
        marginLeft: 90,
    },
    rightNavbar: {
        flexDirection: 'row',
        marginLeft: 100,
        marginTop: 29,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
   img: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 100, 
    marginBottom: 10,
    marginTop: 30,
},

    
    
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
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
})
