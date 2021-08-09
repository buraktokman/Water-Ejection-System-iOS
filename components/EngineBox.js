import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class EngineBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      deviceSoundOutput,
      volumeLevel,
      volumeStatus,
      vibrationLevel,
      vibrationStatus,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.soundBox}>
          <View style={styles.soundColumnLeft}>
            <Text style={styles.headerItem}>SOUND ENGINE</Text>
          </View>
          <View style={styles.soundColumnRight}>
            <View style={styles.engineItem}>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons
                  name={'surround-sound'}
                  size={18}
                  color="white"
                />
                <Text style={styles.soundText}>Sound Output</Text>
              </View>
              <Text style={styles.soundTextRight}>{deviceSoundOutput}</Text>
            </View>
            <View style={styles.engineItem}>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons
                  name={'engine'}
                  size={18}
                  color="white"
                />
                <Text style={styles.soundText}>System Speakers</Text>
              </View>
              <Text style={styles.soundTextRight}>{volumeStatus}</Text>
            </View>
            <View style={styles.engineItem}>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons
                  name={'volume-high'}
                  size={18}
                  color="white"
                />
                <Text style={styles.soundText}>Volume Level</Text>
              </View>
              <Text style={styles.soundTextRight}>{volumeLevel}%</Text>
            </View>
          </View>
        </View>

        <View style={styles.soundBox}>
          <View style={styles.soundColumnLeft}>
            <Text style={styles.headerItem}>VIBRATION ENGINE</Text>
          </View>
          <View style={styles.soundColumnRight}>
            <View style={styles.engineItem}>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons
                  name={'engine'}
                  size={18}
                  color="white"
                />
                <Text style={styles.soundText}>System Status</Text>
              </View>
              <Text style={styles.soundTextRight}>{vibrationStatus}</Text>
            </View>
            <View style={styles.engineItem}>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons
                  name={'vibrate'}
                  size={18}
                  color="white"
                />
                <Text style={styles.soundText}>Vibration Level</Text>
              </View>
              <Text style={styles.soundTextRight}>{vibrationLevel}%</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  engineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#25262B',
    borderBottomWidth: 1,
    borderColor: '#111',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  soundColumnLeft: {
    backgroundColor: '#43B207',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    // width: '30%',
  },
  soundColumnRight: {
    // paddingVertical: 4,
    // paddingHorizontal: 4,
    // width: '70%',
  },
  soundBox: {
    // flexDirection: 'row',
    // marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: '#202023',
    borderColor: '#43B207',
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderRadius: 4,
    // paddingHorizontal: 4,
    // paddingVertical: 4,
  },
  soundText: {
    marginLeft: 10,
    textAlign: 'left',
    color: 'white',
  },
  soundTextRight: {
    color: 'white',
    textAlign: 'right',
    fontWeight: '300'
  },
  headerItem: {
    color: '#0E2600',
    fontWeight: '500',
  },
});
