import React from 'react';
import {ScrollView, Image, StyleSheet, Text, View, Button, Alert, ViewComponent} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import dataProvicional from '../componets/dataprovisional'
import Constants from 'expo-constants'

let trackPlayed = []
let tracksData = []

function filtrar (data){

  const datafilter = data.map(track => {
    return {
      "name" : track.name, 
      "listeners": track.listeners,
      "artist" : track.artist.name,
    }
  })
  /* console.log(JSON.stringify(datafilter)) */
  return datafilter
}

async function fetchData(){
  let data = ''
  try {
    const res = await fetch("http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=mexico&api_key=be8c6a4c47c8e04774909a893e4c64fe&format=json");
    data = await res.json();
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
  console.log(data)
  return data;
}

async function storedata (data){
    try {
      await AsyncStorage.setItem('data', JSON.stringify(data));
      console.log("data stored")
    } catch (error) {
      console.log(error);
    }
  };

const Top10 = ({navigation}) => {
  // const data = fetchData()
  const provisional = dataProvicional.tracks.track.slice(0,10) // Quitar
  const filtro = filtrar(provisional)
  tracksData =  filtro
  /* console.log("loaded") */

  const addTrack = async (item) => {
    trackPlayed.push(item)
    await AsyncStorage.setItem("playing", JSON.stringify(item))
    await AsyncStorage.setItem("played", JSON.stringify(trackPlayed))
  }
  
  return(
    <View style={styles.container}>
      <View style={styles.barContainer} > 
          <Button style={styles.button} color="#162238" title = "<" onPress={() => console.log("back")}/>
          <View>
            <Text style={styles.title1}> Playing from </Text>
            <Text style={styles.title2}> Mx,  Top tracks this Week </Text>
          </View>
          <Button style={styles.button} color="#162238" title = "..." onPress={() => {navigation.navigate('Profile')}}/>  

      </View>
      
      <ScrollView style={styles.list} >

          {
            tracksData.map( (track, index) => (
              <View key={index} style={styles.card}>
              <Image
              style={styles.cover}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png'
              }}
              />
              <View style={styles.info}> 
                <Text style={styles.position} > #{index +1}    |    {track.listeners} listeners</Text>
                <Text style={styles.title} > {track.name}</Text>
                <View style={styles.bottomcard}> 
                  <Text style={styles.artist} > {track.artist}</Text>
                  <Button style={styles.button} title = "▶" onPress={() => {addTrack(track)
                  navigation.navigate('Playing')}}/> 
                </View> 
              </View>
              
              </View>
              )
            )
          }
        
      </ScrollView>
    </View>
    
  ) 

};


const styles = StyleSheet.create({
  container:{
    backgroundColor: '#162238',
  },
  list:{
    height: '93%',
    
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#162238',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 35,
    marginBottom:10,
    marginLeft: 10,
  },
  cover: {
    width: 90, 
    height: 90, 
  },
  info: {
    width: 280,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,

  },
  position: {
    color: 'gray',
    fontSize: 12,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  bottomcard: {
    display: 'flex',
    flexDirection: 'row'

  },
  artist: {
    width:250,
    color: 'gray',
    fontSize: 15,
    marginTop: 8,
  },
  button: {
    width: 5,
    
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#162238',
    textAlign: 'center',
    color: 'white',
    
  },
  title1:{
    fontSize: 11,
    color: 'gray',
    textAlign: 'center',
  },
  title2:{
    color: 'white',
    textAlign: 'center',
  },
  
});

export default Top10;
