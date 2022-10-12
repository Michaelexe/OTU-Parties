import react, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import PartiesScreen from './screens/PartiesScreen';
import SettingsScreen from './screens/SettingsScreen';
import CreateScreen from './screens/CreateScreen';
import JoinScreen from './screens/JoinScreen';
import LoginScreen from './screens/LoginScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingScreen from './screens/LoadingScreen';

function App() {
  const Tab = createBottomTabNavigator();
  const [loading, setLoading] = useState(true);

  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user.isAuthenticated) {
      console.log('going here');
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  } else if (!loading && !user.isAuthenticated) {
    return <LoginScreen />;
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={{backgroundColor: '#111111'}}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'Parties') {
                return (
                  <MaterialCommunityIcons
                    name="party-popper"
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
          <Tab.Screen name="Parties" component={PartiesScreen} />
          <Tab.Screen name="Join" component={JoinScreen} />
          <Tab.Screen name="Create" component={CreateScreen} />
          <Tab.Screen name="Setting" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
