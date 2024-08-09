import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, Alert } from 'react-native';
import { getTokenFromStore } from './utils/asyncStore';

const createRoomForms = () => {
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [secretKey, setSecretKey] = useState('');

  const hanldeSubmit = async() => {
    try {
      const token = await getTokenFromStore()
      if(isPublic){
        await axios.post('http://localhost:3070/api/v1/cocktails/rooms',{
          name:name,
          isPublic:true
        },{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
  
      }else{
        await axios.post('http://localhost:3070/api/v1/cocktails/rooms',{
          name:name,
          isPublic:false,
          secret_key:secretKey
        },{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
  

      }
      
    } catch (error) {
      console.log(error)
      
    }
   
  

  }

 
  return (
      <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Nombre de la Sala</Text>
          <TextInput
              style={{ borderColor: '#ccc', borderWidth: 1, marginBottom: 15, padding: 8, fontSize: 16 }}
              placeholder="Ingresa el nombre de la sala"
              value={name}
              onChangeText={setName}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <Text style={{ fontSize: 18 }}>¿Es pública?</Text>
              <Switch
                  style={{ marginLeft: 10 }}
                  value={isPublic}
                  onValueChange={setIsPublic}
              />
          </View>

          {!isPublic && (
              <>
                  <Text style={{ fontSize: 18, marginBottom: 10 }}>Llave Secreta</Text>
                  <TextInput
                      style={{ borderColor: '#ccc', borderWidth: 1, marginBottom: 15, padding: 8, fontSize: 16 }}
                      placeholder="Ingresa la llave secreta"
                      value={secretKey}
                      onChangeText={setSecretKey}
                      secureTextEntry={true}
                  />
              </>
          )}

          <Button title="Enviar" onPress={hanldeSubmit}  />
      </View>
  );
}

export default createRoomForms