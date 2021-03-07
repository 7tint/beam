import React, { useState, Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Pressable, Image, TextInput, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Popup from '../components/popup.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreateFriend, ReadFriend, GetAllData, ClearData } from '../apis/friends-api.js';
import FriendCard from '../components/friend-card.js'
import TopBar from '../components/header.js';

function createFriend(friend) {
  const newFriend = {
    name: friend.name,
    phone: friend.phone,
    birthday: friend.birthday,
    email: friend.email,
    profilePicture: friend.profilePicture,
    relationship: friend.relationship
  }

  if (friend.name !== '' && friend.name) {
    CreateFriend(newFriend);
  }
}

async function getFriends() {
  return await GetAllData();
}

export default class FriendsMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isModalVisible: false,
      name: '',
      phone: '',
      birthday: '',
      email: '',
      profilePicture: '',
      relationship: '',
      friendsList: []
    }
  }

  componentDidMount() {
    getFriends().then(res => this.setState({friendsList: res}));
  }

  setName = (text) => {
    this.setState({name: text});
  }

  setPhone = (text) => {
    this.setState({phone: text});
  }

  setBirthday = (text) => {
    this.setState({birthday: text});
  }

  setEmail = (text) => {
    this.setState({email: text});
  }

  setProfilePicture = (text) => {
    this.setState({profilePicture: text});
  }

  setRelationship = (text) => {
    this.setState({relationship: text});
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  setModalVisible = (visible) => {
    this.setState({isModalVisible: visible});
  }

  submitForm = (person) => {
    this.setModalVisible(false);
    createFriend(person);
    getFriends().then(res => this.setState({friendsList: res}));
  }

  FriendsList() {
    const { navigate } = this.props.navigation;
    return this.state.friendsList.map(function(friend, i) {
      let randomBool = Math.random() < 0.5;
      let friendName = friend.name;
      return(
        <Pressable key={friend.name} onPress={() => navigate(friendName, {friend: friend})}>
          <FriendCard key={friend.name} name={friend.name} profilePicture={friend.profilePicture}
                      relationship={friend.relationship} starred={randomBool}/>
        </Pressable>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    const styles = StyleSheet.create({
      inputStyle: {
        fontSize: 15,
        fontFamily: 'CircularStd-Medium'
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#C1C7D0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
      },
      camera: {
        fontSize: 50
      },
      field: {
        fontSize: 18,
        fontFamily: 'CircularStdMedium',
        marginBottom: 12
      },
      iconBackground: {
        width: 42,
        height: 42,
        borderRadius: 42,
        marginRight: 16,
        backgroundColor: '#EBECF0',
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        fontSize: 20
      },
      saveBtn: {
        marginTop: 12,
        marginBottom: 20,
        width: '100%',
        borderRadius: 7
      }
    });

    return(
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
          {this.state.friendsList.length ? this.FriendsList() : <Text>Loading friends...</Text>}
        </View>
        <Popup isModalVisible={this.state.isModalVisible} title="Create New Contact"
        content={
          <ScrollView>
            <View style={{alignItems: 'flex-start'}}>
              <View style={{width: '100%', alignItems: 'center'}}>
                <View style={styles.avatar}>
                  <MaterialCommunityIcons style={styles.camera} name="camera"/>
                </View>
              </View>
              <View style={{width: '100%', alignItems: 'flex-start'}}>
                <Text style={styles.field}>Name</Text>
                <View style={{width: '100%', paddingBottom: 12, marginBottom: 16,
                flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons style={styles.icon} name="pencil"/>
                  </View>
                  <TextInput placeholder="Add Name" style={{ height: 42, width: '100%' }}
                    onChangeText={this.setName}
                  />
                </View>
              </View>
              <View style={{width: '100%', alignItems: 'flex-start'}}>
                <Text style={styles.field}>Phone</Text>
                <View style={{width: '100%', paddingBottom: 12, marginBottom: 16,
                flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons style={styles.icon} name="phone"/>
                  </View>
                  <TextInput placeholder="Add Phone" style={{ height: 42, width: '100%' }}
                    onChangeText={this.setPhone}
                  />
                </View>
              </View>
              <View style={{width: '100%', alignItems: 'flex-start'}}>
                <Text style={styles.field}>Birthday</Text>
                <View style={{width: '100%', paddingBottom: 12, marginBottom: 16,
                flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons style={styles.icon} name="cake"/>
                  </View>
                  <TextInput placeholder="Add Birthday" style={{ height: 42, width: '100%' }}
                    onChangeText={this.setBirthday}
                  />
                </View>
              </View>
              <View style={{width: '100%', alignItems: 'flex-start'}}>
                <Text style={styles.field}>Email</Text>
                <View style={{width: '100%', paddingBottom: 12, marginBottom: 16,
                flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons style={styles.icon} name="email"/>
                  </View>
                  <TextInput placeholder="Add Email" style={{ height: 42, width: '100%' }}
                    onChangeText={this.setEmail}
                  />
                </View>
              </View>
              <View style={{width: '100%', alignItems: 'flex-start'}}>
                <Text style={styles.field}>Profile Picture</Text>
                <View style={{width: '100%', paddingBottom: 12, marginBottom: 16,
                flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons style={styles.icon} name="account-circle"/>
                  </View>
                  <TextInput placeholder="Add Profile Picture" style={{ height: 42, width: '100%' }}
                    onChangeText={this.setProfilePicture}
                  />
                </View>
              </View>
              <View style={{width: '100%', alignItems: 'flex-start'}}>
                <Text style={styles.field}>Relationship</Text>
                <View style={{width: '100%', paddingBottom: 12, marginBottom: 16,
                flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons style={styles.icon} name="account-multiple"/>
                  </View>
                  <TextInput placeholder="Add Relationship" style={{ height: 42, width: '100%' }}
                    onChangeText={this.setRelationship}
                  />
                </View>
              </View>
              <View style={styles.saveBtn}>
                <Button color="#97A0AF" title="Save" onPress={() => this.submitForm(this.state)}/>
              </View>
            </View>
          </ScrollView>
        }/>
      </View>
    );
  }
}
