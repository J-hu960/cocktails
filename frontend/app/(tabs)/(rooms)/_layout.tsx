import { useUserContext } from "@/app/context/UserContext";
import { Slot, useRouter } from "expo-router";

import React from 'react'
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";

const _layout = () => {
    const {state} = useUserContext()
    const router = useRouter()
     const handleClickCreateNewRoom = ()=>{
       router.push('/createRoomForms')
    }
     const handleClickJoinRoom = ()=>{
     router.push('/joinRoomForm')
     }
     const insets = useSafeAreaInsets()
  return (
    <View style={{paddingBottom:insets.bottom,paddingTop:insets.top}}>
        <View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={{display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'center'}}>
            <Text style={styles.headerText}>Cocktail Lounge</Text>
            <Text style={[styles.headerText,{color:'orange'}]} >Bienvenid@, {state.user.username}</Text>
          </View>
        </View>
        <View style={{width:60,marginRight:6,height:60}}>
          <Image style={styles.icon} 
             source={state.user.photo ? { uri: state.user.photo } : {uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfos3N8omryPTTqGm07emv6QlbFPuhdjiH1A&s'}}
             />
        </View>
        </View>
        <View style={{display:'flex',flexDirection:'column',width:'100%', alignItems:'flex-start', rowGap:6,marginTop:6}}>
            <Button onPress={handleClickCreateNewRoom} title="Create Room" />
             <Button onPress={handleClickJoinRoom}  title="Join private room" />  
        </View>
        
    </View>
        
        <Slot />
    </View>
   
  )
}

export default _layout

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
    
    },
    header: {
      backgroundColor: '#4caf50',
      padding: 0,
      display:'flex',
      alignItems:'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: 72,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 22,
    },
    icon: {
      width: '100%',
      height:'100%',
    },
    headerText: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: '700',
    },
    profileCircle: {
      backgroundColor: '#d9d9d9',
      borderRadius: 25,
      width: 50,
      height: 46,
      marginRight: 22,
    }
  })