import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TopBar from '../components/header.js';

export function SettingsScreen() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopBar title="Settings" style={{flex: 1}}/>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Uh oh! This page is under development!</Text>
      </View>
    </View>
  );
}
