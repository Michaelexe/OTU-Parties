import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from 'native-base';
import {useDispatch} from 'react-redux';
import {logout} from '../../reducers/users';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.settingContainer}>
      <Button
        size={'md'}
        style={styles.logout}
        onPress={() => {
          dispatch(logout());
        }}>
        Log out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  settingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logout: {
    backgroundColor: 'red',
    width: '95%',
  },
});

export default SettingsScreen;
