import React from 'react';
import { Text, View, ImageBackground, StyleSheet, Image, Button} from 'react-native';
import Constants from 'expo-constants'

const Playing = ({navigation}) => { 

  
  return (
    <View style={styles.playing}>
      <View style={styles.barContainer} >
          
          
          <Button style={styles.button} color="#162238" title = "..." onPress={() => {navigation.navigate('Profile')}}/> 
          <View>
            <Text style={styles.title1}> Playing from </Text>
            <Text style={styles.title2}> Mx,  Top tracks this Week </Text>
          </View>
          <Button style={styles.button} color="#162238" title = "\/" onPress={() => {navigation.navigate('Top10')}}/> 

      </View>
      <View style={styles.border}>
        <ImageBackground source={require('../../assets/fondo.png')} resizeMode="cover" style={styles.image}>
          <View style={styles.player}>
              <Image
               style={styles.coverTrack}
               source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png'
               }}
              />

              <View style={styles.infoTrack}>

              <Text style={styles.title} >Nombre</Text>
              <Text style={styles.artist} >Artista</Text>

              </View>

          </View>

        


        
        </ImageBackground>
      </View> 
    </View>
)};

const styles = StyleSheet.create({
  playing:{
    backgroundColor: '#162238',

  },
  border:{
    marginTop: 40,
    backgroundColor: 'white',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    height:'100%',
    overflow: 'hidden',
  },
  image:{ 
    height:'100%', 

  },
  player:{ 
     
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  coverTrack: {
    borderRadius: 50,
    marginTop: 50,
    width: 250, 
    height: 250, 
  },

  infoTrack:{
    marginTop: 50,
  },
  title:{
    textAlign: 'center',
    color: '#21130d',
    marginTop: 10,
    fontSize: 23,
    fontWeight: 'bold',
  },

  artist:{
    textAlign: 'center',
    color: '#21130d',
    marginTop: 5,
    fontSize: 15,
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:  15,
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

export default Playing;
