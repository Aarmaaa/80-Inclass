import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,Alert, StatusBar,Image, ImageBackground } from 'react-native';
import axios from 'axios';
import MapView,{Marker} from 'react-native-maps';

export default class IssTracker extends React.Component{
   
    constructor(props){
        super(props);
        this.state={
           location:{}, 
        }
    }

    componentDidMount(){
        this.getIssLocation();
    }

    getIssLocation = () => {
        axios.get("https://api.wheretheiss.at/v1/satellites/25544")
        .then((response)=>{
            this.setState({
                location : response.data
            })
        })
        .catch((error)=>{
            Alert.alert(error.message);
        })
    }
   
    render(){
        if(Object.keys(this.state.location).length === 0){
            return(
                <View
                style = {{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>
                        Loading...
                    </Text>
                </View>
            )
        }

        else{
            return(
                <View style = {styles.container}>
                    <SafeAreaView style={styles.safeArea} >
                        <ImageBackground source={require("../assets/bg.png")} style={styles.bg} >
                            <View style={styles.titleBar}>
                                <Text style = {styles.titleText}>ISS LOCATION</Text>
                            </View>
                            <View
                            style = {{
                                flex: 0.7
                            }}>
                                <MapView region = {{
                                    latitude:this.state.location.latitude,
                                    longitude: this.state.location.longitude,
                                    latitudeDelta: 100,
                                    longitudeDelta: 100,
                                }} 
                                style={{width:'100%', height:'100%'}}
                                >
                                    <Marker
                                    coordinate={{
                                        latitude:this.state.location.latitude,
                                        longitude: this.state.location.longitude,
                                    }}
                                    />
                                    <Image
                                    source={require('../assets/iss.png')}
                                    style={{width:50, height:50}}
                                    />

                                </MapView>
                            </View>
                            
                            <View style={styles.infoContainer} >
                                <Text style={styles.infoText}>
                                latitude:{this.state.location.latitude} 
                                </Text>
                                <Text style={styles.infoText}>
                                longitude:{this.state.location.longitude} 
                                </Text>
                                <Text style={styles.infoText}>
                                velocity:{this.state.location.velocity} 
                                </Text>
                                <Text style={styles.infoText}>
                                altitude:{this.state.location.altitude} 
                                </Text>
                            </View>
                            
                        </ImageBackground>
                    </SafeAreaView>
                </View>
            )
        }
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
    bg: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
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
    infoText: {
        fontSize: 15,
        color: "black",
        fontWeight: 'bold'
    },
    infoContainer: {
        flex: 0.2,
        backgroundColor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    }
  })