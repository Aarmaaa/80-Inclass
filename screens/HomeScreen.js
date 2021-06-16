import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component{

    render(){
        return(
            <View>
                <View style={styles.container} >
                    <Text style = {{fontWeight: 'bold'}}>ISS Tracker</Text>
                </View>

                <TouchableOpacity 
                onPress={()=>{
                    this.props.navigation.navigate("IssTracker")
                }}
                >
                    <Text>Iss Location</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                onPress={()=>{
                    this.props.navigation.navigate("Meteors")
                }}
                >
                    <Text>Meteor</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={()=>{
                    this.props.navigation.navigate("Updates")
                }}
                >
                    <Text>News Updates</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
  }  
})