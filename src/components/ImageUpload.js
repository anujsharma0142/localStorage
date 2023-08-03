import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageUpload = () => {
  const [imageData, setImageData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const uploadLocallyStoredData = async () => {
      try {
        if (isConnected) {
          const storedData = await AsyncStorage.getItem(`/${imageData?.name}`);
          if (storedData) {
            const uri = JSON.parse(storedData); // Parse the stored uri

            const response = await storage()
              .ref(`/${imageData.name}`)
              .putFile(uri);

            console.log(response);
            alert('Locally stored image uploaded successfully');
            await AsyncStorage.removeItem(`/${imageData.name}`);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    uploadLocallyStoredData();
  }, [isConnected]);

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
    if (!imageData) {
      return; // No image selected
    }

    const uri = Platform.OS === 'android' ? imageData.uri : imageData.uri.replace('file://', '');

    if (isConnected) {
      try {
        const response = await storage()
          .ref(`/${imageData.name}`)
          .putFile(uri);

        console.log(response);
        alert('Image Uploaded Successfully');
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await AsyncStorage.setItem(
          `/${imageData.name}`,
          JSON.stringify(imageData.uri) // Store the whole uri
        );
        console.log('Image stored locally');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getData = async () => {
    console.log('getData Called');

    try {
      const val = await AsyncStorage.getItem(`/${imageData?.name}`);

      if (val) {
        console.log('Value is', val);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageData ? (
        <Image
          source={{ uri: imageData.uri }}
          style={{
            width: 200,
            height: 200,
            marginBottom: 20,
            borderRadius: 100,
          }}
        />
      ) : (
        <Text>No Image Found!</Text>
      )}

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Button title="Select Image" onPress={pickImage} />
        <Button title="Upload Image" onPress={uploadImage} />
        <Button title="Get Data" onPress={getData} />
      </View>
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({});

