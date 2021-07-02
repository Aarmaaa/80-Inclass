import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import IssTracker from './screens/IssTraker';
import Meteor from './screens/Meteor';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";

const Stack = createStackNavigator()

export default function App() {
  
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="IssTracker" component={IssTracker} />
        <Stack.Screen name="Meteors" component={Meteor} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
