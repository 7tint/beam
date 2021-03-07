import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class FriendCard extends Component {
  render() {
    const styles = StyleSheet.create({
      cardStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 80,
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF0"
      },
      avatar: {
        width: 57,
        height: 57,
        borderRadius: 57,
        marginRight: 15
      },
      name: {
        fontSize: 13,
        fontFamily: 'CircularStdMedium',
        paddingBottom: 5
      },
      relationship: {
        fontSize: 13,
        color: '#8E8E93',
        fontFamily: 'CircularStd',
      },
      star: {
        fontSize: 25,
        color: '#FFCC00',
      }
    });

    let star;

    if (this.props.starred === true) {
      star = <MaterialCommunityIcons style={styles.star} name="star"/>
    } else {
      star = <View></View>
    }

    return(
      <View style={styles.cardStyle}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Image style={styles.avatar} source={{uri: this.props.profilePicture}}/>
          <View style={{flexDirection: "column", justifyContent: "center"}}>
            <Text style={styles.name}>{this.props.name}</Text>
            <Text style={styles.relationship}>{this.props.relationship ? this.props.relationship : "Not Specified"}</Text>
          </View>
        </View>
        {star}
      </View>
    );
  }
}

export default FriendCard;
