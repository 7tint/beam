import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Page Components
import { HomeScreen } from './components/home.js';
import { FriendsScreen } from './components/friends.js';
import { SettingsScreen } from './components/settings.js';
import { BottomTabs } from './components/footer.js';

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTabs/>
      </NavigationContainer>
    );
  }
}

export default App;
