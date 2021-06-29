import React from 'react';
import { StyleSheet, Text, View,SafeAreaView, StatusBar, Alert } from 'react-native';
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
            return(
                <View
                style = {{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize:20, fontWeight:"bold"}} >Meteros</Text>
                    
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
  })