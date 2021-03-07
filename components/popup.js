import React, { Component } from 'react';
import { StyleSheet, Text, Modal, View, Platform, Pressable } from 'react-native';
import WebModal from 'modal-enhanced-react-native-web';

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isModalVisible !== this.state.isModalVisible) {
      this.setState({ isModalVisible: nextProps.isModalVisible });
    }
  }

  state = {
    isModalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({isModalVisible: visible});
  }

  render() {
    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        padding: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 100
      },
      modalView: {
        width: '100%',
        height: '100%',
        margin: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
      },
      cancel: {
        flex: 2,
        color: "#0065FF",
        fontSize: 17,
        fontFamily: 'CircularStd'
      },
      title: {
        flex: 2,
        fontSize: 17,
        fontFamily: 'CircularStdMedium',
        textAlign: 'center'
      }
    });
    return(
      <View>
        {Platform.OS === 'ios' || Platform.OS === 'android' ?
          <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.isModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  onPress={() => this.setModalVisible(false)}
                >
                  <Text style={styles.cancel}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          :
          <WebModal
            animationType='slide'
            transparent={true}
            visible={this.state.isModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={{flex: 1, marginLeft: -18, marginRight: -18, padding: 0,
            justifyContent: 'flex-start', alignItems: 'center', marginTop: 60}}>
              <View style={styles.modalView}>
                <Pressable
                  onPress={() => this.setModalVisible(false)}
                >
                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.cancel}>Cancel</Text>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <View style={{flex: 2}}></View>
                  </View>
                </Pressable>
              </View>
            </View>
          </WebModal>
        }
      </View>
    );
  }
}
