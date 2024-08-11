import { TDrink, TRoom } from '@/app/types';
import { getTokenFromStore } from '@/app/utils/asyncStore';
import CocktailItem from '@/components/CocktailItem';
import axios from 'axios';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RoomDetails = () => {
    const { id } = useLocalSearchParams();
    const insets = useSafeAreaInsets()
    const [room,setRoom] = useState<TRoom>()
    const [roomDrinks,setRoomDrinks] = useState<TDrink[]>()
    const router = useRouter()
    if(room)console.log(room)

    const handleGoBack = ()=>{
        router.back()
    }
    const getRoom = async() => {
        try {
            const token = await getTokenFromStore()
            const response = await axios.get(`http://localhost:3070/api/v1/cocktails/rooms/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setRoom( response.data.room)
            console.log( response.data.room)

        } catch (error) {
            console.log(error)
            
        }
    } 

    const getRoomDrinks = async() =>{
        try {
            const token = await getTokenFromStore()
            const response = await axios.get(`http://localhost:3070/api/v1/cocktails/rooms/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setRoomDrinks( response.data.drinks)
            console.log( response.data.drinks)

        } catch (error) {
            console.log(error)
            
        }}


    useEffect(()=>{
       getRoom()
       getRoomDrinks()

     },[])

  return (

  
    room ?
        <ScrollView style={{display:'flex',flexDirection:'column',paddingBottom:insets.bottom,paddingTop:insets.top,paddingLeft:insets.left,
        }}>
            <View>
                  
              <Pressable onPress={handleGoBack}>
                <Text style={{color:'blue',margin:4}}>Go back</Text>
              </Pressable>
              <Text style={{textAlign:'center',fontSize:18,fontWeight:'semibold',textDecorationLine:'underline'}}> {room.name}</Text>  
            </View>
            {roomDrinks && roomDrinks.length >0 ? <FlatList
         data = {roomDrinks}
         renderItem={({item})=><CocktailItem cocktail={item} />}
         keyExtractor={(drink)=> drink.PK_Drink.toString()}      
       /> : <Text>Añade bebidas a la 7sala para verlas aqui</Text>
     
    }
    </ScrollView>
    :<Text>loading...</Text>
     
    

)}

export default RoomDetails    