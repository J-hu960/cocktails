import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import { getTokenFromStore } from '../utils/asyncStore';

const Profile = () => {
  const {state,dispatch} = useUserContext()
  const [username, setUsername] = useState(state.user.username);

  const selectImage =async () => {
 
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
       dispatch({type:'SETPHOTO',payload:result.assets[0].uri});
       const asset = (result.assets[0])
       await  uploadImage(asset.uri,asset.mimeType,asset.fileName)
      }
        

  };

  const uploadImage=async(uri:string,type:string,name:string)=>{
      const formData = new FormData()
      formData.append('photo',{
        uri,
        name,
        type
        })
         
      try {
        const token = await getTokenFromStore()
        if(!token){
          return
        }
        const response = await axios.post('http://192.168.1.35:3070/api/v1/cocktails/users/picture',formData,
          {
            headers:{
              'Content-Type': 'multipart/form-data',
              Authorization:`Bearer ${token}`
            }
          }
        )
        console.log('Image succesfully uploaded: ',response.data.message)
      } catch (error) {
        console.log('error uploading img: ',error)
        
      }
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage}>
        <Image
          source={state.user.photo ? { uri: state.user.photo } : {uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfos3N8omryPTTqGm07emv6QlbFPuhdjiH1A&s'}}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#A0D995',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#A0D995',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#A0D995',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Profile;
