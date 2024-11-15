import {View, Text} from 'react-native';
import React from 'react';
import LoginScreen from '../screen/LoginScreen';
import EmailAddForm from '../screen/EmailForm';
import PasswordChangeForm from '../screen/ChangePassword';
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
      <Stack.Screen
        name="EmailBox"
        component={PasswordChangeForm}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
