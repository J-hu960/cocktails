import { useUserContext } from '@/app/context/UserContext'
import { getTokenFromStore } from '@/app/utils/asyncStore'
import RoomPreview from '@/components/RoomPreview'
import axios from 'axios'
import { Link } from 'expo-router'
import React, { useEffect } from 'react'
import { Button, FlatList, Text, View } from 'react-native'

const myrooms = () => {
  const {dispatch,state} = useUserContext()
  const userRooms = state.userRooms
  console.log(state.userRooms)
 

  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
       <Link
           href={{
            pathname: "/(rooms)",
          }}>          
            <Text style={{backgroundColor:'green',margin:5}}>Explorar salas</Text>

          </Link>
      {userRooms && userRooms.length > 0 ? (
        <FlatList
          data={userRooms}
          renderItem={({ item }) => <RoomPreview room={item} />}
          keyExtractor={(room) => room.PK_Rooms.toString()}
        />
      ) : (
        <Text>No rooms available</Text>
      )}
    </View>
  );
  
}

export default myrooms;
