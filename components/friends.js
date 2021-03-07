import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Popup from '../components/popup.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreateFriend, ReadFriend, GetAllData, ClearData } from '../apis/friends-api.js';
import FriendCard from '../components/friend-card.js'
import TopBar from '../components/header.js';

function createFriend() {
  // OBJECT SCHEMA FOR FRIEND:
  //
  // friend = {
  //   name: {
  //     firstName: '',
  //     lastName: ''
  //   },
  //   phone: '',
  //   email: '',
  //   birthday: '',
  //   music: ['', '', ''],
  //   movies: ['', '', ''],
  //   interests:  ['', '', ''],
  //   food: ['', '', '']
  // }

  const friend = {
    firstName: 'Kirk',
    lastName: 'Wong',
    basicInfo: 'A great programmer',
    likes: 'News APIs',
    inputString: 'Kirk is a great programmer who likes News APIs'
  }
  CreateFriend(friend);
  GetAllData();
}

export default class FriendsScreen extends Component {
  state = {
    search: '',
    isModalVisible: false
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  setModalVisible = (visible) => {
    this.setState({isModalVisible: visible});
  }

  render() {
    const styles = StyleSheet.create({
      inputStyle: {
        fontSize: 15,
        fontFamily: 'CircularStd-Medium'
      }
    });
    return (
      <View style={{flex: 1, justifyContent: 'flex-start', backgroundColor: 'white'}}>
        <TopBar setModalVisible={this.setModalVisible} title='People' style={{flex: 1, paddingLeft: 25, paddingRight: 25}}/>
        <View style={{flex: 5, padding: 0, paddingLeft: 25, paddingRight: 25,}}>
          <SearchBar
            placeholder='Search' onChangeText={this.updateSearch} value={this.state.search}
            platform='default' lightTheme={true}
            containerStyle={{
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderWidth: 0,
              paddingLeft: 0,
              paddingRight: 0,
              backgroundColor: 'white',
              borderColor: 'white'
            }}
            inputContainerStyle={{
              backgroundColor: '#F6F6F6',
              borderRadius: 10,
              height: 36
            }}
            inputStyle={styles.inptStyle}
          />
          <FriendCard name='Elon Musk' relation='Work Colleague' starred={true}/>
        </View>
        <Popup isModalVisible={this.state.isModalVisible} title="Test"/>
      </View>
    );
  }
}
