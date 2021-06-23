import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, SafeAreaView, Platform, ImageBackground,Image } from 'react-native';

export default class HomeScreen extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style = {styles.safeArea}>
                    <ImageBackground source={require('../assets/bg.png')} style={styles.bg}>

                        <View style = {styles.titleBar} >
                            <Text style = {styles.titleText}>ISS Tracker</Text>
                        </View>

                        <TouchableOpacity 
                        style = {styles.button}
                        onPress={()=>{
                            this.props.navigation.navigate("IssTracker")
                        }}
                        >
                            <Text style = {styles.text}>Iss Location</Text>
                            <Text style={styles.knowMore}>Know More</Text>
                            <Text style = {styles.bgdigit}>1</Text>
                            <Image source={require("../assets/iss.png")} style={styles.iconImage} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                        style = {styles.button}
                        onPress={()=>{
                            this.props.navigation.navigate("Meteors")
                        }}
                        >
                            <Text style = {styles.text}>Meteor</Text>
                            <Text style={styles.knowMore}>Know More</Text>
                            <Text style = {styles.bgdigit}>2</Text>
                            <Image source={require("../assets/meteor.png")} style={styles.iconImage} />
                        </TouchableOpacity>

                        <TouchableOpacity
                        style = {styles.button}
                        onPress={()=>{
                            this.props.navigation.navigate("Updates")
                        }}
                        >
                            <Text style = {styles.text}>News Updates</Text>
                            <Text style = {styles.bgdigit}>3</Text>
                        </TouchableOpacity>
                   
                    </ImageBackground>
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
  bg: {
     flex: 1,
     resizeMode: 'cover'
  },
  safeArea:{
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  titleBar:{
      flex:0.15,
      justifyContent:'center',
      alignItems:'center',
  },
  titleText:{
      fontSize:40,
      fontWeight:'bold',
      color:'white'
  },
  button:{
      flex: 0.25,
      marginLeft:50,
      marginTop:50,
      marginRight:50,
      width: 200,
      backgroundColor:'white',
      borderRadius:30,
      
      justifyContent:'center',
  },
  text:{
      fontSize:35,
      fontWeight:'bold',
      color:'black',
      marginTop:45,
      paddingLeft:20,
  },
  iconImage: {
      position: 'absolute',
      height: 150,
      width: 150,
      right: 20,
      top: -55,
      resizeMode: 'contain'
  },
  knowMore: {
    paddingLeft: 20,
    color: 'red',
    fontSize: 20
  },
  bgdigit:{
      position:'absolute',
      color:"rgba(180, 180, 180, 0.3)",
      fontSize:150,
      right:10,
  }
 
})