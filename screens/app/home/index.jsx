import { SafeAreaView } from "react-native-safe-area-context";
import { signOutUser } from "@/services/UserFirebaseService";
import { Button, ButtonText } from "@/components/ui/button";
import { Header } from "@/components/app/header";
import { VStack } from "@/components/ui/vstack";
import { View } from "react-native";

export const Home = ({ navigation }) => {

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-green-500">
      <Header />

      <View className="flex-1 p-4">
        <VStack space="sm">
          <Button variant="solid" size="md" action="primary"
            onPress={() => { navigation.navigate('parking-costs') }}
          >
            <ButtonText>Registrar custo de estacionamento</ButtonText>
          </Button>

          <Button variant="solid" size="md" action="primary"
            onPress={() => { navigation.navigate('entry-time') }}
          >
            <ButtonText>Registrar entrada de carro</ButtonText>
          </Button>
          
          <Button variant="solid" size="md" action="primary"
            onPress={() => { navigation.navigate('departure-time') }}
          >
            <ButtonText>Registrar saída de carro</ButtonText>
          </Button>

          <Button variant="solid" size="md" action="negative"
            onPress={() => { signOutUser() }}
          >
            <ButtonText>Sair</ButtonText>
          </Button>
        </VStack>
      </View>
    </SafeAreaView>
  );
}
