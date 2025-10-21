import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "@/components/ui/icon";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { login } from "@/services/UserFirebaseService";
import { Controller, useForm } from 'react-hook-form';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useState } from "react";

export const Login = ({ navigation }) => {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      senha: ""
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
    console.log("Submitted Info: ", data);
  };

  return (
    <SafeAreaView className="bg-green-200 flex-1">
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
      >
        <View className="bg-green-200 flex-1 flex justify-center items-center gap-2 p-5">
          <VStack className="flex justify-center items-center m-2">
            <Heading size={"4xl"}>Login</Heading>
          </VStack>

          <FormControl className="bg-gray-50 p-5 border rounded-lg border-outline-300 w-[95%]">
            <VStack space="xl">

              <VStack space="xs">
                <Text className={`text-typography-500 ${errors.email ? "text-red-500" : ""}`}>Email*</Text>
                <Controller
                  control={control}
                  name="email"
                  rules={{required: "O email é obrigatório"}}
                  render={({ field: { onChange, value } }) => (
                  <Input variant="rounded" size="xl" className={`min-w-[250px] text-center ${errors.email ? "border-2" : ""}`} isInvalid={errors.email}>
                    <InputIcon as={MailIcon} className="m-3 -mr-1" color={errors.email ? "red" : "currentColor"} />
                    <InputField
                      placeholder="fulano@gmail.com"
                      value={value}
                      onChangeText={onChange}
                    />
                  </Input>
                )}
                />
                {errors.email && <Text className="text-red-500 text-sm ml-5">{errors.email.message}</Text>}
              </VStack>

              <VStack space="xs">
                <Text className={`text-typography-500 ${errors.senha ? "text-red-500" : ""}`}>Senha*</Text>
                <Controller 
                  control={control}
                  name="senha"
                  rules={{required: "A senha é obrigatória"}}
                  render={({ field: { onChange, value } }) => (
                  <Input variant="rounded" size="xl" className={`text-center ${errors.senha ? "border-2" : ""}`} isInvalid={errors.senha}>
                    <InputIcon as={LockIcon} className="m-3 -mr-1" color={errors.senha ? "red" : "currentColor"} />
                    <InputField 
                      type={showPassword ? "text" : "password"}
                      placeholder="Senha"
                      value={value}
                      onChangeText={onChange}
                    />
                    <InputSlot className="pr-3" onPress={() => {setShowPassword(!showPassword)}}>
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  </Input>
                )}
                />
                {errors.senha && <Text className="text-red-500 text-sm ml-5">{errors.senha.message}</Text>}
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
                
              <Button
                className="self-end -mt-5" 
                variant={"link"}
                size={"sm"}
                onPress={() => {console.log(navigation.push("reset-password"))}}
              >
                <ButtonText className="text-blue-500 underline">Esqueci a senha</ButtonText>
              </Button>
            </VStack>
          </FormControl>    
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};