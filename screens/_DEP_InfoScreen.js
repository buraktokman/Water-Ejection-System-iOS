import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import {
  ThemeProvider,
  DefaultTheme,
  TableView,
  NavigationRow,
  InfoRow,
  SwitchRow,
  RowItem,
  TextFieldRow,
} from 'react-native-ios-kit';
import color from 'color';

import DeviceInfo from 'react-native-device-info';
import {
  getManufacturer,
  getManufacturerSync,
  useBatteryLevel,
  useBatteryLevelIsLow,
  usePowerState,
  useFirstInstallTime,
  useDeviceName,
  useHasSystemFeature,
  useIsEmulator,
} from 'react-native-device-info';

import Header from '../shared/Header';

const theme = {
  ...DefaultTheme,
  primaryColor: '#EFFD0A',
  backgroundColor: 'black',
  textColor: 'white',
  barColor: '#202023',
  footnoteBackgroundColor: '#1C1C1C1E',
  dividerColor: '#444',
  primaryLightColor: color('tomato').lighten(0.2).rgb().string(),
  disabledColor: 'yellow',
};

const FunctionalComponent = () => {
  const batteryLevel = useBatteryLevel();
  const batteryLevelIsLow = useBatteryLevelIsLow();
  const powerState = usePowerState();
  const firstInstallTime = useFirstInstallTime();
  const deviceName = useDeviceName();
  const hasSystemFeature = useHasSystemFeature('amazon.hardware.fire_tv');
  const isEmulator = useIsEmulator();
  const deviceJSON = {
    batteryLevel,
    batteryLevelIsLow,
    powerState,
    firstInstallTime,
    deviceName,
    hasSystemFeature,
    isEmulator,
  };

  return (
    <ScrollView>
      <Text style={styles.instructions}>
        {JSON.stringify(deviceJSON, null, '  ')}
      </Text>
    </ScrollView>
  );
};

export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'constant',
      constantdeviceinfo: this.getConstantDeviceInfo(),
      asyncdeviceinfo: {},
      syncdeviceinfo: this.getSyncDeviceInfo(),
    };
  }

  getConstantDeviceInfo() {
    let deviceJSON = {};

    deviceJSON.uniqueId = DeviceInfo.getUniqueId();
    deviceJSON.deviceId = DeviceInfo.getDeviceId();
    deviceJSON.bundleId = DeviceInfo.getBundleId();
    deviceJSON.systemName = DeviceInfo.getSystemName();
    deviceJSON.systemVersion = DeviceInfo.getSystemVersion();
    deviceJSON.version = DeviceInfo.getVersion();
    deviceJSON.readableVersion = DeviceInfo.getReadableVersion();
    deviceJSON.buildNumber = DeviceInfo.getBuildNumber();
    deviceJSON.isTablet = DeviceInfo.isTablet();
    deviceJSON.appName = DeviceInfo.getApplicationName();
    deviceJSON.brand = DeviceInfo.getBrand();
    deviceJSON.model = DeviceInfo.getModel();
    deviceJSON.deviceType = DeviceInfo.getDeviceType();

    return deviceJSON;
  }

  getSyncDeviceInfo() {
    let deviceJSON = {};

    deviceJSON.manufacturer = getManufacturerSync();
    deviceJSON.buildId = DeviceInfo.getBuildIdSync();
    deviceJSON.isCameraPresent = DeviceInfo.isCameraPresentSync();
    deviceJSON.deviceName = DeviceInfo.getDeviceNameSync();
    deviceJSON.usedMemory = DeviceInfo.getUsedMemorySync();
    deviceJSON.instanceId = DeviceInfo.getInstanceIdSync();
    deviceJSON.installReferrer = DeviceInfo.getInstallReferrerSync();
    deviceJSON.installerPackageName = DeviceInfo.getInstallerPackageNameSync();
    deviceJSON.isEmulator = DeviceInfo.isEmulatorSync();
    deviceJSON.fontScale = DeviceInfo.getFontScaleSync();
    deviceJSON.hasNotch = DeviceInfo.hasNotch();
    deviceJSON.firstInstallTime = DeviceInfo.getFirstInstallTimeSync();
    deviceJSON.lastUpdateTime = DeviceInfo.getLastUpdateTimeSync();
    deviceJSON.serialNumber = DeviceInfo.getSerialNumberSync();
    deviceJSON.androidId = DeviceInfo.getAndroidIdSync();
    deviceJSON.IpAddress = DeviceInfo.getIpAddressSync();
    deviceJSON.MacAddress = DeviceInfo.getMacAddressSync(); // needs android.permission.ACCESS_WIFI_STATE
    deviceJSON.phoneNumber = DeviceInfo.getPhoneNumberSync(); // needs android.permission.READ_PHONE_STATE
    deviceJSON.ApiLevel = DeviceInfo.getApiLevelSync();
    deviceJSON.carrier = DeviceInfo.getCarrierSync();
    deviceJSON.totalMemory = DeviceInfo.getTotalMemorySync();
    deviceJSON.maxMemory = DeviceInfo.getMaxMemorySync();
    deviceJSON.totalDiskCapacity = DeviceInfo.getTotalDiskCapacitySync();
    deviceJSON.freeDiskStorage = DeviceInfo.getFreeDiskStorageSync();
    deviceJSON.batteryLevel = DeviceInfo.getBatteryLevelSync();
    deviceJSON.isLandscape = DeviceInfo.isLandscapeSync();
    deviceJSON.isAirplaneMode = DeviceInfo.isAirplaneModeSync();
    deviceJSON.isBatteryCharging = DeviceInfo.isBatteryChargingSync();
    deviceJSON.isPinOrFingerprintSet = DeviceInfo.isPinOrFingerprintSetSync();
    deviceJSON.supportedAbis = DeviceInfo.supportedAbisSync();
    deviceJSON.hasSystemFeature = DeviceInfo.hasSystemFeatureSync(
      'android.software.webview',
    );
    deviceJSON.getSystemAvailableFeatures = DeviceInfo.getSystemAvailableFeaturesSync();
    deviceJSON.powerState = DeviceInfo.getPowerStateSync();
    deviceJSON.isLocationEnabled = DeviceInfo.isLocationEnabledSync();
    deviceJSON.headphones = DeviceInfo.isHeadphonesConnectedSync();
    deviceJSON.getAvailableLocationProviders = DeviceInfo.getAvailableLocationProvidersSync();
    deviceJSON.bootloader = DeviceInfo.getBootloaderSync();
    deviceJSON.device = DeviceInfo.getDeviceSync();
    deviceJSON.display = DeviceInfo.getDisplaySync();
    deviceJSON.fingerprint = DeviceInfo.getFingerprintSync();
    deviceJSON.hardware = DeviceInfo.getHardwareSync();
    deviceJSON.host = DeviceInfo.getHostSync();
    deviceJSON.product = DeviceInfo.getProductSync();
    deviceJSON.tags = DeviceInfo.getTagsSync();
    deviceJSON.type = DeviceInfo.getTypeSync();
    deviceJSON.baseOS = DeviceInfo.getBaseOsSync();
    deviceJSON.previewSdkInt = DeviceInfo.getPreviewSdkIntSync();
    deviceJSON.securityPatch = DeviceInfo.getSecurityPatchSync();
    deviceJSON.codename = DeviceInfo.getCodenameSync();
    deviceJSON.incremental = DeviceInfo.getIncrementalSync();
    deviceJSON.supported32BitAbis = DeviceInfo.supported32BitAbisSync();
    deviceJSON.supported64BitAbis = DeviceInfo.supported64BitAbisSync();

    return deviceJSON;
  }

  async componentDidMount() {
    let deviceJSON = {};

    try {
      deviceJSON.manufacturer = await getManufacturer();
      deviceJSON.buildId = await DeviceInfo.getBuildId();
      deviceJSON.isCameraPresent = await DeviceInfo.isCameraPresent();
      deviceJSON.deviceName = await DeviceInfo.getDeviceName();
      deviceJSON.usedMemory = await DeviceInfo.getUsedMemory();
      deviceJSON.userAgent = await DeviceInfo.getUserAgent();
      deviceJSON.instanceId = await DeviceInfo.getInstanceId();
      deviceJSON.installReferrer = await DeviceInfo.getInstallReferrer();
      deviceJSON.installerPackageName = await DeviceInfo.getInstallerPackageName();
      deviceJSON.isEmulator = await DeviceInfo.isEmulator();
      deviceJSON.fontScale = await DeviceInfo.getFontScale();
      deviceJSON.hasNotch = await DeviceInfo.hasNotch();
      deviceJSON.firstInstallTime = await DeviceInfo.getFirstInstallTime();
      deviceJSON.lastUpdateTime = await DeviceInfo.getLastUpdateTime();
      deviceJSON.serialNumber = await DeviceInfo.getSerialNumber();
      deviceJSON.androidId = await DeviceInfo.getAndroidId();
      deviceJSON.IpAddress = await DeviceInfo.getIpAddress();
      deviceJSON.MacAddress = await DeviceInfo.getMacAddress(); // needs android.permission.ACCESS_WIFI_STATE
      deviceJSON.phoneNumber = await DeviceInfo.getPhoneNumber(); // needs android.permission.READ_PHONE_STATE
      deviceJSON.ApiLevel = await DeviceInfo.getApiLevel();
      deviceJSON.carrier = await DeviceInfo.getCarrier();
      deviceJSON.totalMemory = await DeviceInfo.getTotalMemory();
      deviceJSON.maxMemory = await DeviceInfo.getMaxMemory();
      deviceJSON.totalDiskCapacity = await DeviceInfo.getTotalDiskCapacity();
      deviceJSON.freeDiskStorage = await DeviceInfo.getFreeDiskStorage();
      deviceJSON.batteryLevel = await DeviceInfo.getBatteryLevel();
      deviceJSON.isLandscape = await DeviceInfo.isLandscape();
      deviceJSON.isAirplaneMode = await DeviceInfo.isAirplaneMode();
      deviceJSON.isBatteryCharging = await DeviceInfo.isBatteryCharging();
      deviceJSON.isPinOrFingerprintSet = await DeviceInfo.isPinOrFingerprintSet();
      deviceJSON.supportedAbis = await DeviceInfo.supportedAbis();
      deviceJSON.hasSystemFeature = await DeviceInfo.hasSystemFeature(
        'android.software.webview',
      );
      deviceJSON.getSystemAvailableFeatures = await DeviceInfo.getSystemAvailableFeatures();
      deviceJSON.powerState = await DeviceInfo.getPowerState();
      deviceJSON.isLocationEnabled = await DeviceInfo.isLocationEnabled();
      deviceJSON.headphones = await DeviceInfo.isHeadphonesConnected();
      deviceJSON.getAvailableLocationProviders = await DeviceInfo.getAvailableLocationProviders();
      deviceJSON.bootloader = await DeviceInfo.getBootloader();
      deviceJSON.device = await DeviceInfo.getDevice();
      deviceJSON.display = await DeviceInfo.getDisplay();
      deviceJSON.fingerprint = await DeviceInfo.getFingerprint();
      deviceJSON.hardware = await DeviceInfo.getHardware();
      deviceJSON.host = await DeviceInfo.getHost();
      deviceJSON.product = await DeviceInfo.getProduct();
      deviceJSON.tags = await DeviceInfo.getTags();
      deviceJSON.type = await DeviceInfo.getType();
      deviceJSON.baseOS = await DeviceInfo.getBaseOs();
      deviceJSON.previewSdkInt = await DeviceInfo.getPreviewSdkInt();
      deviceJSON.securityPatch = await DeviceInfo.getSecurityPatch();
      deviceJSON.codename = await DeviceInfo.getCodename();
      deviceJSON.incremental = await DeviceInfo.getIncremental();
      deviceJSON.supported32BitAbis = await DeviceInfo.supported32BitAbis();
      deviceJSON.supported64BitAbis = await DeviceInfo.supported64BitAbis();
      try {
        deviceJSON.deviceToken = await DeviceInfo.getDeviceToken();
      } catch (e) {
        console.log(
          'Trouble getting device token, likely a simulator or not iOS11+',
        );
      }
    } catch (e) {
      console.log('Trouble getting device info ', e);
    }
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({asyncdeviceinfo: deviceJSON});
    this.forceUpdate();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.activeTab === 'constant' ? (
          <>
            <ThemeProvider theme={theme}>
              <View style={styles.container}>
                <Header title="iDevice Info" />
                <View style={styles.settingsTable}>
                  <ScrollView>
                    <TableView
                      header="Welcome to Global Settings"
                      headerStyle={{alignItems: 'center'}}
                      footer="All notifications will be disabled if you toggle this off"
                      footerStyle={{alignItems: 'center'}}
                      withoutFooter={false}
                      withoutHeader={false}>
                      <InfoRow title="TITLE_HERE" info="VALUE" />
                    </TableView>
                    <TableView
                      header="Must Know Info"
                      headerStyle={{alignItems: 'center'}}
                      withoutFooter={true}
                      withoutHeader={false}>
                      <InfoRow
                        title="Name"
                        info={async () => {
                          JSON.stringify(await DeviceInfo.getDeviceName());
                        }}
                      />
                      <InfoRow title="Brand" info={DeviceInfo.getBrand()} />
                      <InfoRow title="Model" info={DeviceInfo.getModel()} />
                      <InfoRow title="Warranty" info="N/A" />
                      <InfoRow
                        title="Serial Number"
                        info={DeviceInfo.getSerialNumberSync()}
                      />
                      <InfoRow
                        title="Unique ID"
                        info={DeviceInfo.getUniqueId()}
                      />
                      <InfoRow
                        title="Device ID"
                        info={DeviceInfo.getDeviceId()}
                      />
                      <InfoRow title="Type" info={DeviceInfo.getDeviceType()} />
                    </TableView>
                    <TableView
                      header="Memory"
                      headerStyle={{alignItems: 'center'}}
                      withoutFooter={true}
                      withoutHeader={false}>
                      <InfoRow
                        title="Total RAM"
                        info={Math.floor(
                          DeviceInfo.getTotalMemorySync() / 1024 / 1024 / 1024,
                        )}
                      />
                      <InfoRow
                        title="Used RAM"
                        info={Math.floor(
                          DeviceInfo.getUsedMemorySync() / 1024 / 1024 / 1024,
                        )}
                      />
                    </TableView>

                    <TableView
                      header="Storage"
                      headerStyle={{alignItems: 'center'}}
                      withoutFooter={true}
                      withoutHeader={false}>
                      <InfoRow
                        title="Free Storage"
                        info={Math.floor(
                          DeviceInfo.getFreeDiskStorageSync() /
                            1024 /
                            1024 /
                            1024,
                        )}
                      />
                      <InfoRow
                        title="Total Storage"
                        info={Math.floor(
                          DeviceInfo.getTotalDiskCapacitySync() /
                            1024 /
                            1024 /
                            1024,
                        )}
                      />
                    </TableView>

                    <TableView
                      header="Network"
                      headerStyle={{alignItems: 'center'}}
                      withoutFooter={true}
                      withoutHeader={false}>
                      <InfoRow
                        title="IP Address"
                        info={DeviceInfo.getIpAddressSync()}
                      />
                      <InfoRow
                        title="MAC Address"
                        info={DeviceInfo.getMacAddressSync()}
                      />
                      <InfoRow
                        title="Carrier"
                        info={DeviceInfo.getCarrierSync()}
                      />
                      <InfoRow
                        title="Airplane Mode"
                        info={JSON.stringify(DeviceInfo.isAirplaneModeSync())}
                      />
                      <InfoRow
                        title="User Agent"
                        info={async () => {
                          JSON.stringify(await DeviceInfo.getUserAgent());
                        }}
                      />
                    </TableView>

                    <TableView
                      header="Battery & Power"
                      headerStyle={{alignItems: 'center'}}
                      withoutFooter={true}
                      withoutHeader={false}>
                      <InfoRow
                        title="Battery Level"
                        info={JSON.stringify(DeviceInfo.getBatteryLevelSync())}
                      />
                      <InfoRow
                        title="Battery Charging"
                        info={JSON.stringify(
                          DeviceInfo.isBatteryChargingSync(),
                        )}
                      />
                      <InfoRow
                        title="Power State"
                        info={JSON.stringify(DeviceInfo.getPowerStateSync())}
                      />
                    </TableView>

                    <TableView
                      header="Software"
                      headerStyle={{alignItems: 'center'}}
                      withoutFooter={true}
                      withoutHeader={false}>
                      <InfoRow
                        title="Operating System"
                        info={DeviceInfo.getSystemName()}
                      />
                      <InfoRow
                        title="OS Version"
                        info={DeviceInfo.getSystemVersion()}
                      />
                      <InfoRow
                        title="First Install"
                        info={DeviceInfo.getFirstInstallTimeSync()}
                      />
                      <InfoRow
                        title="Last Update"
                        info={DeviceInfo.getLastUpdateTimeSync()}
                      />
                    </TableView>

                    <TableView
                      header="GLOBAL POSITIONING"
                      headerStyle={{alignItems: 'center'}}
                      withoutFooter={true}
                      withoutHeader={false}>
                      <InfoRow
                        title="GPS Positioning"
                        info={DeviceInfo.isLocationEnabledSync()}
                      />
                      <InfoRow
                        title="Location Provider"
                        info={JSON.stringify(
                          DeviceInfo.getAvailableLocationProvidersSync(),
                        )}
                      />
                    </TableView>

                    <TableView
                      header="Hardware"
                      headerStyle={{alignItems: 'center'}}
                      withoutFooter={true}
                      withoutHeader={false}>
                      
                      <InfoRow
                        title="Manufacturer"
                        info={getManufacturerSync()}
                      />
                      <InfoRow
                        title="CPU Architecture"
                        info={DeviceInfo.supportedAbisSync()}
                      />
                      <InfoRow
                        title="Display"
                        info={DeviceInfo.getDisplaySync()}
                      />
                      <InfoRow
                        title="Device"
                        info={DeviceInfo.getDeviceSync()}
                      />
                      <InfoRow
                        title="Product"
                        info={DeviceInfo.getProductSync()}
                      />
                      <InfoRow title="Host" info={DeviceInfo.getHostSync()} />
                      <InfoRow
                        title="Hardware"
                        info={DeviceInfo.getHardwareSync()}
                      />
                      <InfoRow
                        title="Fingerprint"
                        info={DeviceInfo.getFingerprintSync()}
                      />
                      <InfoRow
                        title="Headphone Connection"
                        info={JSON.stringify(
                          DeviceInfo.isHeadphonesConnectedSync(),
                        )}
                      />
                      <InfoRow
                        title="Landscape"
                        info={JSON.stringify(DeviceInfo.isLandscapeSync())}
                      />
                    </TableView>

                    <TableView
                      footerStyle={{alignItems: 'center'}}
                      footer="Developed by Bulrosa with 💕"
                      // onFooterPress={() => alert('Hello')}
                    >
                      <InfoRow title="TITLE_HERE" info="VALUE" />
                    </TableView>
                  </ScrollView>
                </View>
              </View>
            </ThemeProvider>
          </>
        ) : this.state.activeTab === 'sync' ? (
          <>
            <Text style={styles.welcome}>
              react-native-device-info example - sync info:
            </Text>
            <ScrollView>
              <Text style={styles.instructions}>
                {JSON.stringify(this.state.syncdeviceinfo, null, '  ')}
              </Text>
            </ScrollView>
          </>
        ) : this.state.activeTab === 'async' ? (
          <>
            <Text style={styles.welcome}>
              react-native-device-info example - async info:
            </Text>
            <ScrollView>
              <Text style={styles.instructions}>
                {JSON.stringify(this.state.asyncdeviceinfo, null, '  ')}
              </Text>
            </ScrollView>
          </>
        ) : this.state.activeTab === 'hooks' ? (
          <>
            <Text style={styles.welcome}>
              react-native-device-info example - hooks:
            </Text>
            <FunctionalComponent />
          </>
        ) : null}

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => this.setState({activeTab: 'constant'})}>
            <Text
              style={[
                styles.tabText,
                this.state.activeTab === 'constant' && styles.boldText,
              ]}>
              Constant
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => this.setState({activeTab: 'sync'})}>
            <Text
              style={[
                styles.tabText,
                this.state.activeTab === 'sync' && styles.boldText,
              ]}>
              Sync
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => this.setState({activeTab: 'async'})}>
            <Text
              style={[
                styles.tabText,
                this.state.activeTab === 'async' && styles.boldText,
              ]}>
              Async
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => this.setState({activeTab: 'hooks'})}>
            <Text
              style={[
                styles.tabText,
                this.state.activeTab === 'hooks' && styles.boldText,
              ]}>
              Hooks
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'left',
    color: '#333333',
    margin: 5,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopColor: '#333333',
    borderTopWidth: 1,
  },
  tab: {
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: '#333333',
  },
  boldText: {
    fontWeight: '700',
  },
});
