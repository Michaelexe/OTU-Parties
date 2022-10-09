import react, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ClubScreen from './screens/ClubsScreen';
import SettingsScreen from './screens/SettingsScreen';
import CreateScreen from './screens/CreateScreen';
import JoinScreen from './screens/JoinScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingScreen from './screens/LoadingScreen';

function App() {
  const Tab = createBottomTabNavigator();
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={{backgroundColor: '#111111'}}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'Clubs') {
                return (
                  <MaterialCommunityIcons
                    name="account-group-outline"
                    color={color}
                    size={focused ? 31 : 28}
                  />
                );
              } else if (route.name === 'Setting') {
                return (
                  <Ionicons
                    name="settings-outline"
                    color={color}
                    size={focused ? 31 : 28}
                  />
                );
              } else if (route.name === 'Join') {
                return (
                  <Ionicons
                    name="enter-outline"
                    color={color}
                    size={focused ? 31 : 28}
                  />
                );
              } else if (route.name === 'Create') {
                return (
                  <Ionicons
                    name="create-outline"
                    color={color}
                    size={focused ? 31 : 28}
                  />
                );
              }
            },
            tabBarActiveTintColor: '#57e6ff',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#111111',
              height: 60,
            },
            tabBarActiveBackgroundColor: 'black',
            tabBarLabelStyle: {
              fontSize: 15,
              fontWeight: '900',
            },
            headerStyle: {
              backgroundColor: '#111111',
            },
            headerTintColor: 'white',
          })}>
          <Tab.Screen name="Clubs" component={ClubScreen} />
          <Tab.Screen name="Join" component={JoinScreen} />
          <Tab.Screen name="Create" component={CreateScreen} />
          <Tab.Screen name="Setting" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
