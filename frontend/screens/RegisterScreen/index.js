import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input, Button} from 'native-base';
import agent from '../../agent';
import {useDispatch} from 'react-redux';
import {login} from '../../reducers/users';

import ontarioTechLogo from '../../assets/ontarioTechLogo.png';

const RegisterPage = ({setSignedOutState}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = () => {
    setLoading(true);
    agent.Auth.register({
      username,
      email,
      password,
      repeatPassword,
    })
      .then(res => {
        dispatch(login({...res.data, created: [], joined: []}));
        setLoading(false);
      })
      .catch(err => {
        console.log(err.response);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        <Image source={ontarioTechLogo} style={styles.logo} />
        <View style={styles.formContainer}>
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
            isLoading={loading}
            isDisabled={loading}
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
        </View>
      </ScrollView>
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
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto',
    marginBottom: 60,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
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
