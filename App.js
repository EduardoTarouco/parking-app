import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { PaperProvider } from "react-native-paper";
import { useState, useEffect } from 'react';
import { auth } from '@/firebaseConfig';
import "@/global.css";

import { AppStack } from '@/navigation/AppStack';
import { AuthStack } from '@/navigation/AuthStack';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GluestackUIProvider>
      <PaperProvider>
        <NavigationContainer>
          {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      </PaperProvider>
    </GluestackUIProvider>
  );
}
