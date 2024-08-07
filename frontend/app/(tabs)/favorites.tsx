import React, { useEffect } from 'react'
import { FlatList, Text } from 'react-native'
import { useUserContext } from '../context/UserContext'
import CocktailItem from '@/components/CocktailItem'
import axios from 'axios'
import { getTokenFromStore } from '../utils/asyncStore'

const favorites = () => {
  const {state,dispatch} = useUserContext()

  const userFavoritesDrinks = state.userFavDrinks

  const getUserFavorites = async() =>{
    try {
      const token = await getTokenFromStore()
      const response = await axios.get('http://localhost:3070/api/v1/cocktails/users/favorites',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      dispatch({type:'SET_USERFAVSINITIAL',payload:response.data})
      
    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(()=>{
    getUserFavorites()
  },[])


  return (

    userFavoritesDrinks && userFavoritesDrinks.length >0 && <FlatList
      data = {userFavoritesDrinks}
      renderItem={({item})=><CocktailItem canLike={false} cocktail={item} />}
      keyExtractor={(cocktail)=> cocktail.PK_Drink.toString()}


    />
    
  )
}

export default favorites