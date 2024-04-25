import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { API_BASE_URL } from './config';

const Profile = (props: any) => {
    const { user } = props.route.params;

    const apiUrl = `${API_BASE_URL}/UpdateProfileImage`;
    const [image, setImage] = useState('');
    const [profile, setProfile] = useState<Profile | null>(null);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState('');
    const [saving, setSaving] = useState('');





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
                setName(response.data.name);
                setAddress(response.data.address);
                
                setSalary(response.data.salary);
                setSaving(response.data.saving);


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
    const handleNameChange = (text: string) => {
        setName(text);
    };

    const handleAddressChange = (text: string) => {
        setAddress(text);
    };
    const handleSalaryChange = (text: string) => {
        setSalary(text);
    };
    const handleSavingChange = (text: string) => {
        setSaving(text);
    };

    const handleUpdateProfile = async () => {
        console.log(name)
        console.log(address)


    }

    return (
        <View style={styles.container}>
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







            </View>
            <ScrollView style={styles.contentContainer} >
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={handleNameChange}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Nid"
                    value={profile?.nid || ""}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={profile?.phone || ""}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={profile?.email || ""}
                    editable={false}

                />

                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={handleAddressChange}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Salary"
                    value={salary}
                       
                    onChangeText={handleSalaryChange}
                    />
                <TextInput
                    style={styles.input}
                    placeholder="Saving"
                    value={saving}
                    onChangeText={handleSavingChange}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={handleUpdateProfile}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>

            </ScrollView>

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




        </View>
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
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 50,
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
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 40,
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
})
