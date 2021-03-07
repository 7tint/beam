import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreateFriend, ReadFriend, GetAllData, ClearData } from '../apis/friends-api.js';
import TopBar from '../components/header.js';
import { LinearGradient } from "expo-linear-gradient";
import FeedCard from '../components/feed-card.js';

// APIs
import { CloudNaturalLanguageAPI } from '../apis/language-api.js';
import { GoogleKnowledgePanelAPI } from '../apis/search-api.js';
import { NewsAPI } from '../apis/news-api.js';
import { SmmryAPI } from '../apis/smmry-api.js';
import { MovieAPI } from '../apis/movie-api.js';
import { TVAPI } from '../apis/tv-api.js';
import { ActorAPI } from '../apis/movie-actor-api.js';

function shuffleArray(array) {
  for(let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array;
}

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

async function getCategories(string) {
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

async function suggestNews(interest) {
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

async function suggestMovie(movie_title_keyword) {
  const response = await MovieAPI(movie_title_keyword);
  const suggestion = response.data.results[0];
  console.log(suggestion);
  return suggestion;
}

async function suggestTV() {
  const tv_title_keyword = "stranger things"
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
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      feed: []
    }
  }

  constructFeed = async() => {
    let friends = this.state.friends;
    let feed = new Array();

    for (let i = 0; i < friends.length; i++) {
      while (feed.length < 2) {
        let randomNum = Math.random() * 100;

        // News API
        if (randomNum < 25) {
          let news;
          let context;
          // let randomNum = Math.random() * 100;
          if (friends[i].other) {
            let index = Math.floor(Math.random() * friends[i].other.length);
            let categories = await getCategories(friends[i].other[index]);
            news = await suggestNews(categories[index].name);
            context = "fun facts";

            let entry = {
              friend: friends[i].name,
              title: news.title,
              context: context,
              image_url: news.image_url
            }
            feed.push(entry);
          }
          // else if (randomNum >= 34 && randomNum < 67 && friends[i].interests) {
          //   news = await suggestNews(friends[i].interests[0]);
          //   context = "interests"
          //
          //   let entry = {
          //     friend: friends[i].name,
          //     title: news.title,
          //     context: context,
          //     image_url: news.image_url
          //   }
          //   feed.push(entry);
          // }
          // else if (friends[i].foods) {
          //   news = await suggestNews(friends[i].foods[0]);
          //   context = "favourite foods"
          //
          //   let entry = {
          //     friend: friends[i].name,
          //     title: news.title,
          //     context: context,
          //     image_url: news.image_url
          //   }
          //   feed.push(entry);
          // }
        }
        // Movie API
        else if (randomNum >= 25 && randomNum < 50) {
          let context;
          let movie;

          if (friends[i].films) {
            let index = Math.floor(Math.random() * friends[i].films.length);
            movie = await suggestMovie(friends[i].films[index]);
            context = "favourite movies";

            console.log(movie);
            let entry = {
              friend: friends[i].name,
              title: "Check out " + movie.title + "!",
              context: context,
              image_url: "https://www.themoviedb.org/t/p/w1280" + movie.poster_path
            }
            feed.push(entry);
          }
        }
        // TV API
        else if (randomNum >= 50 && randomNum < 75) {
          if (friends[i].films) {

          }
        }
        // Spotify API
        else {
          if (friends[i].music) {

          }
        }
        // feed.push("test");
      }
    }

    this.setState({feed: shuffleArray(feed)});
  }

  async componentDidMount() {
    this.setState({friends: await GetAllData()});
    this.constructFeed();
  }

  Feed() {
    let feed;
    if (this.state.feed && this.state.feed.length > 0) {
      return feed = this.state.feed.map(function(entry) {
        return(
          <View key={entry.title}>
            <FeedCard
              friend={entry.friend}
              title={entry.title}
              context={entry.context}
              image_url={entry.image_url}
            />
          </View>
        )
      });
    }
  }

  render() {
    const styles = StyleSheet.create({
      avatar: {
        width: 65,
        height: 65,
        borderRadius: 65,
        borderWidth: 2,
        borderColor: 'white'
      },
      topRow: {
        height: 85,
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 12,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#DFE1E6'
      },
      gradient: {
        width: 69,
        height: 69,
        borderRadius: 34.5,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
      }
    });

    let friends;

    if (this.state.friends && this.state.friends.length > 0) {
      friends = this.state.friends.map(function(friend) {
        return(
          <LinearGradient key={friend.name} start={[0, 0.5]} end={[1, 0.5]} colors={['#3C4E9C', '#00A3FF']}
          style={styles.gradient}>
            <View style={{borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
              <Image style={styles.avatar} source={{uri: friend.profilePicture}}/>
            </View>
          </LinearGradient>
        )
      });
    }

    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: 'white'}}>
        <TopBar setModalVisible={this.setModalVisible} title='Home' style={{flex: 1, paddingLeft: 25, paddingRight: 25}}/>
        <View style={{flex: 5, paddingLeft: 25, paddingRight: 25}}>
          <ScrollView style={{width: '100%'}} horizontal={true}>
            <View style={styles.topRow}>
              {friends}
            </View>
          </ScrollView>
          <ScrollView style={{width: '100%', height: '100%'}}>
            {this.state.feed.length ? this.Feed() : <Text>Loading feed...</Text>}
          </ScrollView>
        </View>
      </View>
    );
  }
}
