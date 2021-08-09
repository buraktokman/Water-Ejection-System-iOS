import React, {Component} from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  Vibration,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Slider from '@react-native-community/slider';
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
import SystemSetting from 'react-native-system-setting';

import * as notify from '../src/notification';
import CustomButton from '../components/CustomButton';
import Dashboard from '../components/Dashboard';
import InfoBox from '../components/InfoBox';
import EngineBox from '../components/EngineBox';
import {ScrollView} from 'react-native-gesture-handler';

// import haptic from '../src/vibrate';

const DURATION = 5000;
const PATTERN = [1000, 2000, 1000, 2000];

const audioList = [
  {
    title: '165hz',
    url: require('../res/aud/165hz_sine_wave.mp3'),
    isRequire: true,
  },
];

// var sound1;
var sound1 = (sound1 = new Sound(audioList[0].url, (error, sound) => {}));
function playSound() {
  console.log('sound > play');

  // SystemSetting.setVolume(0.6);
  sound1.play();
  // sound1 = new Sound(audioList[0].url, (error, sound) => {
  //   if (error) {
  //     console.log('ERROR > sound > ' + sound + ' > ' + error);
  //   }
  //   sound1.play((success) => {
  //     // sound1.release();
  //     if (success) {
  //       console.log('sound > successfully finished playing');
  //     } else {
  //       console.log('sound > playback failed due to audio decoding errors');
  //     }
  //   });
  //   // loaded successfully
  //   console.log(
  //     'duration in seconds: ' +
  //       sound1.getDuration() +
  //       'number of channels: ' +
  //       sound1.getNumberOfChannels(),
  //   );
  // });
}
function pauseSound() {
  console.log('sound > pause');
  sound1.pause(() => {});
}
function stopSound() {
  console.log('sound > stop');
  sound1.stop(() => {});
  console.log('sound > volume > 60');
  SystemSetting.setVolume(0.6);
}
function resumeSound() {
  console.log('sound > resume');
  sound1.play(() => {});
}

export default class Eject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Sound
      volumeLevel: 100,
      volumeStatus: 'Ready',
      // Vibrate
      vibrationLevel: 100,
      vibrationStatus: 'Ready',
      // Timer
      timeStart: 0,
      timeNow: 0,
      timerRunning: false,
      timePassed: 0,
      timerInterval: 50000, // miliSeconds
      // Eject
      status: 'ready', // completed, stopped, running, null
      ejectId: 0,
      history: [],
      // Device
      deviceWarranty: null,
      deviceSoundOutput: 'System Default',
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

  // ------ VIBRATE ---------------------

  startVibrate = () => {
    // Device Will Vibrate for 10 seconds.
    console.log(
      `vibrate > start (duration: ${this.state.timerInterval / 1000}sec)`,
    );
    Vibration.vibrate([0, 0], true);
    // haptic('focus');

    // var time = 0;
    // this.timerVibrate = setInterval(() => {
    //   Vibration.vibrate(500);
    //   if (time === 3000) {
    //     console.log('end vibrate');
    //     Vibration.cancel();
    //     clearInterval(this.timerVibrate);
    //   }
    //   time = time + 100;
    // }, 100);

    // while (time <View 3000) {
    //   Vibration.vibrate([0, 0], true);
    // }
  };

  stopVibrate = () => {
    // Stop Vibration.
    console.log(`vibrate > stop`);
    Vibration.cancel();
    clearInterval(this.timerVibrate);
  };

  // ------ VIBRATE ---------------------

  smoothVolumeUp = () => {
    console.log('sound > volume > 0 to 100');
    SystemSetting.setVolume(0.0);
    var level = 0;
    let timerVolume = setInterval(() => {
      if (level >= 1.0) {
        console.log('sound > volume > max reached');
        clearInterval(timerVolume);
        return;
      }
      console.log('sound > volume > set > ' + Math.round(level * 100) / 100);
      SystemSetting.setVolume(Math.round(level * 100) / 100);
      this.setState({volumeLevel: Math.round(level * 100)});
      // Inc
      level = level + 0.05;
    }, 50);
  };

  // ------ HISTORY --------------------

  addToHistory = async () => {
    const {history} = this.state;
    const ejectState = {...this.state};
    delete ejectState.history;
    const ejectTemp = {
      ...ejectState,
      // timeStart: new Date().getTime(),
    };
    await this.setState({
      history: [...history, ejectTemp],
      ejectId: this.state.ejectId + 1,
    });
    // Save to disk
    this._saveData();
    console.log('history > add > ' + JSON.stringify(ejectTemp));
  };

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
      'history > set > last eject > ' +
        JSON.stringify(history[history.length - 1]),
    );
    // Save
    this._saveData();
  };

  getHistory = () => {
    const {history} = this.state;
    console.log('history > get all > count: ' + history.length); // > ' + JSON.stringify());
    history.map((item, i) => {
      console.log(JSON.stringify(item));
    });
  };

  delHistory = () => {
    console.log('history > deleting all');
    this.setState({history: []});
    this._saveData();
  };

  // ------ TIMER -----------------------

  intervalCheck = async () => {
    const {timePassed, timeStart, timerInterval} = this.state;
    const timeNow = new Date().getTime();

    if (timeNow - timeStart >= timerInterval) {
      console.log(`eject > timer > completed!`);
      // Notify
      notify.addNow(
        'Eject Completed',
        `Water splash removed from your iDevice in ${
          timePassed / 1000
        } seconds!`,
      );
      // Vibrate
      // haptic('focus');
      // Stop Sound
      stopSound(audioList[0]);
      // Stop Vibrate
      this.stopVibrate();
      // Stop Timer
      clearInterval(this.timer);
      // Reset
      await this.setState({
        timerRunning: false,
        // timeStart: 0,
        // timeNow: timeNow,
        // timePassed: 0,
      });
      // Add to History
      this.setHistory('completed');
      // Save to disk
      this._saveData();
      // Alert
      // Alert.alert(
      //   'Eject Report',
      //   'Water ejected successfuly',
      //   [{text: 'OK', onPress: () => console.log('alert > ok')}],
      //   {cancelable: false},
      // );
    }
  };

  start = async () => {
    console.log('eject > timer started');
    const timeNow = new Date().getTime();
    await this.setState({
      status: 'running',
      timerRunning: true,
      timeStart: timeNow,
      timePassed: 0,
      timeNow,
    });
    // Start Sound
    this.smoothVolume();
    playSound(audioList[0]);
    // STart Vibrate
    this.startVibrate();
    // Notifications
    notify.addNow(
      'Water Eject Engine Started',
      'Relax, Removing water from your iDevice',
      false,
    );
    // Add to History
    this.addToHistory();
    // Save to disk
    this._saveData();
    // Start Timer
    this.timer = setInterval(() => {
      // Update State
      this.setState({
        timeNow: new Date().getTime(),
        timePassed: new Date().getTime() - timeNow,
      });
      // Save
      this._saveData();
      // Ping
      this.intervalCheck();
    }, 100);
  };

  stop = async () => {
    console.log('timer > stop');
    // Notifications
    notify.addNow(
      'Engine Stopped',
      'Caution, still there might be some water in your iDevice',
    );
    // Stop Sound
    stopSound(audioList[0]);
    // Stop Vibrate
    this.stopVibrate();
    // Kill Timer
    clearInterval(this.timer);
    // Update History
    this.setHistory('stopped');
    // Update
    await this.setState({
      status: 'stopped',
      timerRunning: false,
      timeStart: 0,
      timeNow: 0,
      timePassed: 0,
    });
    // Save to disk
    this._saveData();
  };

  pause = async () => {
    console.log('timer > pause');
    // Notifications
    notify.addNow(
      'Engine Stopped',
      'Caution, still there might be some water in your iDevice',
      'stopped',
    );
    // Stop Sound
    stopSound(audioList[0]);
    // Stop Vibrate
    this.stopVibrate();
    // Kill Timer
    clearInterval(this.timer);
    await this.setState({
      status: 'paused',
      timerRunning: false,
    });
    // Update History
    this.setHistory('paused');
    // Save to disk
    this._saveData();
  };

  resume = async () => {
    console.log('timer > resume');
    const {timePassed} = this.state;
    const timeNow = new Date().getTime();
    await this.setState({
      status: 'running',
      timeNow,
      timerRunning: true,
    });
    // Update History
    this.setHistory('running');
    this.timer = setInterval(() => {
      // Update State
      this.setState({
        timeNow: new Date().getTime(),
        timePassed: new Date().getTime() - timeNow + timePassed,
      });
      // Save
      this._saveData();
      // Ping
      this.intervalCheck();
    }, 100);
  };

  // Resume function - Use on Start
  // resumeOnStart = async () => {
  //   console.log('timer > resumeAuto');
  //   const {timePassed, timeStart} = this.state;

  //   this.timer = setInterval(() => {
  //     // Update State
  //     this.setState({
  //       timeNow: new Date().getTime(),
  //       timePassed: new Date().getTime() - timeStart, // + timePassed,
  //     });
  //     // Save
  //     this._saveData();
  //     // Ping
  //     this.intervalCheck();
  //   }, 100);
  // };

  // ------ CALCULATE ------------------

  timeSinceLastRound = () => {
    const {timePassed, timerInterval} = this.state;
    return timePassed % timerInterval;
  };

  getProgress = () => {
    const {timerInterval} = this.state;
    return this.timeSinceLastRound() / timerInterval; // * 100;
  };

  // ------ LIFE -----------------------

  // Load
  componentDidMount() {
    console.log('eject > timer > loading last state');
    // this._getData();
  }

  // Release allocated resources
  componentWillUnmount() {
    clearInterval(this.timer);
    // Save before exit
    //  this._saveData();
  }

  render() {
    const {
      timeNow,
      timeStart,
      timePassed,
      timerInterval,
      timerRunning,
      history,
      status,
      volumeStatus,
      volumeLevel,
      vibrationStatus,
      vibrationLevel,
      deviceWarranty,
      deviceSoundOutput,
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.dashboard}>
            <Dashboard
              timePassed={timePassed}
              timerInterval={timerInterval}
              volumeLevel={volumeLevel}
              onStart={() => this.start()}
              onStop={() => this.stop()}
              timerRunning={timerRunning}
              history={history}
              device={deviceWarranty}
            />
          </View>
          <EngineBox
            deviceSoundOutput={deviceSoundOutput}
            volumeLevel={volumeLevel}
            volumeStatus={volumeStatus}
            vibrationLevel={vibrationLevel}
            vibrationStatus={vibrationStatus}
          />

          {/* <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        /> */}

          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>TOTAL ELAPSED {timePassed / 1000}</Text>
          <Text>DURATION: {Math.floor(timerInterval / 1000)}</Text>
          <Text>ELAPSED: {this.timeSinceLastRound() / 1000}</Text>
        </View> */}

          {/* <View style={{flexDirection: 'row'}}>
          <Button title="add to history" onPress={() => this.addToHistory()} />
          <Button
            title="show history"
            onPress={() => {
              this.getHistory();
            }}
          />
          <Button title="reset hist" onPress={() => this.delHistory()} />
          <Button
            title="set hist comp"
            onPress={() => this.setHistory('completed')}
          />
        </View> */}

          <InfoBox />
          {history.reverse().map((val, index) => {
            return <Text color="white">{JSON.stringify(val)}</Text>;
          })}

          {/* <View style={{flexDirection: 'row'}}>
          <Button
            title="play"
            onPress={() => {
              return playSound(audioList[0]);
            }}
          />
          <Button
            title="pause"
            onPress={() => {
              pauseSound(audioList[0]);
            }}
          />
          <Button
            title="stop"
            onPress={() => {
              stopSound(audioList[0]);
            }}
          />
          <Button
            title="resume"
            onPress={() => {
              resumeSound(audioList[0]);
            }}
          />
        </View> */}
          {/* <View style={{flexDirection: 'row'}}>
          <Button
            title="vibrate start"
            onPress={() => {
              this.startVibrate();
            }}
          />
          <Button
            title="vibrate stop"
            onPress={() => {
              this.stopVibrate();
            }}
          />
        </View> */}
          {/* <View style={{flexDirection: 'row'}}>
          <Button
            title="timer start"
            onPress={() => {
              this.start();
            }}
          />
          <Button
            title="timer pause"
            onPress={() => {
              this.pause();
            }}
          />
          <Button
            title="resume"
            onPress={() => {
              this.resume();
            }}
          />
          <Button
            title="stop"
            onPress={() => {
              this.stop();
            }}
          />
        </View> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
    // flex: 1,
  },
  dashboard: {},
  statusText: {
    color: 'white',
  },
});
