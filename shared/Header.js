import React from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Header({title, subtitle, onPress, type, active}) {
  const activeText = active ? 'Running' : 'Waiting your command';
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView />
      <View style={styles.containerHeader}>
        <View style={styles.containerText}>
          <Text style={styles.headerText}>{title}</Text>
          <Text style={active ? styles.activeText : styles.deactiveText}>
            {subtitle ? subtitle : activeText}
          </Text>
        </View>
        {/* <View style={styles.containerOption}>
          <Text style={styles.optionText}>[...]</Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#333',
    shadowColor: '#323334',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.94,
    shadowRadius: 6.0,
    elevation: 10,
  },
  containerText: {},
  headerText: {
    color: 'white',
    fontWeight: '700',
  },
  activeText: {
    color: '#43B207',
  },
  deactiveText: {
    color: '#CB064A',
  },
  optionText: {color: 'white'},
  containerOption: {
    // right: 0,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    top: 0,
    paddingHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 2,
  },
});

