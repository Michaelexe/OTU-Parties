import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input, Button} from 'native-base';

const LoginScreen = ({setSignedOutState}) => {
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
        marginBottom={4}
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
        marginBottom={6}
        value={password}
        onChange={e => {
          setPassword(e.nativeEvent.text);
        }}
      />
      <Button size="lg" backgroundColor={'main.200'} style={{width: '100%'}}>
        Login
      </Button>
      <Text style={styles.smallText}>
        Don't have an account?{' '}
        <Text
          style={styles.link}
          onPress={() => {
            setSignedOutState('register');
          }}>
          Register
        </Text>
      </Text>
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
  smallText: {
    color: 'white',
    fontSize: 15,
    marginVertical: 10,
  },
  link: {
    color: '#7209b7',
    textDecorationLine: 'underline',
    textDecorationColor: '#7209b7',
  },
});

export default LoginScreen;
