import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/homeScreen';
import AudioScreen from './src/audioScreen';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'orange',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Music',
          }}
        />
        <Stack.Screen
          name="Audio"
          component={AudioScreen}
          options={{
            title: 'Audio Player',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
