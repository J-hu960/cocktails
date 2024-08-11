import axios from 'axios'
import React, { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { getTokenFromStore } from './utils/asyncStore'

 const joinRoomForm = () => {
   const [key,setKey] = useState<string>('')

   const handlePrivateRooms = async () => {
    try {
        const token = await getTokenFromStore()
        const response = await axios.patch('http://localhost:3070/api/v1/cocktails/rooms/joinPrivate',{
            secret:key
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(response.data)
    } catch (error) {
        console.log(error)
        
    }
   }

  return (
    <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Nombre de la Sala</Text>
        <TextInput
            style={{ borderColor: '#ccc', borderWidth: 1, marginBottom: 15, padding: 8, fontSize: 16 }}
            placeholder="Ingresa la llave secreta de la sala"
            value={key}
            onChangeText={text=>setKey(text)}
        />
        <Button title="Enviar" onPress={handlePrivateRooms}  />
      
    </View>
);
}

export default joinRoomForm
