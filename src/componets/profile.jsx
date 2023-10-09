import React from 'react';
import { Text, View, Button, ScrollView, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

let trackPlayed = []


const Profile = ({navigation, route}) => {
  let {trackPlaying, tracksPlayed} = route.params
  if(trackPlaying!="")
  trackPlaying =  JSON.parse(trackPlaying)
  //trackPlayed = JSON.parse(tracksPlayed) 

  const getData = async() => {
    let collect

    let read = await AsyncStorage.getItem("played").then(
      (values) => {
        collect= values;
        console.log('Then: ',values);
        trackPlayed = JSON.parse(collect)
        

      })
    //console.log("final", read) 
    return collect
  }

  let dataString = getData()
  

  return (
    <View style={styles.container}>
      
      <View style={styles.barContainer} > 
          <Button style={styles.button} color="#162238" title = "<" onPress={() => {navigation.navigate('Playing',{
                    trackPlaying: `${JSON.stringify(trackPlaying)}`, 
                    tracksPlayed: `${JSON.stringify(tracksPlayed)}`, 
                    })
            }}/>
          <View>
            <Text style={styles.bartitle1}> Profile page </Text>
          </View>
          <Button style={styles.button} color="#162238" title = "\/" onPress={() => {navigation.navigate('Top10',{
                    trackPlaying: `${JSON.stringify(trackPlaying)}`, 
                    tracksPlayed: `${JSON.stringify(trackPlayed)}`, 
                    })}}/>  

      </View>

      <View style={styles.titles}>
      <Text style={styles.title1} >Mi Perfil</Text>
      <Text style={styles.title2} >Ultimas canciones reproducidas</Text>
      </View>
      <ScrollView style={styles.list}>
            {
              

              trackPlayed.map( (track, index) => (
                <View key={index} style={styles.card}>
                <Image
                style={styles.cover}
                source={{
                  uri: `${track.img}`
                }}
                />
                <View style={styles.info}> 
                  <Text style={styles.position} > #{index +1}    |    {track.listeners} listeners</Text>
                  <Text style={styles.title} > {track.name}</Text>
                  <View style={styles.bottomcard}> 
                    <Text style={styles.artist} > {track.artist}</Text>
                  </View> 
                </View>
                
                </View>
                )
              )
            }
          
      </ScrollView>
    </View>
            

   
  )
    
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: '#162238',
  },
  list:{
    height: '63%',
    backgroundColor: '#162238',
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
  titles: {
    textAlign:'center',
    height: '30%',
    fontSize: 40,
    color : 'white',
    
  },
  title1: {
    marginTop: 70,
    textAlign:'center',
    fontSize: 40,
    color : 'white',
    
  },
  title2: {
    textAlign:'center',
    fontSize: 25,
    color : 'white',
    
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
  bartitle1:{
    fontSize: 11,
    color: 'gray',
    textAlign: 'center',
  },
  bartitle2:{
    color: 'white',
    textAlign: 'center',
  },
  
});
export default React.memo(Profile);
