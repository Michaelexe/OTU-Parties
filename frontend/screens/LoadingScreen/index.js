import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';

import ontarioTechLogo from '../../assets/ontarioTechLogo.png';

const LoadingScreen = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#111111',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View>
        <Image source={ontarioTechLogo} style={{width: 200}} />
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
