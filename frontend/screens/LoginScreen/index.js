import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input, Button} from 'native-base';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Input
        variant="outline"
        placeholder="Username"
        size="2xl"
        color={'main.200'}
        focusOutlineColor={'main.200'}
        backgroundColor={''}
        marginBottom={3}
        value={username}
        onChange={e => {
          setUsername(e.nativeEvent.text);
        }}
      />
      <Input
        variant="outline"
        placeholder="Password"
        type="password"
        size="2xl"
        color={'main.200'}
        focusOutlineColor={'main.200'}
        backgroundColor={''}
        marginBottom={3}
        value={password}
        onChange={e => {
          setPassword(e.nativeEvent.text);
        }}
      />
      <Button size="lg" backgroundColor={'main.200'} style={{width: '100%'}}>
        Login
      </Button>
      <Text>LoginScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#111111',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 20,
  },
});

export default LoginScreen;
