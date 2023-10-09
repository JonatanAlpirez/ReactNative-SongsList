import React from 'react';
import {TouchableHighlight, ImageBackground, ScrollView, Image, StyleSheet, Text, View, Button, Alert, ViewComponent} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import dataProvicional from '../componets/dataprovisional'
import Constants from 'expo-constants'

let trackPlayed = []
let tracksData = []

function filtrar (data){
  const imgs = ["https://www.efeeme.com/wp-content/uploads/2023/02/radiohead_pablo_honey_08_02.jpg",
  "https://cdn.zendalibros.com/wp-content/uploads/seven-nation-army.jpg","https://upload.wikimedia.org/wikipedia/en/5/52/Franz_Ferdinand_-_Take_Me_Out.jpg", "https://i.scdn.co/image/ab67616d0000b273ccdddd46119a4ff53eaf1f5d","https://www.udiscovermusic.com/wp-content/uploads/2019/04/Tame-Impala-Currents-album-cover-web-optimised-820-820x820.jpg", "https://i.pinimg.com/originals/34/c2/f3/34c2f3cb3e5da49341abdd0642933ce3.jpg","https://vectorseek.com/wp-content/uploads/2023/06/The-Strokes-Logo-Vector.jpg", "https://indierocks.sfo3.digitaloceanspaces.com/wp-content/uploads/2022/08/gorillaz_2022_7.jpg", "https://i.scdn.co/image/ab67706c0000da84d5fd5599e729f985933d89a5", "https://upload.wikimedia.org/wikipedia/en/3/37/KarmaPolice.jpg"
  ]
  const datafilter = data.map((track,i) => {

    return {
      "name" : track.name, 
      "listeners": track.listeners,
      "artist" : track.artist.name,
      "img": `${imgs[i]}`
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
  //console.log("Data fetched:", JSON.stringify(data))
  data= data.tracks.track.slice(0,10)
  //console.log("Data fetched top 10:", JSON.stringify(data))
  data = filtrar(data)
  //console.log("Data fetched filtered:", JSON.stringify(data))
  tracksData =  data
  //console.log("Data tracks:", JSON.stringify(tracksData))
  
  return data;
}

const Top10 = ({navigation,route}) => { 
  //let {trackPlaying, tracksPlayed} = route.params
  

  //const data = fetchData()
  

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
          <Button style={styles.button} color="#162238" title = "..." onPress={() => {navigation.navigate('Profile',{
                    trackPlaying: "", 
                    tracksPlayed: `${JSON.stringify(trackPlayed)}`, 
                    })
                }}/>  

      </View>
      
      <ScrollView style={styles.list} >

          {
            tracksData.map( (track, index) => (
      
              <View key={index} style={styles.card}>
              <TouchableHighlight onPress={() => {addTrack(track)
                  navigation.navigate('Playing',{
                    trackPlaying: `${JSON.stringify(track)}`, 
                    tracksPlayed: `${JSON.stringify(trackPlayed)}`, 
                    })
                  }}>
              <Image
              style={styles.cover}
              source={{uri: `${track.img}` }}
              />
              </TouchableHighlight>
              <View style={styles.info}> 
                <Text style={styles.position} > # {index +1}    |    {track.listeners} listeners                               ● ● ●</Text>
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

      <View style={styles.miniPlayer} >

      <ImageBackground source={require('../../assets/fondo.png')} resizeMode="cover" style={styles.image}>
        
      <View style={styles.player}>
              <Image
               style={styles.coverTrack}
               source={{
                uri: `${tracksData[3].img}`
               }}
              />
              <Text style={styles.titleplayer} >{tracksData[3].name}</Text>
              <View style={styles.playerbuttons} >
              <Text style={styles.nextback} >◀◀</Text>
              <View style={styles.pause} >
                <Text style={styles.pausetext} >||</Text>
              </View>
              <Text style={styles.nextback} >▶▶</Text>
              </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop:5,}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'gray', marginLeft: 20}} />
        <View>
          <Text style={{width: 5, textAlign: 'right'}}>●</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'gray', marginRight: 20,}} />
      </View>

      {/* <Text style={styles.playerline} > ———————●—————————————————— </Text> */}

      </ImageBackground>


      </View>
    </View>
    
  ) 

};


const styles = StyleSheet.create({
  container:{
    backgroundColor: '#162238',
  },
  list:{
    height: '75%',
    
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
  miniPlayer:{
    backgroundColor: 'white',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    height:120,
    overflow: 'hidden',
  },
  image:{ 
    display: 'flex',
    flexDirection: 'column',
    height:'100%', 

  },

  player:{
    marginTop:20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    
  },
  coverTrack:{
    marginLeft: 25,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  titleplayer: {
    fontWeight: 'bold',
    marginLeft: 40,
    width: 150,
    textAlign: 'left',
    color: 'gray',
    fontSize: 15,
  },
  playerbuttons:{
    
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    

  },
  nextback:{
    fontWeight: 'bold',
    fontSize: 12,
    color: '#162238',
    textAlign: 'center',
    marginHorizontal: 10,
    color: 'gray',
    marginTop:5,
  },
  pause:{
    fontWeight: 'bold',
    color: 'gray',
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    color: '#162238',
    textAlign: 'center',
    borderRadius: 50,
    width: 30,
    height: 30,
  },
  pausetext:{
    fontWeight: '900',
    color: 'gray',
    fontSize:20,
    color: '#162238',
    textAlign: 'center',
  },
  playerline:{
    marginTop:10,
    color: 'gray',
    fontSize: 12,
    textAlign:'center',
    fontWeight: 'bold',
  },
});

export default Top10;
