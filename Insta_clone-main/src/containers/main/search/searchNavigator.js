import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import searchScreen from './searchScreen';
import colors from '../../../res/colors';

export default function searchNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={searchScreen}
        options={{
          headerShown: false,
          title: '',
          headerStyle: {
            backgroundColor: colors.bottomBackGround,
            shadowColor: 'transparent',
          },
        }}
      />
    </Stack.Navigator>
  );
}
