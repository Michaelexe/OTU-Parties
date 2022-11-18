import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './main';
import PartyInfo from './partyInfo';

const Stack = createStackNavigator();

const PartiesScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111111',
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{title: 'Parties'}}
      />
      <Stack.Screen
        name="Party Info"
        component={PartyInfo}
        options={({route}) => ({
          title: route.params.party.party_name,
        })}
      />
    </Stack.Navigator>
  );
};

export default PartiesScreen;
