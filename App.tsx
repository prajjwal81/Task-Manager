import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/Screens/HomeScreen';
import DetailsScreen from './src/Screens/DetailsScreen';
import CreateTaskScreen from './src/Screens/CreateTaskScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
