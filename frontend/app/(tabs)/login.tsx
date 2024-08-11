import { PrivateRoutes, PublicRoutes } from '@/constants/Routes';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Pressable, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import axios from 'axios'
import { removeTokenFromStore, setStoreToken } from '../utils/asyncStore';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../context/UserContext';




const login = () => {
  const {dispatch} = useUserContext()
  const [username,setUsername] = useState<string>()
  const [pass,setPass] = useState<string>()
  const insets = useSafeAreaInsets()
  const router = useRouter();

  const handleLogin = async () =>{
    try {
      const response = await axios.post('http://192.168.1.35:3070/api/v1/cocktails/auth/signIn',{
        username,
        password:pass
      })
      const token = response.data
      if(!token){
        return
      }
      console.log(token) //ya tenim el token, guardarlo a async storage, y guardar info de l'usuari a estat gllobal
      await setStoreToken(token)
      if(!username) return
      dispatch({type:'ADD_NAME',payload:username})
      router.push(`${PrivateRoutes.HOME}`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    removeTokenFromStore()
  },[])

  return (
    <View style={[styles.container,{paddingTop:insets.top,paddingBottom:insets.bottom}]}>
      <ImageBackground 
        source={{uri: 'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?cs=srgb&dl=pexels-chris-f-38966-1283219.jpg&fm=jpg'}} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.formContainer}>
          <Text style={styles.title}>Bienvenido</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#aaa"
            onChangeText={setUsername}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry
            onChangeText={setPass}
            value={pass}
          />
          <Button title='Init' onPress={handleLogin}></Button>
          <Pressable  style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </Pressable>
          <Text style={{textAlign:'center',marginTop:3,fontWeight:'bold'}}>Aún no tienes cuenta? <Link href={`${PublicRoutes.SIGNUP}`}>Haz click aqui</Link></Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
    
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // blanco con opacidad
    borderRadius: 10,
    elevation: 5, // sombra en Android
    shadowColor: '#000', // sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#006400', // verde oscuro
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#006400', // borde verde oscuro
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#006400', // verde oscuro
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});