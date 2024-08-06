import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { TDrink } from '@/app/types';

interface Props {
  cocktail: TDrink;
}

const CocktailItem = ({ cocktail }: Props) => {
  return (
    <View style={styles.cocktailItem}>
      <View style={styles.cocktailHeader}>
        <Text style={styles.cocktailTitle}>{cocktail.name}</Text>
        <Text style={styles.cocktailReview}>Ver opiniones</Text>
      </View>
      
      <Image style={styles.cocktailImage} source={{ uri: cocktail.photo }} />
      
      <View style={styles.moreButtonContainer}>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>Ver más</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cocktailFooter}>
        <FontAwesome6 name="heart-circle-plus" size={24} color="red" />
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Compartir</Text>
        </TouchableOpacity>
      </View>
    </View>
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
