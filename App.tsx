import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import FeedScreen from './src/Screens/FeedScreens';
import Freind from './src/Screens/Freind';
import Chats from './src/Screens/Chats';
import Profile from './src/Screens/Profile';
import Settings from './src/Screens/Setting';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Freind') {
              iconName = 'people-outline';
            } else if (route.name === 'Chats') {
              iconName = 'chatbubbles-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            } else if (route.name === 'Settings') {
              iconName = 'settings-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={FeedScreen} />
        <Tab.Screen name="Freind" component={Freind} />
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
