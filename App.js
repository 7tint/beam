import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Page Components
import { HomeScreen } from './components/home.js';
import { FriendsScreen } from './components/friends.js';
import { SettingsScreen } from './components/settings.js';

const Tab = createBottomTabNavigator();

function BeamTabs() {
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

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <BeamTabs/>
      </NavigationContainer>
    );
  }
}

export default App;
