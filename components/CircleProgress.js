/*
Progress Bar Components > react-native-progress
https://github.com/oblador/react-native-progress
*/
import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {Surface, Shape} from '@react-native-community/art';
import * as Progress from 'react-native-progress';
import moment from 'moment';

export default class CircleProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      timeSinceLastRound: 0,
      //timerInterval: 60 * 60,
    };
  }

  formatTime = (interval) => {
    // const pad = (n) => (n < 10 ? '0' + n : n);
    // Return Hourly format if time is at least 1 hour
    return moment.utc(interval).format('mm:ss'); // HH:mm:ss
  };

  // ------- LIFE ---------

  UNSAFE_componentWillReceiveProps() {
    this.formatTime(this.props.timePassed);
    this.setState({
      progress: this.props.progress === 1 ? 0 : 1 - this.props.progress,
    });
  }

  // ------- RENDER ---------

  render() {
    const {progress} = this.state;
    const {timePassed, timerInterval} = this.props;

    return (
      <View style={styles.container}>
        <Progress.Circle
          progress={timePassed / timerInterval}
          // endAngle={0.5}
          // animated={animated}
          style={styles.progress}
          size={180}
          thickness={10}
          // direction="counter-clockwise"
          // borderColor={}
          borderWidth={0}
          unfilledColor="1C1D20"
          color="#489dcf" // #EFFD0A
          strokeCap="round"
          // showsText={true}
          // formatText={(progress) => `~${this.props.timeSinceLastRound/1000}`}
        />
        <Progress.Circle
          progress={0.0}
          indeterminate={true}
          indeterminateAnimationDuration={4000}
          style={styles.progress2}
          size={180}
          thickness={1}
          borderWidth={0}
          unfilledColor="#25262B"
          color="#888" // # FCA00B
          strokeCap="round"
        />
        <View style={styles.innerCircle}>
          {/* <View style={styles.timePassedBox}>
            <Text style={styles.text}>REMAINING</Text>
            <Text style={styles.text}>
              {this.formatTime(timerInterval - timePassed)}
            </Text>
          </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'darkgrey',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  
  progress: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // margin: 10,
  },
  progress2: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // margin: 10,
  },
  innerCircle: {
    backgroundColor: 'black',
    position: 'absolute',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 80,
    // paddingVertical: 80,
    height: 160,
    width: 160,
    shadowColor: '#323334',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.94,
    shadowRadius: 4.0,
    elevation: 10,
  },
  infoBar: {
    flex: 1,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#5A5B60',
    fontWeight: '400',
    fontVariant: ['tabular-nums'],
  },
  
  timerIntervalBox: {
    alignItems: 'center',
  },
  timePassedBox: {
    top: 20,
    position: 'absolute',
    backgroundColor:'darkgrey',
    alignItems: 'center', // flex-end
  },
  timeSinceLastRoundBox: {},
  roundCounterBox: {
    alignItems: 'center',
  },
  roundCounterText: {},
  timerContainer: {
    height: 20,
    backgroundColor: 'red',
  },
});
