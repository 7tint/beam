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
    const search = this.state.search;

    const styles = StyleSheet.create({
      containerStyle: {
        backgroundColor: "white",
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor: "white",
        marginLeft: 25,
        marginRight: 25,
        paddingLeft: 0,
        paddingRight: 0,
      },
      inputContainerStyle: {
        backgroundColor: "#F6F6F6",
        borderRadius: 10,
        height: 36
      },
      inputStyle: {
        fontSize: 15,
        fontFamily: 'CircularStd-Medium'
      }
    });

    return (
      <View style={{flex: 1, justifyContent: 'flex-start', backgroundColor: 'white'}}>
        <TopBar title="People" style={{flex: 1}}/>
        <View style={{flex: 5, padding: 0}}>
          <SearchBar
            placeholder="Search" onChangeText={this.updateSearch} value={search}
            platform="default" lightTheme={true} containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle} inputStyle={styles.inptStyle}
          />
        </View>
      </View>
    );
  }
}
