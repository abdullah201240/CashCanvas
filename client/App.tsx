import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Opening from './src/components/opening';
import Signin from './src/components/signin';
import Signup from './src/components/signup';

import Home from './src/components/home';
import AddCard from './src/components/addCard';
import Paybill from './src/components/paybill';
import MakePayment from './src/components/makePayment';
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Opening" component={Opening} options={{ headerShown: false }}  />
        <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }}  />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}  />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
        <Stack.Screen name="AddCard" component={AddCard} options={{ headerShown: false }}  />
        
        <Stack.Screen name="Paybill" component={Paybill} options={{ headerShown: false }}  />
        <Stack.Screen name="MakePayment" component={MakePayment} options={{ headerShown: false }}  />

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


