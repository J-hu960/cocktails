import { TDrinkDetails, TReview } from "@/app/types";
import { getTokenFromStore } from "@/app/utils/asyncStore";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Card, Button } from 'react-native-elements';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Reviews from "@/components/Reviews";

export default function DrinkDetails() {
    const insets = useSafeAreaInsets()
    const { id } = useLocalSearchParams();
    const [drink,setDrink] = useState<TDrinkDetails>()
    const [showReviews,setShowReviews] = useState<boolean>(false)
    const [drinkreviews,setDrinkReviews] = useState<TReview[]>()
    const handleClickReviews = async()=>{
      await getDrinkReviews()
      setShowReviews(prev=>!prev)
    }
    const getDrinkReviews = async() => {
            try {
              const token = await getTokenFromStore()
              const response = await axios.get(`http://192.168.1.35:3070/api/v1/cocktails/reviews/${id}`,{
                headers:{
                  Authorization:`Bearer ${token}`
                }
              })
              setDrinkReviews(response.data)

            } catch (error) {
              console.log(error)

            }
    }
    const getDrinkDetails = async()=>{
        try {
            const token = await getTokenFromStore()
            const response = await axios.get(`http://192.168.1.35:3070/api/v1/cocktails/drinks/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
             setDrink(response.data)
            
        } catch (error) {
            console.log(error)
            
        }
      
    }

    const renderIngredients = () => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
          const ingredient = drink[`strIngredient${i}`];
          const measure = drink[`strMeasure${i}`];
          if (ingredient) {
            ingredients.push(`${ingredient} - ${measure || '??'}`);
          }
        }
        return ingredients.join('\n');
      };

    useEffect(()=>{
        getDrinkDetails()    
    },[id])
    return (
      
        drink &&  <ScrollView style={[styles.container,{paddingTop:insets.top,paddingBottom:insets}]}>
             <Pressable onPress={()=>router.back()}>
                <Text style={{color:'black',margin:4,marginTop:20}}>Go back</Text>
             </Pressable>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.title}>{drink.strDrink}</Card.Title>
         
          <Card.Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />
          <Text style={styles.category}>Category: {drink.strCategory}</Text>
          <Text style={styles.iba}>IBA: {drink.strIBA}</Text>
          <Text style={styles.alcoholic}>Alcoholic: {drink.strAlcoholic}</Text>
          <Text style={styles.glass}>Glass: {drink.strGlass}</Text>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          <Text style={styles.instructions}>{drink.strInstructions}</Text>
          <Text style={styles.ingredientsTitle}>Ingredients:</Text>
          <Text style={styles.ingredients}>
           {renderIngredients()}
          </Text>
        
            <Button
            title="Ver opiniones"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={handleClickReviews}
          />

     
         
        </Card>
        { showReviews ?
         drinkreviews &&drinkreviews.length>0 ?
        (
          <View style={{backgroundColor:'orange',padding:20,rowGap:6,display:'flex',flexDirection:'column'
            , alignItems:'center',justifyContent:'flex-start'
          }}>
            <Text style={{textAlign:'left',width:'100%',fontSize:22}}>Opiniones de usuarios,total: {drinkreviews.length}</Text>
            {drinkreviews.map(review=>(
              <View style={{height:50,backgroundColor:'gray',padding:5,width:'100%'}}>
                 <Text style={{color:'white'}}>- {review.PK_Review + 1}: {review.content}</Text>
              </View> 
              ))}
          </View>
        ):(<Text>No hay opiniones aún</Text>)
         
        : ''}
      </ScrollView> 
      
       
      );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      display:'flex',
      height:'100%',
      
    
    },
    cardContainer: {
      backgroundColor: '#e0f2f1',
      borderRadius: 10,
      padding: 15,
   
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#00796b',
      marginBottom: 10,
    },
    image: {
      width: Dimensions.get('window').width - 30,
      height: 300,
      borderRadius: 10,
      resizeMode: 'contain',
      marginBottom:22

    },
    category: {
      fontSize: 16,
      color: '#004d40',
      marginBottom: 5,
      fontWeight:'bold'
    },
    iba: {
      fontSize: 16,
      color: '#004d40',
      marginBottom: 5,
    },
    alcoholic: {
      fontSize: 16,
      color: '#004d40',
      marginBottom: 5,
    },
    glass: {
      fontSize: 16,
      color: '#004d40',
      marginBottom: 15,
    },
    instructionsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#00796b',
      marginBottom: 10,
    },
    instructions: {
      fontSize: 16,
      color: '#004d40',
      marginBottom: 15,
    },
    ingredientsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#00796b',
      marginBottom: 10,
    },
    ingredients: {
      fontSize: 16,
      color: '#004d40',
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#00796b',
    },
    buttonContainer: {
      marginTop: 10,
    },
  });