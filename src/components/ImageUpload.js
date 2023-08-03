import {Button, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {AsyncStorage} from 'react-native';

const ImageUpload = () => {
  const [imageData, setImageData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);

      console.log('Is connected?', state.isConnected);

      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  });

  const pickImage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log(response);
      setImageData(response);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    if (!isConnected) {
      await AsyncStorage.setItem(
        `/${imageData.name}`,
        JSON.stringify(imageData.uri),
      );
    }

    try {
      const response = await storage()
        .ref(`/${imageData.name}`)
        .putFile(imageData.uri);

      console.log(response);
      alert('Image Uploaded Successfully');
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    console.log('getdata Called');

    try {
      const val = await AsyncStorage.getItem(`/${imageData.name}`);

      // AsyncStorage.removeItem('userInfo')

      if (val) {
        console.log('Value is ', val);
      }
      
    } catch (err) {}
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {imageData ? (
        <Image
          source={{uri: imageData.uri}}
          style={{width: 200, height: 200, marginBottom: 20}}
        />
      ) : (
        <Text>No Image Found!</Text>
      )}

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Button title="Select Image" onPress={() => pickImage()} />
        <Button title="Upload Image" onPress={() => uploadImage()} />
        <Button title="Get Data" onPress={() => getData()} />
      </View>
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({});
