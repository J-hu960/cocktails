import { TDrinkDetails } from "@/app/types";
import { getTokenFromStore } from "@/app/utils/asyncStore";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Card, Button } from 'react-native-elements';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DrinkDetails() {
    const insets = useSafeAreaInsets()
    const { id } = useLocalSearchParams();
    const [drink,setDrink] = useState<TDrinkDetails>()

    const getDrinkDetails = async()=>{
        try {
            const token = await getTokenFromStore()
            const response = await axios.get(`http://localhost:3070/api/v1/cocktails/drinks/${id}`,{
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
        drink &&  <ScrollView style={[styles.container,{paddingTop:insets.top,paddingBottom:insets.bottom}]}>
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
            title="Save"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={() => console.log('View More Pressed')}
          />
        </Card>
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