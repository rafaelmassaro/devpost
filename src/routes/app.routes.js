import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Feather from 'react-native-vector-icons'

import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Search from '../pages/Search'
import NewPost from '../pages/NewPost'
import PostUser from '../pages/PostUser'

const Tab = createBottomTabNavigator()

function AppRoutes() {
 return (
   <Tab.Navigator
    tabBarOptions={{
      keyboardHidesTabBar: true,
      showLabel: false,
      style: {
        backgroundColor: '#202225',
        borderTopWidth: 0,
      },
      activeTintColor: '#fff'
    }}
   >
       <Tab.Screen 
          name="Home" 
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => {
              return <Feather name="home" color={color} size={size}/>
            }
          }}
       />
       <Tab.Screen 
          name="Search" 
          component={Search}
          options={{
            tabBarIcon: ({color, size}) => {
              return <Feather name="search" color={color} size={size}/>
            }
          }}
       />
       <Tab.Screen 
          name="Profile" 
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => {
              return <Feather name="user" color={color} size={size}/>
            }
          }}
       />
   </Tab.Navigator>
  );
}

export default AppRoutes