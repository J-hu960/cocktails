import { Tabs } from 'expo-router';
import React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
       backBehavior="history"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarActiveTintColor: 'green',  // Aquí especificas el color verde
        tabBarInactiveTintColor: 'gray',

       }}>
         {/* <Tabs.Screen
        name="login"
        options={{
         href:null
        }}
      /> */}
         <Tabs.Screen
         name="signup"
         options={{
         href:null
        }}
      />
        <Tabs.Screen
         name="drinks/[id]"
         options={{
         href:null
        }}
      />  <Tabs.Screen
      name="roomdetails/[id]"
      options={{
      href:null
     }}
   />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
           <FontAwesome6 name="searchengin" size={24} color={color} />          ),
        }}
      />
    
      <Tabs.Screen
        name="favorites"
        options={{
          headerShown:true,
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name={'grin-hearts'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(rooms)"
        options={{
          title: 'Rooms',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="groups" size={24} color={color} />
          ),
        }}
      />
       
     <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="settings-suggest" size={24} color={color} />
          ),
        }}
      />
      
    </Tabs>
  );
}
