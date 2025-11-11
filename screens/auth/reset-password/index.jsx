import { Input, InputField, InputIcon } from "@/components/ui/input";
import { resetPassword } from "@/services/UserFirebaseService";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Controller, useForm } from 'react-hook-form';
import { Heading } from '@/components/ui/heading';
import { MailIcon } from "@/components/ui/icon";
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Alert } from "react-native";
import { useState } from "react";

export const ResetPassword = ({ navigation }) => {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: ""
    }
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await resetPassword(data);
      Alert.alert("Sucesso", "Email de recuperação de senha enviado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.log("Erro ao resetar senha: ", error?.message);
      setErrorMessage(error?.message);
    }
  }

  return (
    <SafeAreaView className="h-screen w-screen flex justify-center items-center gap-3 bg-gray-500">
      <Heading size={"4xl"} className="text-white">Esqueci a senha</Heading>

      <FormControl className="bg-gray-50 p-5 border rounded-lg border-outline-300 w-[95%]">
        <VStack space={"xl"}>
          <VStack space="xs">
            <Text className={`text-typography-500 ${errors.email ? "text-red-500" : ""}`}>Email</Text>
            <Controller
              control={control}
              name="email"
              rules={{ required: "O email é obrigatório" }}
              render={({ field: { onChange, value } }) => (
                <Input variant="rounded" size="xl" className={`min-w-[250px] text-center ${errors.email ? "border-2" : ""}`} isInvalid={errors.email}>
                  <InputIcon as={MailIcon} className="m-3 -mr-1" color={errors.email ? "red" : "currentColor"} />
                  <InputField
                    placeholder="Fulano@gmail.com"
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
              )}
            />
            {errors.email && <Text className="text-red-500 text-sm ml-5">{errors.email.message}</Text>}
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
    </SafeAreaView>
  );
};
