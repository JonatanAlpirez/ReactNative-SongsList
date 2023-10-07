import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Top10 from './src/componets/Main';
import Profile from './src/componets/profile.jsx'
import Playing from './src/componets/Playing';
import MainStack from './src/navigation/navigation'
import { SafeAreaView } from 'react-native-safe-area-context';



export default function App() {

  return (
    <SafeAreaView style={{flex: 1}} >
      <MainStack/>
    </SafeAreaView>
  ); 
}


