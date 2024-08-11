import { TRoom } from '@/app/types'
import { getTokenFromStore } from '@/app/utils/asyncStore'
import RoomPreview from '@/components/RoomPreview'
import axios from 'axios'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'

const exploreRooms = () => {

  const [rooms,setRooms] = useState<TRoom[]>()
  const handleGetRooms = async () =>{
    try {
      const token = await getTokenFromStore()
       const response = await axios.get('http://192.168.1.35:3070/api/v1/cocktails/rooms',{
        headers:{
          Authorization:`Bearer ${token}`
        }
       })
       console.log(response.data)
        setRooms(response.data)
      } catch (error) {
      
    }
  }
  if(rooms) console.log('rooms:',rooms)
  useEffect(()=>{
    handleGetRooms()
  },[])
   return (
    <View>
          <Link
           href={{
            pathname: '/myrooms',
          }}>          
            <Text style={{backgroundColor:'green',margin:5}}>Ir a mis salas</Text>

          </Link>


       {  rooms && rooms.length >0 &&
      <FlatList
      data = {rooms}
      renderItem={({item})=><RoomPreview room={item} />}
      keyExtractor={(room)=> room.PK_Rooms.toString()}      
    />
}
    </View>
 
     
  )
}

export default exploreRooms