import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CloudNaturalLanguage } from './apis/cloud-natural-language.js';
import { GoogleKnowledgePanel } from './apis/google-knowledge-panel.js';
import { NewsAPI } from './apis/news-api.js';
import { SmmryAPI } from './apis/smmry-api.js';
import { MovieAPI } from './apis/movie-api.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

async function findKeyTerms(input) {
  const keyTerms = await CloudNaturalLanguage(input);
  let keyTermsParsed = new Array();

  keyTerms.forEach(function(keyTerm) {
    let keyTermNew = {
      name: keyTerm.name
    }
    keyTermsParsed.push(keyTermNew);
  });

  return keyTermsParsed;
}

async function getCategories() {
  const string = "Taylor Swift is my friend's favourite artist!";
  const keyTerms = await findKeyTerms(string);

  await Promise.all(keyTerms.map(async function(keyTerm, i) {
    let category = await GoogleKnowledgePanel(keyTerms[i].name);

    if (category.data && category.data.itemListElement[0].result.description) {
      keyTerm.category = category.data.itemListElement[0].result.description;
    } else {
      keyTerm.category = undefined;
    }
  }));

  console.log(keyTerms);

  return keyTerms;
}

async function suggestNews() {
  let article_url;
  const interest = "Gamestop";
  const newsResponse = await NewsAPI(interest);
  const articles = newsResponse.data.articles;
  article_url = articles[1].url;

  const smmryResponse = await SmmryAPI(article_url);
  const summary = smmryResponse.data;

  const suggestion = {
    title: summary.sm_api_title,
    content: summary.sm_api_content,
    url: article_url
  }

  console.log(suggestion);

  return suggestion;
}

async function suggestMovie() {
  const movie_title_keyword = "tenet"
  const response = await MovieAPI(movie_title_keyword);

  const suggestion = response.data.results[0];

  console.log(suggestion);

  return suggestion;
}

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home</Text>
      <TouchableHighlight onPress={getCategories}>
        <Text>Cloud Natural Language</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={suggestNews}>
        <Text>News</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={suggestMovie}>
        <Text>Movie</Text>
      </TouchableHighlight>
    </View>
  );
}

function FriendsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Friends</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function BeamTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}
      options= {
        {tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="home-outline" color={color} size={size}/>)}
      }
      />
      <Tab.Screen name="Friends" component={FriendsScreen}
      options= {
        {tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="account-multiple-outline" color={color} size={size}/>)}
      }
      />
      <Tab.Screen name="Settings" component={SettingsScreen}
      options= {
        {tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="cog-outline" color={color} size={size}/>)}
      }
      />
    </Tab.Navigator>
  );
}

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <BeamTabs/>
      </NavigationContainer>
    );
  }
}

export default App;
