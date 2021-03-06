import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TopBar from '../components/header.js';

// APIs
import { CloudNaturalLanguageAPI } from '../apis/language-api.js';
import { GoogleKnowledgePanelAPI } from '../apis/search-api.js';
import { NewsAPI } from '../apis/news-api.js';
import { SmmryAPI } from '../apis/smmry-api.js';
import { MovieAPI } from '../apis/movie-api.js';
import { TVAPI } from '../apis/tv-api.js';
import { ActorAPI } from '../apis/movie-actor-api.js';
import { FeedCard } from '../components/feed_card.js';

async function findKeyTerms(input) {
  const keyTerms = await CloudNaturalLanguageAPI(input);
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
    let category = await GoogleKnowledgePanelAPI(keyTerms[i].name);

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
  const interest = "Gamestop";
  const newsResponse = await NewsAPI(interest);
  const articles = newsResponse.data.articles;
  const article_url = articles[1].url;
  const article_image_url = articles[1].urlToImage;

  const smmryResponse = await SmmryAPI(article_url);
  const summary = smmryResponse.data;

  const suggestion = {
    title: summary.sm_api_title,
    content: summary.sm_api_content,
    url: article_url,
    image_url: article_image_url,
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

async function suggestTV() {
  const tv_title_keyword = "game of thrones"
  const response = await TVAPI(tv_title_keyword);
  const suggestion = response.data.results[0];
  console.log(suggestion);
  return suggestion;
}

async function suggestMovieByActor() {
  const actor_keyword = "Christian Bale"
  const response = await ActorAPI(actor_keyword);
  const suggestion = response.data.cast[0];
  console.log(suggestion);
  return suggestion;
}

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TopBar title="Home" style={{flex: 1}}/>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
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
          <TouchableHighlight onPress={suggestTV}>
            <Text>TV</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={suggestMovieByActor}>
            <Text>Actor</Text>
          </TouchableHighlight>          
        </View>
        <FeedCard
            friend="Kirk"
            title="Insert Article Title Here"
            context="interests"
            image_url="https://cdn.mos.cms.futurecdn.net/BQwukuZwwwXrg27B9Le2Q6.png"
          />
      </View>
    );
  }
}
