import { TDrink } from '@/app/types';
import { getTokenFromStore } from '@/app/utils/asyncStore';
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface props{
 iddrink:number,
 idroom:number
}

export default function CheckboxCustom({iddrink,idroom}:props) {
  const [isChecked, setChecked] = useState(false);
  const [roomDrinks,setRoomsDrinks] = useState<TDrink []>()

  const drinkInRoom = roomDrinks?.some(drink=>drink.PK_Drink == iddrink)
 

  const getRoomDrinks = async() =>{
    try {
        const token = await getTokenFromStore()
        const response = await axios.get(`http://localhost:3070/api/v1/cocktails/rooms/${idroom}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setRoomsDrinks(response.data.drinks)
        console.log( response.data.drinks)

    } catch (error) {
        console.log(error)
        
    }}
  const handleChek =async() =>{
    if(drinkInRoom){
      return
    }
       try {
       
          const token = await getTokenFromStore()
          await axios.patch(`http://localhost:3070/api/v1/cocktails/rooms/${idroom}/${iddrink}`,{},
            {
              headers:{
                Authorization:`Bearer ${token}`
              }
            }
          )
          setChecked(true)
       } catch (error) {
           console.log(error)
       }
  }

  useEffect(()=>{
    getRoomDrinks()
  },[])

  return (
    <View>
     
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={handleChek}
          color={drinkInRoom ? 'red' : undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
