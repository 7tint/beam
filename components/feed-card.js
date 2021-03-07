import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class FeedCard extends Component {
  render() {
    const styles = StyleSheet.create({
      cardStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
        paddingBottom: 12,
        minHeight: 100,
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF0"
      },
      title: {
        fontSize: 15,
        fontFamily: 'CircularStdMedium',
        paddingBottom: 5
      },
      subtitle: {
        fontSize: 13,
        fontFamily: 'CircularStd',
        paddingBottom: 5
      },
      small: {
        fontSize: 13,
        color: '#A5ADBA',
        fontFamily: 'CircularStd',
      },
      image: {
        width: 72,
        height: 72,
        borderRadius: 4,
      }
    });

    return(
      <View style={styles.cardStyle}>
        <View style={{flex: 4.5, flexDirection: "column", justifyContent: "center", paddingRight: 12}}>
          <Text style={styles.subtitle}>Share With {this.props.friend}</Text>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.small}>Based on {this.props.context}</Text>
        </View>
        <View style={{flex: 1.5}}>
          <Image style={styles.image} source={{uri: this.props.image_url}}/>
        </View>
      </View>
    );
  }
}

export default FeedCard;
