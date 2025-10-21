import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { View } from "react-native";

export const StartScreen = ({ navigation }) => {

  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Heading className="text-2xl font-bold text-white">
        Seja bem vindo ao Parking App!
      </Heading>

      <VStack space="md" className="mt-5 px-10">
        <Button variant="solid" size="md" action="primary"
          onPress={() => {navigation.push("login")}}
        >
          <ButtonText>Entrar</ButtonText>
        </Button>

        <Button variant="solid" size="md" action="secondary"
          onPress={() => {navigation.push("signup")}}
        >
          <ButtonText>Cadastrar-se</ButtonText>
        </Button>
      </VStack>
    </View>
  );
}