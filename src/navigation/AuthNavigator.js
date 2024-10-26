import {View, Text} from 'react-native';
import React from 'react';
import LoginScreen from '../screen/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const AuthNavigator = ({setIsAuthenticated}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{headerShown: false}}>
        {props => (
          <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
