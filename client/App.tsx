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
import DisplayAllAccount from './src/components/displayAllAccount';
import History from './src/components/history';
import SentMoney from './src/components/sentMoney';
import ReceivedMoney from './src/components/receivedMoney';
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
        <Stack.Screen name="DisplayAllAccount" component={DisplayAllAccount} options={{ headerShown: false }}  />
        <Stack.Screen name="History" component={History} options={{ headerShown: false }}  />
        
        <Stack.Screen name="SentMoney" component={SentMoney} options={{ headerShown: false }}  />
        
        <Stack.Screen name="ReceivedMoney" component={ReceivedMoney} options={{ headerShown: false }}  />

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


