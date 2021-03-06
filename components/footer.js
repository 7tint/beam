import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../components/home.js';
import { FriendsScreen } from '../components/friends.js';
import { SettingsScreen } from '../components/settings.js';

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}
      options= {
        {tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="home-outline" color={color} size={size}/>)}
      }
      />
      <Tab.Screen name="Friends" component={FriendsScreen}
      options= {
        {tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="account-multiple-outline" color={color} size={size}/>)}
      }
      />
      <Tab.Screen name="Settings" component={SettingsScreen}
      options= {
        {tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="cog-outline" color={color} size={size}/>)}
      }
      />
    </Tab.Navigator>
  );
}
