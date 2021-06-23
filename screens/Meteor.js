import React from 'react';
import { StyleSheet, Text, View,SafeAreaView, StatusBar } from 'react-native';

export default class Meteor extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
            <SafeAreaView style={styles.safeArea}>
                
                <Text>Meteor</Text>
            
            </SafeAreaView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    safeArea:{
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
  })