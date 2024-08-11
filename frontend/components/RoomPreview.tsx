import { useUserContext } from '@/app/context/UserContext';
import { IUser, TRoom } from '@/app/types'
import { getTokenFromStore } from '@/app/utils/asyncStore';
import axios from 'axios';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';


interface props{
    room:TRoom
}
const RoomPreview = ({room}:props) => {
  const {dispatch,state} = useUserContext()
  const [members,setMembers] = useState<number>()
  const [usersQuant,setUsersQuant] = useState<number>()

   const  isAlreadyMember = state.userRooms.some(rooms=>rooms.PK_Rooms === room.PK_Rooms)
  
    const habndleGetUsersFromRoom =async () =>{
      try {
        const token = await getTokenFromStore()
        const response = await axios.get(`http://192.168.1.35//api/v1/cocktails/rooms/${room.PK_Rooms}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        console.log(response.data)
      } catch (error) {
        
      }
    }
    const handleClickJoinRoom =async () =>{
      try {
        const token = await getTokenFromStore()
         const response = await axios.patch(`http://192.168.1.35:3070/api/v1/cocktails/rooms/join/${room.PK_Rooms}`,{},
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
         )
         console.log(response.data)
         dispatch({type:"ADDUSERROOM",payload:room})
         setMembers(prev=>prev+1)
      } catch (error) { 
        console.log(error)
      }


    }

    const hanldeUserLeaveRoom = async()=>{
      try {
        const token = await getTokenFromStore()
         const response = await axios.delete(`http://192.168.1.35:3070/api/v1/cocktails/rooms/${room.PK_Rooms}`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
         )
         console.log(response.data)
         dispatch({type:"REMOVEUSERROOM",payload:room})
         setMembers(prev=>prev-1)
      } catch (error) { 
        console.log(error)
      }

    }

    const getRoomsUsers = async()=>{
      try {
        const token = await getTokenFromStore()
        const response = await axios.get(`http://192.168.1.35:3070/api/v1/cocktails/rooms/users/${room.PK_Rooms}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setMembers(response.data.length)
      } catch (error) {
        console.log(error)
      }
    }
    if(members)console.log(members)

    useEffect(()=>{
      habndleGetUsersFromRoom()
      getRoomsUsers()
    },[])
    return (
        <View style={styles.container}>
          <Text style={styles.title}>{room.name}</Text>
          <Text style={styles.subtitle}>Non-alcoholic cocktail lovers</Text> 
          
          <View style={styles.frame}>
            {!isAlreadyMember ?
               <Pressable onPress={handleClickJoinRoom} style={styles.joinButton}>
                  <Text style={styles.joinText}>Join</Text>
              </Pressable>
            :
            <View style={{width:'80%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Link
            href={{
             pathname: "/(tabs)/roomdetails/[id]",
             params: { id: room.PK_Rooms},
           }}>
              <Text style={{
                fontWeight:'bold',fontSize:14,color:'green', 
                borderWidth:1,padding:5,borderColor:'indigo',
                borderRadius:5
                }}>Entrar</Text>
            </Link> 
               <Pressable onPress={hanldeUserLeaveRoom} style={styles.joinButton}>
                 <Text style={styles.joinText}>Leave</Text>
              </Pressable>
              </View>
              

            }
            <Text style={styles.userCount}>{members}</Text>
          </View>
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
      borderColor: '#4caf50',
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 20,
      paddingLeft: 30,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height: 149,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
      backdropFilter: 'blur(2px)',
      backgroundColor: '#fff', // Assuming background is white
    },
    title: {
      color: '#000000',
      textAlign: 'left',
      fontFamily: 'Inter-SemiBold',
      fontSize: 26,
      fontWeight: '600',
    },
    subtitle: {
      color: '#878787',
      textAlign: 'left',
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      fontWeight: '400',
      width: 210,
      height: 24,
    },
    frame: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      justifyContent: 'flex-end',
      alignSelf: 'stretch',
      height: 40,
    },
    joinButton: {
      width: 86,
      height: 29,
      backgroundColor: '#ffffff',
      borderColor: '#af4c4c',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    joinText: {
      color: '#ff0000',
      fontFamily: 'Inter-Black',
      fontSize: 14,
      fontWeight: '900',
      textAlign: 'center',
    },
    userCount: {
      color: '#000000',
      textAlign: 'left',
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      fontWeight: '400',
    },
  });

export default RoomPreview