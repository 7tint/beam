import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  friendModal(item) {
    this.props.setModalVisible(true);
  }

  render() {
    const styles = StyleSheet.create({
      title: {
        marginTop: 70,
        fontSize: 36,
        fontFamily: 'CircularStdMedium'
      },
      icon: {
        marginTop: 70,
        fontSize: 28,
      }
    });

    let icon;

    if (this.props.title === 'Home') {
      icon = <MaterialCommunityIcons name='bell-outline' style={styles.icon}/>;
    } else if (this.props.title === 'People') {
      icon = <Pressable onPress={this.friendModal.bind(this)}><MaterialCommunityIcons name='plus' style={styles.icon}/></Pressable>;
    } else {
      icon = <View></View>
    }

    return(
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',
      alignItems: 'baseline', paddingLeft: 25, paddingRight: 25}}>
        <Text style={styles.title}>{this.props.title}</Text>
        {icon}
      </View>
    );
  }
}

export default TopBar;
