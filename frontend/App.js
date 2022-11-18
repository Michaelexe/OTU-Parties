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
import RegisterPage from './screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import agent from './agent';
import {login, logout} from './reducers/users';

function App() {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [signedOutState, setSignedOutState] = useState('login');

  const user = useSelector(state => state.user);

  const loadingHandler = async () => {
    const access = await AsyncStorage.getItem('user_jwt');
    if (access && access !== '') {
      agent.User.getInfo()
        .then(res => {
          dispatch(login(res.data));
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch(err => {
          console.log(err);
          dispatch(logout());
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        });
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    loadingHandler();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  } else if (!loading && !user.isAuthenticated) {
    if (signedOutState == 'login') {
      return <LoginScreen setSignedOutState={setSignedOutState} />;
    } else {
      return <RegisterPage setSignedOutState={setSignedOutState} />;
    }
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
          <Tab.Screen
            name="Parties"
            component={PartiesScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen name="Join" component={JoinScreen} />
          <Tab.Screen name="Create" component={CreateScreen} />
          <Tab.Screen name="Setting" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
