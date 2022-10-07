import react from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ClubScreen from './screens/ClubsScreen';
import SettingsScreen from './screens/SettingsScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Clubs') {
              return <FontAwesome name="group" color={color} size={30} />;
            } else if (route.name === 'Setting') {
              return <Ionicons name="settings" color={color} size={size} />;
            }
          },
          tabBarActiveTintColor: 'darkblue',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Clubs" component={ClubScreen} />
        <Tab.Screen name="Setting" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
