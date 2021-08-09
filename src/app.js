import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  SafeAreaView,
  YellowBox,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import InfoScreen from '../screens/InfoScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EjectScreen from '../screens/EjectScreen';
import SubscribeScreen from '../screens/SubscribeScreen';
import NotifyScreen from '../screens/NotifyScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackSettings() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Settings">
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Subscribe" component={SubscribeScreen} />
    </Stack.Navigator>
  );
}

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBar}
            activeOpacity={0.9}>
            <View
              style={{
                // flex:1,
                // backgroundColor:'red',
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.tabBarText,
                  {color: isFocused ? '#489dcf' : 'white'},
                ]}>
                {route.name === 'Eject' ? (
                  <MaterialCommunityIcons name={'water'} size={32} />
                ) : route.name === 'History' ? (
                  <Ionicons
                    name={'ios-stats'}
                    size={25}
                    // color="white"
                  />
                ) : route.name === 'Info' ? (
                  <Ionicons name={'ios-information-circle-outline'} size={25} />
                ) : route.name === 'Settings' ? (
                  <Ionicons name={'ios-settings'} size={25} />
                ) : (
                  <FontAwesome5 name={'unknown'} size={16} />
                )}
              </Text>
            </View>

            {/* <Text
              style={[
                styles.tabBarText,
                {color: isFocused ? '#43B207' : 'black'},
              ]}>
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  console.log('App.js > initiated');

  // ------

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Eject"
        tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Eject" component={EjectScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Info" component={InfoScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      <SafeAreaView style={{backgroundColor: '#333'}} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  tabBarText: {
    // textAlignVertical:'center',
    // backgroundColor:'red',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '400',
    // textTransform: 'uppercase',
  },
  tabBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    height: 40,
    backgroundColor: '#333',
    borderColor: '#444',
    borderTopWidth: 1,
    // position: 'absolute',
    // bottom: 0,
  },
});

// Hide Warnings
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Switch',
]);
