import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { Clapperboard, House, Search, User } from "lucide-react-native";
import { View } from "react-native";

export default function _Layout() {
  const menu = [
    {
      id: "home",
      name: "index",
      title: "Trang Chủ",
      icon: <House color={"#fff"} />,
    },
    {
      id: "movie",
      name: "movie",
      title: "Phim",
      icon: <Clapperboard color={"#fff"} />,
    },

    {
      id: "search",
      name: "search",
      title: "Tìm kiếm",
      icon: <Search color={"#fff"} />,
    },
    {
      id: "profile",
      name: "profile",
      title: "Tôi",
      icon: <User color={"#fff"} />,
    },
  ];
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000",

          borderColor: "transparent",
        },
      }}
    >
      {menu.map((item) => (
        <Tabs.Screen
          key={item.id}
          name={item.name}
          options={{
            tabBarBackground: () => <Image />,
            tabBarIcon: (focused) => (
              <View
                className={`flex-1 items-center justify-center ${focused ? "text-blue-500" : "text-gray-500"}`}
              >
                {item.icon}
              </View>
            ),
            headerShown: false,
            title: item.title,
          }}
        />
      ))}
    </Tabs>
  );
}
