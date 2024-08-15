import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react'
import CocktailItem from '@/components/CocktailItem';
import { SelectList } from 'react-native-dropdown-select-list';
import SelectListCompont from '@/components/SelectList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TCategory, TDrink } from '../types';
import axios from 'axios';
import { getTokenFromStore } from '../utils/asyncStore';
import { useUserContext } from '../context/UserContext';

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  const [drinks, setDrinks] = useState<TDrink[]>([])
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [category,setcategory]  = useState<TCategory>() 
  const [filterNonAlcoholic,setFilterNonAlcoholic] = useState<boolean>(false)
  const {state,dispatch} = useUserContext()

  const handleGetUserRooms = async() => {
    try {
      const token = await getTokenFromStore()
       const response = await axios.get('http://192.168.1.35:3070/api/v1/cocktails/rooms/myrooms',{
        headers:{
          Authorization:`Bearer ${token}`
        }
       })
       console.log(response.data)
       dispatch({type:'SETUSERROOMS',payload:response.data})
    } catch (error) {
      console.log(error)
    }
  }

  const getDrinks = async () => {
    if (loading) return; // Avoid fetching if already loading
    let limit = 5;
    if(category){
      limit = 30
    }
    let url = `http://192.168.1.35:3070/api/v1/cocktails/drinks?page=${page}&limit=${limit}`
    
    setLoading(true);
    try {
      const token = await getTokenFromStore();
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data)
      console.log(page)
      
      setDrinks(prevDrinks => [...prevDrinks, ...response.data]);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const filteredByCategory = category ?
       drinks.filter(drink=>drink.category === category) 
       : drinks
        
  useEffect(()=>{
    handleGetUserRooms()
  },[])
  useEffect(()=>{
    getDrinks()
  },[page,category])

  console.log('filtered:', filteredByCategory)

  return (
    <View style={[styles.container,{paddingBottom:insets.bottom,paddingTop:insets.top,paddingLeft:insets.left,paddingRight:insets.right}]}>
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

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre..."
          placeholderTextColor="#878787"
        />
      
        </View>
      <View style={styles.categoryContainer}>
        <View style={styles.category}>
          <Text style={styles.categoryText}>Sin alcohol</Text>
        </View>
          <SelectListCompont selected={category} setSelected={setcategory} />
            </View>
     {!drinks && <Text> Loading</Text>}
     {filteredByCategory && filteredByCategory.length >0 && <FlatList
         data = {filteredByCategory}
         renderItem={({item})=><CocktailItem cocktail={item} />}
         keyExtractor={(cocktail)=> cocktail.PK_Drink.toString()}
         maxToRenderPerBatch={5}
         onEndReached={loadMore}

      
       />}

     
    </View>
  );
}

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
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#4caf50',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    height: 40,
    marginTop: 10,
  },
  searchInput: {
    paddingLeft: 15,
    color: '#000000',
  
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display:'flex',
    alignItems:"flex-start",
    width: '100%',
    padding: 20,
  },
  category: {
    backgroundColor: '#ff7b01',
    padding: 5,
    borderRadius: 5,
    height:26,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  cocktailList: {
    width: '100%',
    paddingHorizontal: 20,
  },
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
  cocktailDescription: {
    color: '#878787',
    fontSize: 14,
    marginVertical: 10,
  },
  cocktailImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  footerIcon: {
    width: 72,
    height: 20,
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
  saveIcon: {
    width: 14,
    height: 14,
  },
  bottomBar: {
    backgroundColor: '#4caf50',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  bottomIcon: {
    width: 24,
    height: 24,
  },
});
