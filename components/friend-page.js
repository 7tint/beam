import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class FriendPage extends Component {
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
      }
    });

    console.log(friend);

    return(
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white', paddingLeft: 24, paddingRight: 24}}>
        <Image style={styles.avatar} source={{uri: friend.profilePicture}}/>
        <Text style={styles.name}>{friend.name}</Text>
        <View style={styles.pillsContainer}>
          <Pressable style={[styles.pill, styles.pillSelected]}>
            <Text style={[styles.pillText, styles.pillTextSelected]}>Profile</Text>
          </Pressable>
          <Pressable style={styles.pill}>
            <Text style={styles.pillText}>Timeline</Text>
          </Pressable>
          <Pressable style={styles.pill}>
            <Text style={styles.pillText}>Updates</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

export default FriendPage;
