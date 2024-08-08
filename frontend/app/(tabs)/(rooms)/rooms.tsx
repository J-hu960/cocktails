import { useUserContext } from '@/app/context/UserContext'
import { getTokenFromStore } from '@/app/utils/asyncStore'
import RoomPreview from '@/components/RoomPreview'
import axios from 'axios'
import { Link } from 'expo-router'
import React, { useEffect } from 'react'
import { Button, FlatList, Text, View } from 'react-native'

const rooms = () => {
  const {dispatch,state} = useUserContext()
  const userRooms = state.userRooms
  
  const handleGetUserRooms = async() => {
    try {
      const token = await getTokenFromStore()
       const response = await axios.get('http://localhost:3070/api/v1/cocktails/rooms/myrooms',{
        headers:{
          Authorization:`Bearer ${token}`
        }
       })
       console.log(response.data)
       dispatch({type:'SETUSERROOMS',payload:response.data})
    } catch (error) {
      
    }
  }

  useEffect(()=>{
      handleGetUserRooms()
  },[])
  return (
    <View style={{display:'flex',flexDirection:'column'}}>
      {userRooms && userRooms.length >0 &&
         <FlatList
         data = {userRooms}
         renderItem={({item})=><RoomPreview room={item} />}
         keyExtractor={(room)=> room.PK_Rooms.toString()}      
       />}
        
    </View>
  )
}

export default rooms