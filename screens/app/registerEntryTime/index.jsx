import { addParkingCost, getParkingCost } from "@/services/ParkingService";
import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { MaskedTextInput } from "react-native-mask-text";
import { Input, InputIcon } from "@/components/ui/input";
import { Controller, useForm } from 'react-hook-form';
import { Heading } from '@/components/ui/heading';
import { DollarSign } from 'lucide-react-native';
import { Header } from "@/components/app/header";
import { Center } from '@/components/ui/center';
import { VStack } from '@/components/ui/vstack';
import { getAuth } from "firebase/auth";
import { useState } from "react";

export const RegisterEntryTime = ({ navigation }) => {

  const userId = getAuth().currentUser.uid;

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: userId,
      parkingCost: ""
    }
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await addParkingCost(data);
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
            <Heading size={"4xl"} className="text-center">Registrar custo de estacionamento</Heading>
          </VStack>

          <FormControl className="bg-gray-50 p-5 border rounded-lg border-outline-300 w-[95%]">
            <VStack space="xl">

              <VStack space="xs">
                <Text className={`text-typography-500 ${errors.parkingCost ? "text-red-500" : ""}`}>Custo de estacionamento por minuto*</Text>
                <Controller
                  control={control}
                  name="parkingCost"
                  render={({ field: { onChange, value } }) => (
                    <Input variant="rounded" size="xl" className={`text-center ${errors.parkingCost ? "border-2" : ""}`} isInvalid={errors.parkingCost}>
                      <InputIcon as={DollarSign} className="m-3 -mr-1" color={errors.parkingCost ? "red" : "currentColor"} />
                      <MaskedTextInput
                        style={{ flex: 1, paddingHorizontal: 14 }}
                        mask="R$9,99"
                        type="text"
                        placeholder="R$0,00"
                        keyboardType="numeric"
                        value={value}
                        onChangeText={onChange}
                      />
                    </Input>
                  )}
                />
                {errors.parkingCost && <Text className="text-red-500 text-sm ml-5">{errors.parkingCost.message}</Text>}
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
