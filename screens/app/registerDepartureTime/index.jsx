import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import { getAllEntriesFromToday } from "@/services/PlateService";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from '@react-navigation/native';
import { Header } from "@/components/app/header";
import React, { useState } from "react";
import { FlatList } from "react-native";

export const RegisterDepartureTime = ({ navigation }) => {

  const [entries, setEntries] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const allEntries = await getAllEntriesFromToday();
          console.log("Buscando todas as entradas do dia de hoje:", allEntries);
          setEntries(allEntries);
        } catch (error) {
          console.log(error);
        }
      })();
      return () => { };
    }, [])
  );

  return (
    <SafeAreaView className="bg-yellow-200 flex-1">
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
      >
        <Header />
        <View className="bg-yellow-200 flex-1 flex justify-center items-center gap-2 p-5">
          <FlatList
            className="w-full p-2"
            data={entries}
            ListEmptyComponent={
              <Text className="text-center">
                Ainda não foi registrada nenhuma placa no dia de hoje
              </Text>}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                className="bg-white rounded-3xl border-gray-900 border-2 px-4 py-3"
              >
                <Text className="text-sm text-gray-600 text-center">Placa</Text>
                <Text className="text-3xl font-bold text-center">{item.plate}</Text>
              </View>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
