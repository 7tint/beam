import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Pressable, TextInput, Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreateFriend, ReadFriend, GetAllData, ClearData } from '../apis/friends-api.js';
import Popup from '../components/popup.js';

class FriendPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      popup: 1,
      isModalVisible: false,
      category: '',
      categoryIcon: '',
      categoryItems: [],
    }
  }

  async componentDidMount() {
    this.setState({friend: await ReadFriend(this.props.route.params.friend.name)});
  }

  switchTabs = (tab) => {
    this.setState({tab: tab});
  }

  setModalVisible = (visible) => {
    this.setState({isModalVisible: visible});
    this.setState({popup: 1});
    this.setState({category: ''});
    this.setState({categoryIcon: ''});
    this.setState({categoryItems: []});
  }

  pickCategories = (category, icon) => {
    this.setState({category: category});
    this.setState({categoryIcon: icon});
    this.setState({popup: 2});
  }

  addItem = (text) => {
    this.setState({categoryItems: [...this.state.categoryItems, text]});
    this.textInput.clear();
  }

  saveItems = async () => {
    let friend = await ReadFriend(this.props.route.params.friend.name);
    let items = this.state.categoryItems;
    let category = this.state.category;

    if (category === 'Interests & Hobbies') {
      friend.interests = items;
    } else if (category === 'Foods') {
      friend.foods = items;
    } else if (category === 'Films') {
      friend.films = items;
    } else if (category === 'Music') {
      friend.music = items;
    } else {
      friend.other = items;
    }
    await CreateFriend(friend);
    this.setState({friend: await ReadFriend(this.props.route.params.friend.name)});
    this.setModalVisible(false);
  }

  render() {
    const friend = this.props.route.params.friend;

    const styles = StyleSheet.create({
      avatar: {
        marginTop: 30,
        marginBottom: 12,
        width: 80,
        height: 80,
        borderRadius: 80
      },
      name: {
        fontSize: 24,
        fontFamily: 'CircularStdMedium',
        textAlign: 'center'
      },
      pillsContainer: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#F1F1F1',
        marginTop: 16,
        marginBottom: 27
      },
      pill: {
        flex: 2,
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
      },
      pillSelected: {
        backgroundColor: '#3C4E9C',
        borderRadius: 20,
      },
      pillText: {
        textAlign: 'center',
        paddingBottom: 0,
        fontSize: 15,
        fontFamily: 'CircularStd',
      },
      pillTextSelected: {
        color: 'white'
      },
      field: {
        fontSize: 18,
        fontFamily: 'CircularStdMedium'
      },
      edit: {
        fontSize: 12,
        fontFamily: 'CircularStdMedium',
        color: '#0747A6'
      },
      subtitle: {
        fontSize: 12,
        fontFamily: 'CircularStd',
        color: '#7A869A'
      },
      body: {
        fontSize: 16,
        fontFamily: 'CircularStd',
        color: '#3C4E9C'
      },
      addBtn: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 56,
        backgroundColor: '#3C4E9C',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
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
      popupText: {
        fontFamily: 'CircularStd',
        color: '#091E42',
        fontSize: 17
      },
      saveBtn: {
        marginTop: 12,
        marginBottom: 20,
        width: '100%',
        borderRadius: 7
      }
    });

    let tabContent;
    let interests = <View></View>;
    let foods = <View></View>;
    let films = <View></View>;
    let music = <View></View>;
    let other = <View></View>;

    if (this.state.tab === 1) {
      if (this.state.friend) {
        if (this.state.friend.interests) {
          interests = this.state.friend.interests.map(function(interest) {
            return(
              <View style={{width: '100%', marginBottom: 16, paddingBottom: 12,
              borderBottomWidth: 1, borderBottomColor: '#EBECF0'}}>
                <Text style={styles.body}>{interest}</Text>
              </View>
            )
          });
        }
        if (this.state.friend.foods) {
          foods = this.state.friend.foods.map(function(food) {
            return(
              <View style={{width: '100%', marginBottom: 16, paddingBottom: 12,
              borderBottomWidth: 1, borderBottomColor: '#EBECF0'}}>
                <Text style={styles.body}>{food}</Text>
              </View>
            )
          });
        }
        if (this.state.friend.films) {
          films = this.state.friend.films.map(function(film) {
            return(
              <View style={{width: '100%', marginBottom: 16, paddingBottom: 12,
              borderBottomWidth: 1, borderBottomColor: '#EBECF0'}}>
                <Text style={styles.body}>{film}</Text>
              </View>
            )
          });
        }
        if (this.state.friend.music) {
          music = this.state.friend.music.map(function(music) {
            return(
              <View style={{width: '100%', marginBottom: 16, paddingBottom: 12,
              borderBottomWidth: 1, borderBottomColor: '#EBECF0'}}>
                <Text style={styles.body}>{music}</Text>
              </View>
            )
          });
        }
        if (this.state.friend.other) {
          other = this.state.friend.other.map(function(other) {
            return(
              <View style={{width: '100%', marginBottom: 16, paddingBottom: 12,
              borderBottomWidth: 1, borderBottomColor: '#EBECF0'}}>
                <Text style={styles.body}>{other}</Text>
              </View>
            )
          });
        }
      }

      tabContent =
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'flex-start', paddingLeft: 6, paddingRight: 6}}>
          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', marginBottom: 16}}>
            <Text style={styles.field}>Basic Info</Text>
            <Text style={styles.edit}>EDIT</Text>
          </View>
          <View style={{width: '100%', marginBottom: 16, paddingBottom: 12,
          borderBottomWidth: 1, borderBottomColor: '#EBECF0'}}>
            <Text style={styles.subtitle}>birthday</Text>
            <Text style={styles.body}>{friend.birthday}</Text>
          </View>
          <View style={{width: '100%', marginBottom: 16, paddingBottom: 12,
          borderBottomWidth: 1, borderBottomColor: '#EBECF0'}}>
            <Text style={styles.subtitle}>phone</Text>
            <Text style={styles.body}>{friend.phone}</Text>
          </View>

          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', marginBottom: 16}}>
            <Text style={styles.field}>Interests & Hobbies</Text>
            <Text style={styles.edit}>EDIT</Text>
          </View>
          {interests}

          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', marginBottom: 16}}>
            <Text style={styles.field}>Favourite Foods</Text>
            <Text style={styles.edit}>EDIT</Text>
          </View>
          {foods}

          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', marginBottom: 16}}>
            <Text style={styles.field}>Favourite Films</Text>
            <Text style={styles.edit}>EDIT</Text>
          </View>
          {films}

          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', marginBottom: 16}}>
            <Text style={styles.field}>Favourite Songs</Text>
            <Text style={styles.edit}>EDIT</Text>
          </View>
          {music}

          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', marginBottom: 16}}>
            <Text style={styles.field}>Fun Facts</Text>
            <Text style={styles.edit}>EDIT</Text>
          </View>
          {other}
        </View>
      </ScrollView>
    } else if (this.state.tab === 2) {
      tabContent = <Text>Oops! This part is under development!</Text>
    } else {
      tabContent = <Text>How did we get here?</Text>
    }

    let popupContent;

    if (this.state.popup === 1) {
      popupContent =
      <View>
        <Pressable onPress={() => this.pickCategories("Interests & Hobbies", "heart-outline")}>
          <View style={{width: '100%', paddingBottom: 12, marginBottom: 16, marginTop: 12,
          flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
            <View style={styles.iconBackground}>
              <MaterialCommunityIcons style={styles.icon} name="heart-outline"/>
            </View>
            <Text style={styles.popupText}>Interests & Hobbies</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => this.pickCategories("Foods", "noodles")}>
          <View style={{width: '100%', paddingBottom: 12, marginBottom: 16,
          flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
            <View style={styles.iconBackground}>
              <MaterialCommunityIcons style={styles.icon} name="noodles"/>
            </View>
            <Text style={styles.popupText}>Foods</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => this.pickCategories("Films", "movie-filter-outline")}>
          <View style={{width: '100%', paddingBottom: 12, marginBottom: 16,
          flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
            <View style={styles.iconBackground}>
              <MaterialCommunityIcons style={styles.icon} name="movie-filter-outline"/>
            </View>
            <Text style={styles.popupText}>Films</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => this.pickCategories("Music", "playlist-music")}>
          <View style={{width: '100%', paddingBottom: 12, marginBottom: 16,
          flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
            <View style={styles.iconBackground}>
              <MaterialCommunityIcons style={styles.icon} name="playlist-music"/>
            </View>
            <Text style={styles.popupText}>Music</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => this.pickCategories("Fun Facts", "emoticon-outline")}>
          <View style={{width: '100%', paddingBottom: 12, marginBottom: 16,
          flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
            <View style={styles.iconBackground}>
              <MaterialCommunityIcons style={styles.icon} name="emoticon-outline"/>
            </View>
            <Text style={styles.popupText}>Fun Facts</Text>
          </View>
        </Pressable>
        <View style={{width: '100%', paddingBottom: 12, marginBottom: 16,
        flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
          <View style={styles.iconBackground}>
            <MaterialCommunityIcons style={styles.icon} name="plus"/>
          </View>
          <Text style={[styles.popupText, {color: '#B3BAC5'}]}>Add New Category</Text>
        </View>
      </View>;
    } else {
      let inputList = this.state.categoryItems.map(function(categoryItem) {
        return(
          <View key={categoryItem} style={{width: '100%', paddingBottom: 12, marginBottom: 16, justifyContent: 'space-between',
          flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F4F5F7'}}>
            <Text style={styles.popupText}>{categoryItem}</Text>
            <MaterialCommunityIcons style={styles.icon} name="close"/>
          </View>
        )
      });

      popupContent =
      <View>
        <View style={{width: '100%', paddingBottom: 12, marginBottom: 16,
        flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#DFE1E6'}}>
          <View style={styles.iconBackground}>
            <MaterialCommunityIcons style={styles.icon} name={this.state.categoryIcon}/>
          </View>
          <TextInput style={[styles.popupText, {color: '#B3BAC5'}]} onSubmitEditing={(e) => this.addItem(e.nativeEvent.text)}
          placeholder={"Enter Favourite " + this.state.category + "..."} ref={input => {this.textInput = input}}>
          </TextInput>
        </View>
        {inputList}
        <View style={styles.saveBtn}>
          <Button color="#97A0AF" title="Save" onPress={() => this.saveItems()}/>
        </View>
      </View>
    }

    return(
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white', paddingLeft: 24, paddingRight: 24}}>
        <Image style={styles.avatar} source={{uri: friend.profilePicture}}/>
        <Text style={styles.name}>{friend.name}</Text>
        <View style={styles.pillsContainer}>
          <Pressable style={this.state.tab === 1 ? [styles.pill, styles.pillSelected] : styles.pill} onPress={() => this.switchTabs(1)}>
            <Text style={this.state.tab === 1 ? [styles.pillText, styles.pillTextSelected] : styles.pillText}>Profile</Text>
          </Pressable>
          <Pressable style={this.state.tab === 2 ? [styles.pill, styles.pillSelected] : styles.pill} onPress={() => this.switchTabs(2)}>
            <Text style={this.state.tab === 2 ? [styles.pillText, styles.pillTextSelected] : styles.pillText}>Timeline</Text>
          </Pressable>
          <Pressable style={this.state.tab === 3 ? [styles.pill, styles.pillSelected] : styles.pill} onPress={() => this.switchTabs(3)}>
            <Text style={this.state.tab === 3 ? [styles.pillText, styles.pillTextSelected] : styles.pillText}>Updates</Text>
          </Pressable>
        </View>
        {tabContent}
        <Pressable style={styles.addBtn} onPress={() => this.setModalVisible(true)}>
          <MaterialCommunityIcons style={{fontSize: 24, color: 'white'}} name="plus"/>
        </Pressable>
        <Popup isModalVisible={this.state.isModalVisible} title="Add Favourites"
        content={popupContent}/>
      </View>
    );
  }
}

export default FriendPage;
