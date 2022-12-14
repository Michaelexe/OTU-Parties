import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from 'native-base';
import agent from '../../agent';
import {useDispatch} from 'react-redux';
import {login} from '../../reducers/users';

import ontarioTechLogo from '../../assets/ontarioTechLogo.png';

const LoginScreen = ({setSignedOutState}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = () => {
    const formData = {
      username,
      password,
    };
    agent.Auth.login(formData)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'success') {
          dispatch(login({...res.data.data}));
        }
      })
      .catch(err => {
        console.log(err);
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
          <Button
            size="lg"
            backgroundColor={'main.200'}
            style={{width: '100%'}}
            onPress={submitHandler}>
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
    marginBottom: 60,
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

export default LoginScreen;
