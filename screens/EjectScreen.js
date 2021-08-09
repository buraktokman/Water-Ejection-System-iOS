import React, {Component} from 'react';
import {Text, Alert, Linking, StyleSheet, SafeAreaView, View} from 'react-native';
import Sound from 'react-native-sound';
import {
  check,
  request,
  checkMultiple,
  checkNotifications,
  requestNotifications,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import * as notify from '../src/notification';

import Eject from '../components/Eject';
import Header from '../shared/Header';

export default class EjectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // ------- NOTIFICATIONS --------
  requestPermission = () => {
    request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
      // …
      console.log(result);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('features unavailable on this device');
          break;
        case RESULTS.DENIED:
          console.log('permission denied by user');
          break;
        case RESULTS.GRANTED:
          console.log('user granted permission');
          break;
        case RESULTS.BLOCKED:
          console.log('permission blocked. cannot request again');
          break;
      }
    });
  };

  handlerNotifications = () => {
    checkNotifications().then(({status, settings}) => {});

    requestNotifications(['alert', 'sound']).then(({status, settings}) => {
      // …
      console.log(`ejectScreen > notifications > status: ${status}`);
      this.setState({permissionNotify: settings.notificationCenter});
      if (settings.notificationCenter === false) {
        console.warn('CAUTION > Notification blocked');
        Alert.alert(
          'Hello 🙂',
          'Please enable notifications for best user experience',
          [
            {
              text: 'Enable',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'No',
              onPress: () =>
                console.warn('Using App with Notifications disabled'),
              style: 'destructive',
            },
          ],
          {cancelable: true},
        );
      } else {
        notify.configNotify();
      }
    });
  };
  componentDidMount() {
    // Check Notifications
    this.handlerNotifications();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <SafeAreaView /> */}
        <Header
          title="Water Ejection System"
          subtitle="Engine ready to use"
          active={true}
        />
        <Eject />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
