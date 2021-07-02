import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,ImageBackground,Image, StatusBar, Alert, FlatList, Dimensions } from 'react-native';
import axios from 'axios';

export default class Meteor extends React.Component{

    constructor(){
        super()
        this.state = {
            meteor:{}
        } 
    }

    componentDidMount(){
        this.getMeteors()
    }

    getMeteors=() => {
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=Mc5LMABDUGDyjTbDqBkpDHDNWqm5GuNKcRJ5MuKX")
        .then((response)=>{
            this.setState({
                meteor: response.data.near_earth_objects
            })
        })
        .catch((error)=>{
            Alert.alert(error.message)
        })
    }

    keyExtractor=(item, index) => {
        index.toString();
    }

    renderItem=({item}) => {
        var bgimg, speed, size

        if( item.threatScore <= 30 ) {
            bgimg = require("../assets/meteor_bg1.png");
            speed= require("../assets/meteor_speed1.gif");
            size = 100;
        }
        else if( item.threatScore <= 75 ) {
            bgimg = require("../assets/meteor_bg2.png");
            speed= require("../assets/meteor_speed2.gif");
            size = 150;
        }
        else{
            bgimg = require("../assets/meteor_bg3.png");
            speed= require("../assets/meteor_speed3.gif");
            size = 200;
        }

        return(
            <View>
                <ImageBackground source={bgimg} style={styles.bgImg} >
                    <View>
                        <Image
                        source={speed}
                        style={{width:size, height:size, alignSelf:'center'}}
                        />
                        <View>
                        <Text style={styles.infoTitle} > {item.name} </Text>
                        <Text style={[styles.infoText, {marginTop:20}]} > Closest to Earth - {item.close_approach_data[0].close_approach_date_full} </Text>
                        <Text style={styles.infoText} > Maximum Diameter (km) - {item.estimated_diameter.kilometers.estimated_diameter_max} </Text>
                        <Text style={styles.infoText} > Minimum Diameter (km) - {item.estimated_diameter.kilometers.estimated_diameter_min} </Text>
                        <Text style={styles.infoText} > Velocity (km/h) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour} </Text>
                        <Text style={styles.infoText} > Missing Earth by (km) - {item.close_approach_data[0].miss_distance.kilometers} </Text>
                        </View>
                    </View>

                </ImageBackground>
            </View>
        )
    }

    render(){
        if(Object.keys(this.state.meteor).length === 0){
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

            var meteorArray = Object.keys(this.state.meteor).map((item)=>{
                return this.state.meteor[item]
            })

            var meteor = [].concat.apply([], meteorArray)
        
                meteor.forEach(element => {
                    var diameter = (element.estimated_diameter.kilometers.estimated_diameter_min+element.estimated_diameter.kilometers.estimated_diameter_max)/2
                    var threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000
                    element.threatScore = threatScore
                });

                //Sorting the meteor array according to the threat score
                meteor.sort(function(a, b){
                    return b.threatScore - a.threatScore
                })

                meteor = meteor.slice(0,5)
            return(
                <View
                style = {{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <SafeAreaView style={styles.safeArea} />  
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={meteor}
                    renderItem={this.renderItem}
                    horizontal={true}

                    />                  
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
    bgImg:{
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    infoTitle:{
        fontSize: 20,
        marginBottom: 10,
        fontWeight:'bold',
        color:'white',
        marginTop:300,
        marginLeft:50
    },
    infoText:{
        color:'white',
        marginTop:5,
        marginLeft:50,

    }
  })