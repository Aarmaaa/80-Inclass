import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,Alert, StatusBar,Image, ImageBackground } from 'react-native';
import axios from 'axios';

export default class IssInfo extends React.Component{
   
    constructor(props){
        super(props);
        this.state={
           location:{}, 
        }
    }

    componentDidMount(){
        this.getIssLocation()
        try{
            setInterval(async() => {
                this.getIssLocation()
            },5000)
        }
        catch(error){
            console.log(error);
        }
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
            )
        }
    }
}
const styles = StyleSheet.create({
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