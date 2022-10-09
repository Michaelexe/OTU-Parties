import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {ActivityIndicator} from '@react-native-material/core';

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
      <ActivityIndicator size="large" color="#57e6ff" />
    </SafeAreaView>
  );
};

export default LoadingScreen;
