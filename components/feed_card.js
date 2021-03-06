import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const FeedCard = (props) => {
  return (    
    <Card>
        <View style={styles.cardContainer}>
            <View style={{flex: 0.7}}>
                <Text>Share with {props.friend}</Text>
                <Text>{props.title}</Text>
                <Text>Based on {props.context}</Text>
            </View>
            <View>
                <Card.Image source={props.image_url} style={styles.imageSize}>
                </Card.Image>
            </View>            
        </View>
    </Card>       
  );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
    },
    imageSize: {
        width: 50,
        height: 50
    }
});
