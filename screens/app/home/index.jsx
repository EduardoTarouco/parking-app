import { getAllDeparturesFromToday } from "@/services/PlateService";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOutUser } from "@/services/UserFirebaseService";
import { Button, ButtonText } from "@/components/ui/button";
import { useFocusEffect } from '@react-navigation/native';
import { Modal, Portal } from 'react-native-paper';
import { Header } from "@/components/app/header";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { View, Text } from "react-native";

export const Home = ({ navigation }) => {

  const [visible, setVisible] = React.useState(false);

  const [entries, setEntries] = useState([]);
  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const computeProfit = () => {
    let profit = 0.0;
    entries.forEach((item) => {
      const cost = parseFloat(item.cost.replace("R$", "").replace(",", ".").trim());
      profit += cost;
    });
    return profit;
  }

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const allEntries = await getAllDeparturesFromToday();
          console.log("Buscando todos os estacionamentos do dia de hoje:", allEntries);
          setEntries(allEntries);
        } catch (error) {
          console.log(error);
        }
      })();
      return () => { };
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-green-500">
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 40, borderRadius: 12 }}>
          <VStack space="lg">
            <View className="bg-white rounded-3xl border-gray-900 border-2 px-4 py-3">
              <Text className="text-sm text-gray-600 text-center">Estacionamentos hoje</Text>
              <Text className="text-3xl font-bold text-center">{entries?.length}</Text>
            </View>
            <View className="bg-white rounded-3xl border-gray-900 border-2 px-4 py-3">
              <Text className="text-sm text-gray-600 text-center">Lucro</Text>
              <Text className="text-3xl font-bold text-center">R${computeProfit()}</Text>
            </View>
          </VStack>
        </Modal>
      </Portal>

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

          <Button variant="solid" size="md" action="primary"
            onPress={showModal}
          >
            <ButtonText>Resumo diário</ButtonText>
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
