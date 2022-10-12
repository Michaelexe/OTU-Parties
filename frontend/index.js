/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './store';
import {Provider} from 'react-redux';
import {NativeBaseProvider, extendTheme} from 'native-base';

const newColors = {
  main: {
    50: '#f72585',
    100: '#b5179e',
    200: '#7209b7',
    300: '#560bad',
    400: '#480ca8',
    500: '#3a0ca3',
    600: '#3f37c9',
    700: '#4361ee',
    800: '#4895ef',
    900: '#4cc9f0',
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
