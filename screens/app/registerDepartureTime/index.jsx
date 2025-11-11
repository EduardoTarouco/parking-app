import { getAllEntriesFromToday, addCarDeparture } from "@/services/PlateService";
import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";
import { getParkingCost } from "@/services/ParkingService";
import { TouchableOpacity, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaskedTextInput } from "react-native-mask-text";
import { Input, InputIcon } from "@/components/ui/input";
import { Controller, useForm } from 'react-hook-form';
import { Clock, Calendar } from 'lucide-react-native';
import { Modal, Portal } from 'react-native-paper';
import { Heading } from '@/components/ui/heading';
import { Header } from "@/components/app/header";
import { VStack } from '@/components/ui/vstack';
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";

export const RegisterDepartureTime = ({ navigation }) => {

  const userId = getAuth().currentUser.uid;
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      userId: userId,
      date: "",
      hours: ""
    }
  });

  const [visible, setVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [entries, setEntries] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const hideModal = () => setVisible(false);
  const showModal = (item) => {
    setVisible(true);
    setModalItem(item);
  };

  const onSubmit = async ({ hours, date, ...data }) => {
    try {
      const [day, month, year] = date.split("/").map(Number);
      const [hour, minute] = hours.split(":").map(Number);
      const newDate = new Date(year, month - 1, day, hour, minute);

      const parkingCost = parseFloat(((await getParkingCost(userId)).parkingCost).replace("R$", "").replace(",", ".").trim());
      console.log("Custo de estacionamento por hora:", parkingCost);
      const parkingCostByMinute = parkingCost / 60;
      console.log("Custo de estacionamento por minuto:", parkingCostByMinute);

      const entryTimestamp = modalItem?.date;

      if (!entryTimestamp) {
        throw new Error("Data de entrada não encontrada no registro selecionado.");
      }
      const entryDate = entryTimestamp.toDate ? entryTimestamp.toDate() : new Date(entryTimestamp);
      const diffMs = newDate - entryDate;

      if (diffMs < 0) {
        throw new Error("A data de saída não pode ser anterior à data de entrada.");
      }

      const diffMinutes = Math.floor(diffMs / 1000 / 60);
      console.log("Tempo estacionado em min:", diffMinutes);
      const totalCost = diffMinutes * parkingCostByMinute;
      console.log("Custo total:", totalCost);

      const parsedData = {
        plate: modalItem?.plate,
        entryDate: entryTimestamp,
        departureDate: Timestamp.fromDate(newDate),
        cost: "R$" + totalCost,
        ...data
      }

      setCost(totalCost.toFixed(2).replace(".", ","));
      addCarDeparture(parsedData);
      setErrorMessage(null);
      hideModal();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

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
          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 40, borderRadius: 12 }}>
              <VStack space="lg">
                <View className="bg-white rounded-3xl border-gray-900 border-2 px-4 py-3">
                  <Text className="text-sm text-gray-600 text-center">Placa</Text>
                  <Text className="text-3xl font-bold text-center">{modalItem?.plate}</Text>
                </View>

                <VStack space="xs">
                  <Text className={`text-typography-500 ${errors.date ? "text-red-500" : ""}`}>Data*</Text>
                  <Controller
                    control={control}
                    name="date"
                    rules={{
                      minLength: { value: 10, message: "Data inadequada" },
                      maxLength: { value: 10, message: "Data inadequada" },
                      required: { value: true, message: "Data é obrigatória" }
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input variant="rounded" size="xl" className={`text-center ${errors.date ? "border-2" : ""}`} isInvalid={errors.date}>
                        <InputIcon as={Calendar} className="m-3 -mr-1" color={errors.date ? "red" : "currentColor"} />
                        <MaskedTextInput
                          style={{ flex: 1, paddingHorizontal: 14 }}
                          mask="99/99/9999"
                          type="text"
                          placeholder="01/01/2000"
                          keyboardType="numeric"
                          value={value}
                          onChangeText={onChange}
                        />
                      </Input>
                    )}
                  />
                  {errors.date && <Text className="text-red-500 text-sm ml-5">{errors.date.message}</Text>}
                </VStack>

                <VStack space="xs">
                  <Text className={`text-typography-500 ${errors.hours ? "text-red-500" : ""}`}>Horário*</Text>
                  <Controller
                    control={control}
                    name="hours"
                    rules={{
                      required: {value: true, message: "Horário é obrigatório"},
                      minLength: { value: 5, message: "Horário inadequado" }
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input variant="rounded" size="xl" className={`text-center ${errors.hours ? "border-2" : ""}`} isInvalid={errors.hours}>
                        <InputIcon as={Clock} className="m-3 -mr-1" color={errors.hours ? "red" : "currentColor"} />
                        <MaskedTextInput
                          style={{ flex: 1, paddingHorizontal: 14 }}
                          mask="99:99"
                          type="text"
                          placeholder="23:59"
                          keyboardType="numeric"
                          value={value}
                          onChangeText={onChange}
                        />
                      </Input>
                    )}
                  />
                  {errors.hours && <Text className="text-red-500 text-sm ml-5">{errors.hours.message}</Text>}
                </VStack>

                {errorMessage && <Text className="text-red-500 text-md">{errorMessage}</Text>}

                <Button
                  action={"primary"}
                  variant={"solid"}
                  size={"lg"}
                  onPress={handleSubmit(onSubmit)}
                >
                  <ButtonText>Enviar</ButtonText>
                </Button>
              </VStack>
            </Modal>
          </Portal>

          <Heading size={"4xl"} className="text-center">Registrar saída</Heading>
          <FlatList
            className="w-full p-2 gap-2"
            data={entries}
            ListEmptyComponent={
              <Text className="text-center">
                Ainda não foi registrada nenhuma placa no dia de hoje
              </Text>}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => { showModal(item) }}
                className="bg-white rounded-3xl border-gray-900 border-2 px-4 py-3 mb-2"
              >
                <Text className="text-sm text-gray-600 text-center">Placa</Text>
                <Text className="text-3xl font-bold text-center">{item.plate}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
