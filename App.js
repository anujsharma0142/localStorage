import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import ImageUpload from './src/components/ImageUpload';

const App = () => {
  return (
    <View style={styles.container}>
     <ImageUpload/>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
});
export default App

