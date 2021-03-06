import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreateFriend, ReadFriend, GetAllData, ClearData } from '../apis/friends-api.js';

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

export function FriendsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Friends</Text>
      <TouchableHighlight onPress={createFriend}>
        <Text>Create Friend</Text>
      </TouchableHighlight>
    </View>
  );
}
