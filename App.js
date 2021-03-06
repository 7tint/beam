import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';

// Page Components
import { HomeScreen } from './components/home.js';
import { FriendsScreen } from './components/friends.js';
import { SettingsScreen } from './components/settings.js';
import { BottomTabs } from './components/footer.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      CircularStd: require('./assets/fonts/CircularStd.otf'),
      'CircularStd-Medium': {
        uri: require('./assets/fonts/CircularStd-Medium.otf'),
        fontDisplay: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    return (
      <NavigationContainer>
        <BottomTabs/>
      </NavigationContainer>
    );
  }
}

export default App;
