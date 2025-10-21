import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { signUp } from "@/services/UserFirebaseService";
import { Controller, useForm } from 'react-hook-form';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useState } from "react";

export const SignUp = () => {

  const { control, getValues, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: ""
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async ({confirmarSenha, ...data}) => {
    console.log("Submitted Info: ", data);
    try {
      await signUp(data);
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
        <View className="bg-yellow-200 flex-1 flex justify-center items-center gap-2 p-5">
          <VStack className="flex justify-center items-center m-2">
            <Heading size={"4xl"}>Cadastro</Heading>
          </VStack>

          <FormControl className="bg-gray-50 p-5 border rounded-lg border-outline-300 w-[95%]">
            <VStack space="xl">

              <VStack space="xs">
                <Text className={`text-typography-500 ${errors.email ? "text-red-500" : ""}`}>Email*</Text>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "O email é obrigatório",
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                      message: "E-mail inválido"
                    }
                  }}
                  render={({ field: { onChange, value } }) => (
                  <Input variant="rounded" size="xl" className={`min-w-[250px] text-center ${errors.email ? "border-2" : ""}`} isInvalid={errors.email}>
                    <InputIcon as={MailIcon} className="m-3 -mr-1" color={errors.email ? "red" : "currentColor"} />
                    <InputField
                      placeholder="fulano@gmail.com"
                      keyboardType="email-adress" 
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
                  rules={{
                    required: "A senha é obrigatória",
                    minLength: {
                      value: 8,
                      message: "A senha deve ter no mínimo 8 caracteres"
                    }
                  }}
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

              <VStack space="xs">
                <Text className={`text-typography-500 ${errors.confirmarSenha ? "text-red-500" : ""}`}>Confirme a senha*</Text>
                <Controller
                  control={control}
                  name="confirmarSenha"
                  rules={{
                    required: "A confirmação da senha é obrigatória",
                    validate: (value) => 
                      value === getValues("senha") || "As senhas não coincidem"
                  }}
                  render={({ field: { onChange, value }}) => (
                  <Input variant="rounded" size="xl" className={`text-center ${errors.confirmarSenha ? "border-2" : ""}`} isInvalid={errors.confirmarSenha}>
                    <InputIcon as={LockIcon} className="m-3 -mr-1" color={errors.confirmarSenha ? "red" : "currentColor"} />
                    <InputField 
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repetir senha"
                      value={value}
                      onChangeText={onChange}
                    />
                    <InputSlot className="pr-3" onPress={() => {setShowConfirmPassword(!showConfirmPassword)}}>
                      <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  </Input>
                )}
                />
                {errors.confirmarSenha && <Text className="text-red-500 text-sm ml-5">{errors.confirmarSenha.message}</Text>}
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};