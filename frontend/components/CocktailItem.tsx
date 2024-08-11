import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, ScrollView, FlatList, Button } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TDrink } from '@/app/types';
import { Link, router } from 'expo-router';
import { useUserContext } from '@/app/context/UserContext';
import axios from 'axios';
import { getTokenFromStore } from '@/app/utils/asyncStore';
import CheckboxCustom from './Checkbox';

interface Props {
  cocktail: TDrink;
}

const CocktailItem = ({ cocktail }: Props) => {
  const initialLikes = cocktail.likes
  const {dispatch,state} = useUserContext()
  const [showForm,setShowForm] =useState<boolean>(false)
  const [likes,setLikes] = useState<number>(initialLikes)
  const userRooms = state.userRooms
  const addTofavsOrRemove=async()=>{
    const url = `http://localhost:3070/api/v1/cocktails/drinks/${cocktail.PK_Drink}/addlike`
    const token = await getTokenFromStore();

    try {
     await axios.patch(url,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error)
    }

  }
  const handleAddDrinkToFavs = async () =>{
    dispatch({type:'ADD_FAVDRINK',payload:cocktail})
    setLikes(prev=>prev+1)
    //addLike
    await addTofavsOrRemove()
  
    
  }
  const handleRemoveFromFavs = async () =>{
    dispatch({type:'REMOVE_FAVDRINK',payload:cocktail})
    setLikes(prev=>prev-1)
    await addTofavsOrRemove()
  }

  const hasLiked = state.userFavDrinks.some(drink=>drink.PK_Drink===cocktail.PK_Drink)

   const handleSHareForm = ()=>{
    setShowForm(prev=>!prev)
   }


  return (
   
    showForm ?(
      <ScrollView>
      <View style={styles.cocktailItem}>
      <View style={styles.cocktailHeader}>
       <Text style={styles.cocktailTitle}>{cocktail.name}</Text>
       <Text style={styles.cocktailReview}>Ver opiniones</Text>
     </View>
     <Pressable  onPress={handleSHareForm}>
       <Text>Ver completo</Text>
     </Pressable>
     <FlatList
         data = {userRooms}
         renderItem={({item})=>(
           <View style={{width:'100%',borderWidth:1,padding:3,marginTop:2,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
               <Text>{item.name}</Text>
               <CheckboxCustom iddrink={cocktail.PK_Drink} idroom={item.PK_Rooms} />
           </View>
        )}
         keyExtractor={(room)=> room.PK_Rooms.toString()}

       />
     
   
      
      
     </View>
   </ScrollView>
 
    ):(
      <View style={styles.cocktailItem}>
       <View style={styles.cocktailHeader}>
        <Text style={styles.cocktailTitle}>{cocktail.name}</Text>
      </View>
      
      <Image style={styles.cocktailImage} source={{ uri: cocktail.photo }} />
      
      <View style={styles.moreButtonContainer}>
        <TouchableOpacity style={styles.moreButton}>
          <Link
           href={{
            pathname: '/drinks/[id]',
            params: { id: cocktail.PK_Drink},
          }}>          
            <Text style={styles.moreButtonText}>Ver más</Text>

          </Link>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cocktailFooter}>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',columnGap:5}}>
        {!hasLiked ? (
          <Pressable onPress={handleAddDrinkToFavs}>
          <FontAwesome6  name="heart-circle-plus" size={24} color="red" />
        </Pressable>):(
           <Pressable onPress={handleRemoveFromFavs}>
              <Ionicons name="heart-dislike-sharp" size={24} color="black" />         
           </Pressable>

        )
        }
        <Text style={{fontWeight:'bold'}}>{likes}</Text>

        </View>
     
       
        <Pressable style={styles.saveButton}>
          <Text onPress={handleSHareForm} style={styles.saveButtonText}>Compartir</Text>
        </Pressable>
      </View>
    </View>
  
    )
   
  );
};

export default CocktailItem;

const styles = StyleSheet.create({
  cocktailItem: {
    borderColor: '#4caf50',
    borderWidth: 1,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:300
  },
  cocktailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cocktailTitle: {
    fontSize: 26,
    fontWeight: '600',
  },
  cocktailReview: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4caf50',
  },
  cocktailImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,  // Ajusta la relación de aspecto según tus necesidades
    borderRadius: 10,
    resizeMode: 'contain', 
    marginBottom:10,
    marginTop:20
  },
  moreButtonContainer: {
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  moreButton: {
    backgroundColor: '#d4d2d2',
    padding: 10,
    borderRadius: 5,
  },
  moreButtonText: {
    fontSize: 14,
  },
  cocktailFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#4caf50',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#4caf50',
    fontSize: 14,
    marginRight: 5,
  },
});
