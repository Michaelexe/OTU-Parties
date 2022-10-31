import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input, Button} from 'native-base';

const RegisterPage = ({setSignedOutState}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        placeholder="Email"
        size="2xl"
        color={'main.200'}
        focusOutlineColor={'main.200'}
        backgroundColor={''}
        marginBottom={4}
        value={email}
        onChange={e => {
          setEmail(e.nativeEvent.text);
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
        marginBottom={4}
        value={password}
        onChange={e => {
          setPassword(e.nativeEvent.text);
        }}
      />
      <Input
        variant="outline"
        placeholder="Confirm Password"
        type="password"
        size="2xl"
        color={'main.200'}
        focusOutlineColor={'main.200'}
        backgroundColor={''}
        marginBottom={8}
        value={confirmPassword}
        onChange={e => {
          setConfirmPassword(e.nativeEvent.text);
        }}
      />
      <Button size="lg" backgroundColor={'main.200'} style={{width: '100%'}}>
        Register
      </Button>
      <Text style={styles.smallText}>
        Already Registered?{' '}
        <Text
          style={styles.link}
          onPress={() => {
            setSignedOutState('login');
          }}>
          Login
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

export default RegisterPage;
