import { TRoom } from '@/app/types'
import { getTokenFromStore } from '@/app/utils/asyncStore'
import RoomPreview from '@/components/RoomPreview'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'

const exploreRooms = () => {

  const [rooms,setRooms] = useState<TRoom[]>()
  const handleGetRooms = async () =>{
    try {
      const token = await getTokenFromStore()
       const response = await axios.get('http://localhost:3070/api/v1/cocktails/rooms',{
        headers:{
          Authorization:`Bearer ${token}`
        }
       })
       console.log(response.data)
        setRooms(response.data)
      } catch (error) {
      
    }
  }
  useEffect(()=>{
    handleGetRooms()
  },[])
   return (
    <View>
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