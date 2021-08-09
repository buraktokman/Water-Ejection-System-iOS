import React, {Component} from 'react';
import {
  Text,
  Button,
  TouchableOpacity,
  Linking,
  StyleSheet,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class InfoBox extends Component {
  render() {
    return (
      <View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Activating water ejection system will make ultra low 165Hz frequency
            sound & start unique vibration pattern to remove any water that got
            into your iDevice
          </Text>
        </View>
        <View style={styles.supportBox}>
          <TouchableOpacity
            onPress={() => {
              console.log('eject > open url > warranty check');
              Linking.openURL(
                `https://checkcoverage.apple.com/?caller=sp&sn=${DeviceInfo.getSerialNumberSync()}`,
              ).catch((err) => console.error('ERROR > cannot open url', err));
            }}>
            <View style={styles.supportItem}>
              <View style={styles.supportIcon}>
                <Text style={styles.supportText}>
                  <FontAwesome5 name={'tools'} size={16} />
                </Text>
              </View>
              <Text style={styles.supportText}>Check Warranty</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('eject > call > apple support');
              Linking.openURL(`tel:8006927753`).catch((err) =>
                console.error('ERROR > cannot call', err),
              );
            }}>
            <View style={styles.supportItem}>
              <View style={styles.supportIcon}>
                <Text style={styles.supportText}>
                  <Ionicon name={'ios-call'} size={18} />
                </Text>
              </View>
              <Text style={styles.supportText}>Call Apple Support</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  supportText: {
    color: '#55b9f3', // EFFD0A
  },
  supportIcon: {
    marginRight: 8,
  },
  supportItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  infoBox: {
    // position: 'absolute',
    // bottom: 0,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#111',
  },
  infoText: {
    textAlign: 'center',
    color: '#FEFEFE',
    fontWeight: '300',
  },
  supportBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
});
