import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { Clock, Calendar, CarFront } from 'lucide-react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { MaskedTextInput } from "react-native-mask-text";
import { Controller, useForm } from 'react-hook-form';
import { addCarEntry } from "@/services/PlateService";
import { Heading } from '@/components/ui/heading';
import { Header } from "@/components/app/header";
import { Center } from '@/components/ui/center';
import { VStack } from '@/components/ui/vstack';
import { Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState } from "react";

export const RegisterEntryTime = ({ navigation }) => {

  const userId = getAuth().currentUser.uid;

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      userId: userId,
      plate: "",
      date: "",
      hours: ""
    }
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async ({ hours, date, ...data }) => {
    try {
      const [day, month, year] = date.split("/").map(Number);
      const [hour, minute] = hours.split(":").map(Number);
      const newDate = new Date(year, month-1, day, hour, minute);
      const parsedData = {
        date: Timestamp.fromDate(newDate),
        ...data
      }

      await addCarEntry(parsedData);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

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
          <VStack className="flex justify-center items-center m-2">
            <Heading size={"4xl"} className="text-center">Registrar entrada</Heading>
          </VStack>

          <FormControl className="bg-gray-50 p-5 border rounded-lg border-outline-300 w-[95%]">
            <VStack space="xl">

              <VStack space="xs">
                <Text className={`text-typography-500 ${errors.plate ? "text-red-500" : ""}`}>Placa do carro*</Text>
                <Controller
                  control={control}
                  name="plate"
                  rules={{
                    required: "É obrigatório inserir a placa do carro"
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input variant="rounded" size="xl" className={`text-center ${errors.plate ? "border-2" : ""}`} isInvalid={errors.plate}>
                      <InputIcon as={CarFront} className="m-3 -mr-1" color={errors.plate ? "red" : "currentColor"} />
                      <InputField
                        placeholder="ABC1234"
                        value={value}
                        onChangeText={onChange}
                      />
                    </Input>
                  )}
                />
                {errors.plate && <Text className="text-red-500 text-sm ml-5">{errors.plate.message}</Text>}
              </VStack>

              <VStack space="xs">
                <Text className={`text-typography-500 ${errors.date ? "text-red-500" : ""}`}>Data*</Text>
                <Controller
                  control={control}
                  name="date"
                  rules={{
                    minLength: { value: 10, message: "Data inadequada" }
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
          </FormControl>

          <Center>
            <Text className="text-typography-500 text-center">{}</Text>
          </Center>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
