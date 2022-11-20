import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../reducers/users';
import agent from '../../agent';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const deleteUserHandler = () => {
    agent.User.delete()
      .then(res => {
        if (res.data.status == 'success') {
          dispatch(logout());
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ScrollView
      style={styles.settingContainer}
      contentContainerStyle={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        display: 'flex',
      }}>
      <View style={styles.userContainer}>
        <View style={styles.userImage}>
          <Text style={styles.userImageText}>{user.user.username[0]}</Text>
        </View>
        <View style={styles.userText}>
          <Text style={styles.userTextUsername}>{user.user.username}</Text>
          <Text style={styles.userTextEmail}>{user.user.email}</Text>
        </View>
      </View>
      <Button
        size={'md'}
        style={styles.logout}
        _text={{fontSize: 18, fontWeight: '700'}}
        onPress={() => {
          dispatch(logout());
        }}>
        Log out
      </Button>
      <Button
        size={'md'}
        style={styles.delete}
        _text={{fontSize: 18, fontWeight: '700', color: 'red.500'}}
        variant="outline"
        onPress={deleteUserHandler}>
        Delete Account
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  settingContainer: {
    width: '100%',
  },
  logout: {
    backgroundColor: 'red',
    width: '100%',
  },
  delete: {
    borderColor: 'red',
    borderWidth: 2,
    marginTop: 10,
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    borderColor: 'orange',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  userImage: {
    height: 60,
    width: 60,
    backgroundColor: 'orange',
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  userImageText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 30,
  },
  userText: {
    display: 'flex',
    justifyContent: 'center',
  },
  userTextUsername: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  userTextEmail: {
    color: '#dddddd',
    fontWeight: '500',
    fontSize: 15,
  },
});

export default SettingsScreen;
