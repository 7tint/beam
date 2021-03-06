import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreateFriend, ReadFriend, GetAllData, ClearData } from '../apis/friends-api.js';
import TopBar from '../components/header.js';

function createFriend() {
  // OBJECT SCHEMA FOR FRIEND:
  //
  // friend = {
  //   name: {
  //     firstName: "",
  //     lastName: ""
  //   },
  //   phone: "",
  //   email: "",
  //   birthday: "",
  //   music: ["", "", ""],
  //   movies: ["", "", ""],
  //   interests:  ["", "", ""],
  //   food: ["", "", ""]
  // }

  const friend = {
    firstName: "Kirk",
    lastName: "Wong",
    basicInfo: "A great programmer",
    likes: "News APIs",
    inputString: "Kirk is a great programmer who likes News APIs"
  }
  CreateFriend(friend);
  GetAllData();
}

export default class FriendsScreen extends Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };
  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TopBar title="People" style={{flex: 1}}/>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>

        </View>
      </View>
    );
  }
}
