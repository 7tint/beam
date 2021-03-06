import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { CloudNaturalLanguage } from './apis/cloud-natural-language.js';
import { GoogleKnowledgePanel } from './apis/google-knowledge-panel.js';

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

  render() {
    return(
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TouchableHighlight onPress={this.getCategories}>
           <Text>Cloud Natural Language</Text>
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
