import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input, Button} from 'native-base';
import agent from '../../agent';
import {useDispatch} from 'react-redux';
import {login} from '../../reducers/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterPage = ({setSignedOutState}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const submitHandler = () => {
    agent.Auth.register({
      username,
      email,
      password,
      repeatPassword,
    })
      .then(res => {
        dispatch(login({...res.data, created: [], joined: []}));
      })
      .catch(err => {
        console.log(err.response);
      });
  };

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
        value={repeatPassword}
        onChange={e => {
          setRepeatPassword(e.nativeEvent.text);
        }}
      />
      <Button
        size="lg"
        backgroundColor={'main.200'}
        style={{width: '100%'}}
        onPress={submitHandler}>
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
