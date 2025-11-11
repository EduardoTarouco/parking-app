import { Heading } from "@/components/ui/heading";
import { View } from "react-native";

export const Header = ({ title = "Parking App" }) => {

  return (
    <View className="p-6 w-full justify-center items-center bg-gray-900">
      <Heading className="text-3xl font-bold text-white">{title}</Heading>
    </View>
  );
}