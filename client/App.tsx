import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Opening from './src/components/opening';
import Signin from './src/components/signin';
import Signup from './src/components/signup';

import Home from './src/components/home';
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Opening" component={Opening} options={{ headerShown: false }}  />
        <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }}  />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}  />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


