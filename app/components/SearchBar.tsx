import { Search } from "lucide-react-native";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  onPress?: () => void;
  placeholder?: string;
}

export default function SearchBar({ onPress, placeholder }: SearchBarProps) {
  return (
    <View className="flex-row items-center w-full ">
      <View className="flex-row items-center bg-gray-800 rounded-full px-4 h-10 flex-1">
        <TextInput
          onPress={onPress}
          className="flex-1 text-white"
          placeholder={placeholder || "Thần bài tinh gia"}
          placeholderTextColor="#aaa"
        />
        <Search color="#fff" size={18} />
      </View>
    </View>
  );
}
