import React, { useState, Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Pressable, Image, TextInput, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Popup from '../components/popup.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreateFriend, ReadFriend, GetAllData, ClearData } from '../apis/friends-api.js';
import FriendCard from '../components/friend-card.js'
import TopBar from '../components/header.js';
import { createStackNavigator } from '@react-navigation/stack';
import FriendsMain from '../components/friends-list.js';
import FriendPage from '../components/friend-page.js';

async function getFriends() {
  return await GetAllData();
}

export default class FriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsList: []
    }
  }

  componentDidMount() {
    getFriends().then(res => this.setState({friendsList: res}));
  }

  FriendsStack(Stack) {
    return this.state.friendsList.map(function(friend, i) {
      return(
        <Stack.Screen
          key={friend.name}
          name={friend.name}
          component={FriendPage}
          options={{headerShown: true}}
        />
      );
    });
  }

  render() {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Friends"
          component={FriendsMain}
          options={{headerShown: false}}
        />
        {this.state.friendsList.length ? this.FriendsStack(Stack) : undefined}
      </Stack.Navigator>
    );
  }
}
