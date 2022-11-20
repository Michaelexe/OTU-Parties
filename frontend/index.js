/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './store';
import {Provider} from 'react-redux';
import {NativeBaseProvider, extendTheme} from 'native-base';
import 'react-native-gesture-handler';

const newColors = {
  main: {
    50: '#f72585',
    100: '#b5179e',
    200: '#b100e8',
    300: '#7209b7',
    400: '#560bad',
    500: '#480ca8',
    600: '#3a0ca3',
    700: '#3f37c9',
    800: '#4361ee',
    900: '#4895ef',
    1000: '#4cc9f0',
  },
};

const ExtraApp = () => {
  const theme = extendTheme({
    colors: newColors,
    config: {
      initialColorMode: 'dark',
    },
  });
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <App />
      </NativeBaseProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ExtraApp);
