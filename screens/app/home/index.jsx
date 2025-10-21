import { signOutUser } from "@/services/UserFirebaseService";
import { Button, ButtonText } from "@/components/ui/button";
import { View, Text } from "react-native";

export const Home = () => {

  return (
    <View className="flex-1 items-center justify-center bg-green-500">
      <Text className="text-xl font-bold text-white">Home screen working!</Text>

      <Button variant="solid" size="md" action="negative"
        onPress={() => {signOutUser()}}
      >
        <ButtonText>Sair</ButtonText>
      </Button>
    </View>
  );
}