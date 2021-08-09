// import * as React from 'react';
// import Svg, {Path, Circle} from 'react-native-svg';

// function SvgFan(props) {
//   return (
//     <Svg viewBox="0 0 511.999 511.999" width={48} height={48} {...props}>
//       <Circle cx={273.975} cy={271.104} r={76.728} />
//       <Path d="M208.953 52.316c-35.42 55.239-24.036 104.905-7.512 136.005 19.387-17.006 44.773-27.333 72.528-27.333 25.922 0 49.774 9.008 68.607 24.051 32.464-29.121 80.316-27.977 98.037-76.217 25.172-68.521-157.056-172.854-231.66-56.506zM495.957 324.196c-30.111-58.26-78.776-73.25-113.966-74.506a110.261 110.261 0 012.097 21.416c0 46.524-29.001 86.4-69.875 102.504 8.954 42.655-15.925 83.507 16.977 122.957 46.757 56.059 228.226-49.588 164.767-172.371zM163.852 271.107c0-5.572.42-11.048 1.222-16.401-41.415-13.574-64.354-55.544-114.969-46.775C-21.822 220.394-21.063 430.375 117 436.808c65.509 3.053 102.824-31.595 121.505-61.443-43.372-14.794-74.653-55.941-74.653-104.258z" />
//     </Svg>
//   );
// }

// export default SvgFan;

import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Easing,
  Animated,
} from 'react-native';
import Svg, {Rect} from 'react-native-svg';

export default class SvgExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationRunning: false,
      rotateValue: new Animated.Value(0),
    };
  }

  // ------- ANIMATION ---------

  _rotateAnimation = () => {
    // console.log('fan > animation > rotate > started');
    // Fan will start to rotate
    Animated.timing(this.state.rotateValue, {
      toValue: 100, // Value will change to 1
      duration: 600, // in 1 seconds
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Call after animation finish
      // console.log('fan > rotate > completed');
      if (this.props.timerRunning !== false) {
        // console.log('fan > timer active > keep rotate');
        Animated.timing(this.state.rotateValue, {
          toValue: 0, // Value will change to 1
          duration: 0, // in 1 seconds
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          this._rotateAnimation();
        });
      }
    });
  };

  handlerAnimation = async () => {
    // console.log('handler > animation > checking...');

    if (
      this.state.animationRunning === false &&
      this.props.timerRunning === true
    ) {
      console.log('handlerAnimation > starting...');
      await this.setState({animationRunning: true});
      this._rotateAnimation();
    } else if (
      this.state.animationRunning === true &&
      this.props.timerRunning === false
    ) {
      console.log('handlerAnimation > stopping...');
      await this.setState({animationRunning: false});
      Animated.timing(this.state.rotateValue).stop();
    }
  };
  // ------- LIFE ---------

  UNSAFE_componentWillReceiveProps() {}

  componentDidUpdate() {
    // console.log(
    //   `props.timerRunning: ${this.props.timerRunning} -- state.animationRunning: ${this.state.animationRunning}`,
    // );
    this.handlerAnimation();
  }

  componentWillUnmount() {
    Animated.timing(this.state.rotateValue).stop();
  }

  render() {
    const interpolatedRotateAnimation = this.state.rotateValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg'],
    });
    // console.log(this.props.timerInterval);
    // this._rotateAnimation()

    return (
      <View style={styles.fanBox}>
        {/* <Button
          title="start anim!"
          onPress={() => {
            this._rotateAnimation();
          }}
        /> */}
        <Animated.Image
          source={require('../../res/img/fan_white.png')}
          style={[
            styles.animBox,
            {transform: [{rotate: interpolatedRotateAnimation}]},
          ]}></Animated.Image>

        {/* <Svg height="50%" width="50%" viewBox="0 0 100 100">
          <Rect
            x="15"
            y="15"
            width="70"
            height="70"
            stroke="red"
            strokeWidth="2"
            fill="yellow"
          />
        </Svg> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'darkgrey',
  },
  fanBox: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    borderColor: 'orange',
    // width: 140,
    // height: 140,
  },
  animBox: {
    // position: 'absolute',
    width: 140,
    height: 140,
    borderColor: 'green',
    // borderRadius: 30,
    // borderWidth: 1,
  },
});
