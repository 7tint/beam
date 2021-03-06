import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class TopBar extends Component {
  render() {
    const styles = StyleSheet.create({
      title: {
        marginTop: 70,
        marginLeft: 25,
        fontSize: 36,
        fontFamily: 'CircularStd-Medium'
      },
      icon: {
        marginTop: 70,
        marginRight: 25,
        fontSize: 28,
      }
    });

    let icon;

    if (this.props.title === 'Home') {
      icon = <MaterialCommunityIcons name='bell-outline' style={styles.icon}/>;
    } else if (this.props.title === 'People') {
      icon = <MaterialCommunityIcons name='plus' style={styles.icon}/>;
    } else {
      icon = <View></View>
    }

    return(
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <Text style={styles.title}>{this.props.title}</Text>
        {icon}
      </View>
    )
  }
}

export default TopBar;
