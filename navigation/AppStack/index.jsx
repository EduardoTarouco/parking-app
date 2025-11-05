import { createStackNavigator } from '@react-navigation/stack';
import { RegisterParkingCosts } from '@/screens/app/registerParkingCosts';
import { RegisterEntryTime } from '@/screens/app/registerEntryTime';
import { Home } from '@/screens/app/home';

const Stack = createStackNavigator();

export const AppStack = () => {

  return (
    <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="home"
        component={Home}
      />
      <Stack.Screen
        name="parking-costs"
        component={RegisterParkingCosts}
      />
      <Stack.Screen
        name="entry-time"
        component={RegisterEntryTime}
      />
    </Stack.Navigator>
  );
}
