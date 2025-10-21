import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '@/screens/app/home';

const Stack = createStackNavigator();

export const AppStack = () => {

  return (
    <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="home" 
        component={Home} 
      />
    </Stack.Navigator>
  );
}