import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = StyleSheet.create({
      title: {
        marginTop: 70,
        marginLeft: 25,
        fontSize: 36,
        fontWeight: "500",
        fontFamily: "CircularStd-Medium"
      }
    });

    return(
      <Text style={styles.title}>{this.props.title}</Text>
    )
  }
}

export default TopBar;
