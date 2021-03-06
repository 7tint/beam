import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { CloudNaturalLanguage } from './apis/cloud-natural-language.js';
import { GoogleKnowledgePanel } from './apis/google-knowledge-panel.js';
import { NewsAPI } from './apis/news-api.js';
import { SmmryAPI } from './apis/smmry-api.js';

class App extends Component {
  findKeyTerms = async (input) => {
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

  getCategories = async () => {
    const string = "Taylor Swift is my friend's favourite artist!";
    const keyTerms = await this.findKeyTerms(string);

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

  suggestNews = async () => {
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

  render() {
    return(
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TouchableHighlight onPress={this.getCategories}>
           <Text>Cloud Natural Language</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.suggestNews}>
           <Text>News</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
