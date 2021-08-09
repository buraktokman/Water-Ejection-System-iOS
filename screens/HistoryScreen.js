import React, {Component} from 'react';
import {
  Text,
  Button,
  Linking,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../shared/Header';

export default class WaterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
  }
  // ------ STORAGE ---------------------

  _saveData = async () => {
    try {
      AsyncStorage.setItem('stateEject', JSON.stringify(this.state));
    } catch (error) {
      console.warn('ERROR > storage > saveData > ' + error);
    }
  };

  _getData = async () => {
    try {
      const lastState = await AsyncStorage.getItem('stateEject');
      let lastStateParsed = JSON.parse(lastState);
      if (lastState !== null) {
        await Object.keys(this.state).map((key) => {
          this.setState({[key]: lastStateParsed[key]});
        });
        // console.log(`state after > ${JSON.stringify(this.state)}`);
      }

      // Start Timer
      // if (this.state.timerRunning === true) {
      //   console.log('_getData > resuming timer');
      //   this.resumeOnStart();
      // }
    } catch (error) {
      console.warn('ERROR > storage > getData > ' + error);
    }
  };

  // ------ HISTORY --------------------

  setHistory = (status) => {
    // status can be => completed, stopped, running, null
    const {history} = this.state;
    const timeNow = new Date().getTime();

    let historyTemp = [...this.state.history];
    historyTemp[historyTemp.length - 1] = {
      ...historyTemp[historyTemp.length - 1],
      status: status,
      timeNow,
    };
    this.setState({history: historyTemp, timeNow});

    console.log(
      'history > set > last eject >' +
        JSON.stringify(history[history.length - 1]),
    );
    // Save
    // this._saveData();
  };

  getHistory = () => {
    // Read from disk
    this._getData();
    const {history} = this.state;
    console.log('history > get all > count: ' + history.length); // > ' + JSON.stringify());
    history.map((item, i) => {
      console.log(JSON.stringify(item));
    });
  };

  delHistory = () => {
    console.log('history > deleting all');
    this.setState({history: []});
    // this._saveData();
  };

  // ------ LIFE -----------------------

  // Load
  componentDidMount() {
    console.log('history > did mount');
    // CAUTION --- Use MobX STATE MANAGER
    this._getData();
    // this.timer = setInterval(() => {
    //   console.log('history > refreshing..');
    //   this._getData();
    // }, 10000);
  }

  // Release allocated resources
  componentWillUnmount() {
    // CAUTION --- Use MobX
    clearInterval(this.timerRefresh);
    // Save before exit
    // this._saveData();
  }

  render() {
    const {history} = this.state;
    return (
      <View style={styles.container}>
        <Header
          title="Eject History"
          subtitle="System activation records"
          active={true}
        />

        <View
          style={styles.historyButtons}>
          <TouchableOpacity
            onPress={() => {
              console.log('history > refresh');
              this.getHistory();
            }}>
            <View style={styles.supportItem}>
              <View style={styles.supportIcon}>
                <Text style={styles.supportText}>
                  <Ionicon name={'ios-refresh'} size={18} />
                </Text>
              </View>
              <Text style={styles.supportText}>Refresh History</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('history > delete');
              this.delHistory();
            }}>
            <View style={styles.supportItem}>
              <View style={styles.supportIcon}>
                <Text style={styles.supportText}>
                  <Ionicon name={'ios-remove-circle-outline'} size={18} />
                </Text>
              </View>
              <Text style={styles.supportText}>Delete History</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={history}
          keyExtractor={(item) => item.ejectId}
          renderItem={(item, index) => {
            console.log(val);
            var val = item.item;
            return (
              <View style={styles.soundBox}>
                <View style={styles.soundColumnLeft}>
                  <Text style={styles.headerItem}>
                    Eject #{JSON.stringify(val.ejectId)}
                  </Text>
                </View>
                <View style={styles.soundColumnRight}>
                  <View style={styles.engineItem}>
                    <View style={{flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        name={'power-standby'}
                        size={18}
                        color="#489dcf"
                      />
                      <Text style={styles.soundText}>System Status</Text>
                    </View>
                    <Text style={styles.soundTextRight}>{val.status}</Text>
                  </View>
                  <View style={styles.engineItem}>
                    <View style={{flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        name={'timer'}
                        size={18}
                        color="#489dcf"
                      />
                      <Text style={styles.soundText}>Start Time: </Text>
                    </View>
                    <Text style={styles.soundTextRight}>
                      {new Date(val.timeStart).toDateString()}
                    </Text>
                  </View>
                  <View style={styles.engineItem}>
                    <View style={{flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        name={'timer-off'}
                        size={18}
                        color="#489dcf"
                      />
                      <Text style={styles.soundText}>End Time: </Text>
                    </View>
                    <Text style={styles.soundTextRight}>
                      {new Date(val.timeNow).toDateString()}
                    </Text>
                  </View>

                  <View style={styles.engineItem}>
                    <View style={{flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        name={'timelapse'}
                        size={18}
                        color="#489dcf"
                      />
                      <Text style={styles.soundText}>Eject Duration:</Text>
                    </View>
                    <Text style={styles.soundTextRight}>
                      {/* {val.timePassed} /  */}
                      {val.timerInterval / 1000} seconds
                    </Text>
                  </View>
                  <View style={styles.engineItem}>
                    <View style={{flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        name={'cellphone-sound'}
                        size={18}
                        color="#489dcf"
                      />
                      <Text style={styles.soundText}>Sound Output:</Text>
                    </View>
                    <Text style={styles.soundTextRight}>
                      {val.deviceSoundOutput}
                    </Text>
                  </View>
                  <View style={styles.engineItem}>
                    <View style={{flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        name={'volume-plus'}
                        size={18}
                        color="#489dcf"
                      />
                      <Text style={styles.soundText}>Volume Status</Text>
                    </View>
                    <Text style={styles.soundTextRight}>
                      {val.volumeStatus}
                    </Text>
                  </View>
                  <View style={styles.engineItem}>
                    <View style={{flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        name={'volume-high'}
                        size={18}
                        color="#489dcf"
                      />
                      <Text style={styles.soundText}>Volume Level</Text>
                    </View>
                    <Text style={styles.soundTextRight}>
                      {val.volumeLevel}%
                    </Text>
                  </View>

                  <View style={styles.engineItem}>
                    <View style={{flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        name={'engine'}
                        size={18}
                        color="#489dcf"
                      />
                      <Text style={styles.soundText}>Vibration Status</Text>
                    </View>
                    <Text style={styles.soundTextRight}>
                      {val.vibrationStatus}
                    </Text>
                  </View>
                  <View style={styles.engineItem}>
                    <View style={{flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        name={'vibrate'}
                        size={18}
                        color="#489dcf"
                      />
                      <Text style={styles.soundText}>Vibration Level:</Text>
                    </View>
                    <Text style={styles.soundTextRight}>
                      {val.vibrationLevel}%
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
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
    textAlign: 'left',
    color: 'white',
    marginLeft: 10,
  },
  soundTextRight: {
    color: 'white',
    textAlign: 'right',
    fontWeight: '300',
  },
  headerItem: {
    color: '#E9FFDD',
    fontWeight: '500',
  },
  historyButtons: {
    justifyContent:'space-around',
    flexDirection: 'row',
    // height: 30,
    alignItems: 'center',
    marginTop: 8,
  },
});
