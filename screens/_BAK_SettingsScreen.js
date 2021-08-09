import React, {Component} from 'react';
import {Text, SafeAreaView, View} from 'react-native';

import Eject from '../components/Eject'

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
      <SafeAreaView />
        <Text> Settings </Text>
      </View>
    );
  }
}
