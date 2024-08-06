import AsyncStorage from "@react-native-async-storage/async-storage"

export const setStoreToken=async(token:string)=>{
    try {
        await AsyncStorage.setItem('token',token)
    } catch (error) {
        console.log(error)
        throw new Error
    }

}

export const getTokenFromStore=async():Promise<String | null>=>{
    try {
        const token:String|null = await AsyncStorage.getItem('token')
        return token
    } catch (error) {
        console.log(error)
        throw new Error
    }

}

export const removeTokenFromStore = async():Promise<void>=>{
    try {
        await AsyncStorage.removeItem('token')
    } catch (error) {
        console.log(error)
    }
}