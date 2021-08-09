import React, {Component} from 'react';
import {Text, StyleSheet, ActivityIndicator, View} from 'react-native';

import CustomButton from '../components/CustomButton';
import CircleProgress from './CircleProgress';
import Fan from './svgr/Fan';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerInterval: 50000,
      progress: 0,
      timePassed: 0,
      volumeLevel: 0,
      // ...this.props,
      timerRunning: false,
    };
  }
  // ------- LIFE ---------

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      progress: this.props.timePassed / this.props.timerInterval, // === 1 ? 0 : 1 - this.props.progress,
      timerInterval: this.props.timerInterval,
      timePassed: this.props.timePassed,
      timerRunning: this.props.timerRunning,
      // ...this.props,
    });
  }

  componentWillUpdate() {}

  render() {
    const {
      progress,
      timerInterval,
      timePassed,
      volumeLevel,
      // timerRunning,
    } = this.state;

    const {history, deviceWarranty, timerRunning} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.dashboard}>
          <View style={styles.volumeAndProgressBox}>
            <View style={styles.volumeBox}>
              <Text style={[styles.volumeText, styles.boxText]}>165</Text>
              <Text style={[styles.percentText]}>Hz</Text>
            </View>
            <View style={styles.progressBox}>
              <View style={styles.progressBoxInside}>
                <Text style={[styles.progressText, styles.boxText]}>
                  {timePassed / timerInterval >= 0.99
                    ? 100
                    : Math.ceil((timePassed / timerInterval) * 100)}
                </Text>
                <View style={styles.percentBox}>
                  <Text style={styles.percentText}>%</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.circleBox}>
            <CircleProgress
              progress={progress}
              timerInterval={timerInterval}
              timePassed={timePassed}
            />
          </View>
        </View>
        <View style={styles.fanBox}>
          <Fan timerRunning={timerRunning} timerInterval={timerInterval} />
        </View>
        <View style={styles.statusAndEngine}>
          <View style={styles.statusBox}>
            <View style={styles.statusItem}>
              <Text style={styles.soundText}>Engine Status:</Text>
              <View style={{paddingLeft: 4}}>
                <Text
                  style={{
                    color: timerRunning ? '#43B207' : '#55b9f3',
                  }}>
                  {timerRunning ? 'Running' : 'Ready'}
                </Text>
              </View>
            </View>
            {/* <Text style={styles.soundText}>
              Last Run:
              {history.length === 0
                ? 'Never run before'
                : JSON.stringify(
                    new Date(history[history.length - 1].timeStart),
                  )}
            </Text> */}
            <View style={styles.statusItem}>
              <Text style={styles.soundText}>
                iDevice Warranty:
                <View style={{paddingLeft: 4}}>
                  {!deviceWarranty && <ActivityIndicator size="small" />}
                </View>
              </Text>
            </View>
          </View>

          <View style={styles.buttonBox}>
            {!timerRunning ? (
              <CustomButton
                title="Start Engine"
                type="start"
                onPress={() => {
                  this.setState({timerRunning: true});
                  this.props.onStart();
                }}
              />
            ) : (
              <CustomButton
                title="Stop Engine"
                type="stop"
                onPress={() => {
                  this.setState({timerRunning: false});
                  this.props.onStop();
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'darkgrey',
  },
  dashboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBox: {
    marginTop: 10,
    paddingRight: 20,
  },
  statusItem: {
    flexDirection: 'row',
    // justifyContent: 'center',
    paddingVertical: 4,
  },
  statusAndEngine: {
    height: 110,
    flexDirection: 'row',
    // backgroundColor: '#25262B',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: 8,
    marginBottom: 4,
  },
  statusBox: {
    marginHorizontal: 8,
    marginVertical: 4,
    // borderColor: '#EFFD0A',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  soundText: {
    color: 'white',
  },
  volumeBox: {
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    //justifyContent: 'flex-start',
    backgroundColor: '#323232',
    height: 106,
    width: 106,
    borderRadius: 53,
    padding: 4,
    paddingLeft: 8,
    // paddingHorizontal: 4,
    // paddingHorizontal: 4
    // borderTopLeftRadius: 16,
    // borderBottomLeftRadius: 16,
    borderWidth: 6,
    // borderTopWidth: 3,
    // borderBottomWidth: 3,
    // borderLeftWidth: 3,
    // borderRightWidth: 0,
    borderColor: '#25262B',
    shadowColor: '#25262B',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.94,
    shadowRadius: 3.0,
    elevation: 10,
  },
  circleBox: {},
  progressBoxInside: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 60,
    // paddingLeft: 20,
    // backgroundColor: 'red',
  },
  progressBox: {
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#25262B',
    height: 106,
    width: 106,
    borderRadius: 53,
    //padding: 4,
    paddingRight: 12,
    // paddingHorizontal: 4,
    // paddingHorizontal: 4
    // borderTopRightRadius: 16,
    // borderBottomRightRadius: 16,
    borderWidth: 6,
    // borderTopWidth: 3,
    // borderBottomWidth: 3,
    // borderLeftWidth: 0,
    // borderRightWidth: 3,
    borderColor: '#323232',
    shadowColor: '#25262B',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.94,
    shadowRadius: 3.0,
    elevation: 10,
  },
  fanBox: {
    position: 'absolute',
    alignSelf: 'center',
    top: 30,
  },
  volumeAndProgressBox: {
    position: 'absolute',
    top: 68,
    width: 360, // '360,
    height: 62,
    paddingHorizontal: 6,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'black',
    borderRadius: 20,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#25262B',
    // shadowColor: '#666',
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowOpacity: 0.94,
    // shadowRadius: 6.0,
    // elevation: 10,
  },
  boxText: {
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
    color: 'white',
    fontSize: 20,
    fontWeight: '300',
  },
  volumeText: {
    // justifyContent: 'center',
  },
  progressText: {},
  percentBox: {
    marginLeft: 2,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  percentText: {
    // fontVariant: ['tabular-nums'],
    color: 'white',
    fontSize: 16,
    fontWeight: '200',
  },
});
