import { createStackNavigator } from '@react-navigation/stack';

import { StartScreen } from "@/screens";
import { Login } from '@/screens/auth/login';
import { SignUp } from '@/screens/auth/signup';

const Stack = createStackNavigator();

export const AuthStack = () => {

  return (
    <Stack.Navigator initialRouteName="startPage" screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="startPage" 
        component={StartScreen} 
      />
      <Stack.Screen 
        name="login" 
        component={Login} 
      />
      <Stack.Screen 
        name="signup" 
        component={SignUp} 
      />
    </Stack.Navigator>
  );
}