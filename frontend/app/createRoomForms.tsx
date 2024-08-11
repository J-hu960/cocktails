import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, Alert } from 'react-native';
import { getTokenFromStore } from './utils/asyncStore';

const createRoomForms = () => {
  const [name, setName] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [secretKey, setSecretKey] = useState<string>('');
  const [error,setError] = useState<boolean>(false)
  const [succes,setSuccess] = useState<boolean>(false)

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
      setSuccess(true)
      setTimeout(()=>{
             setSuccess(false)
      },3000)
      
    } catch (error) {
      console.log(error)
      setError(true)
      setTimeout(()=>{
             setError(false)
      },3000)
      
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
          {succes ? <Text style={{textAlign:'center',color:'green',fontSize:18}}>¡Sala creada con éxito!</Text>:''}
          {error ? <Text style={{textAlign:'center',color:'red',fontSize:18}}>Error al crear la sala</Text>:''}
      </View>
  );
}

export default createRoomForms