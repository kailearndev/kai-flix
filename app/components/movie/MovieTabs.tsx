import { getMovies } from "@/app/services/movie.service";
import { Movie } from "@/app/types/movie";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SkeletonImage from "../ImageLoading";

interface GetMoviesParams {
  limit?: number; // số lượng muốn lấy
  orderBy?: keyof Movie; // field muốn sort
  ascending?: boolean; // true: tăng dần, false: giảm dần
  random?: boolean; // true: lấy random
}

const MovieTabs = () => {
  const [filter, setFilter] = useState<GetMoviesParams>({});
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getMovies(filter),
    queryKey: ["list-movie", filter],
  });
  const [activeTab, setActiveTab] = useState("1");
  const tabs = [
    { id: "1", title: "Mới nhất" },
    { id: "2", title: "Xem nhiều" },
    { id: "3", title: "Đánh giá" },
  ];

  // Dùng shared value để animate underline hoặc scale
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // mỗi lần đổi tab => animate nhẹ
    scale.value = withTiming(1.05, { duration: 150 });
    opacity.value = withTiming(0.8, { duration: 150 });

    const timeout = setTimeout(() => {
      scale.value = withTiming(1, { duration: 150 });
      opacity.value = withTiming(1, { duration: 150 });
    }, 150);

    return () => clearTimeout(timeout);
  }, [activeTab]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleSelectTabs = (id: string) => {
    setActiveTab(id);
    setFilter({
      ...filter,
      ascending: id === "1" ? true : false,
      orderBy: id === "2" ? "created_at" : "rate",
    });
  };
  return (
    <View>
      {/* Tabs */}
      <View className="flex-row justify-between rounded-full p-1 bg-gray-900">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => handleSelectTabs(tab.id)}
              className={`flex-1 py-2 rounded-full ${
                isActive ? "bg-white" : "bg-transparent"
              }`}
            >
              <Animated.Text
                style={isActive ? animatedStyle : undefined}
                className={`text-center capitalize ${
                  isActive ? "text-black font-semibold" : "text-white"
                }`}
              >
                {tab.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Nội dung tab */}
      <View className="mt-6">
        <Text className="text-white">
          <ScrollView
            style={{ height: 420 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {data?.map((movie, i) => (
              <View className="relative rounded-lg mr-4" key={i}>
                <SkeletonImage uri={movie.thumbnail} width={220} height={420} />
              </View>
            ))}
          </ScrollView>
        </Text>
      </View>
    </View>
  );
};

export default MovieTabs;
