import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "@/global.css";

import { StartScreen } from "@/screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="startPage" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="startPage" component={StartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}