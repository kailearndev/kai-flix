import { Movie } from "@/app/types/movie";
import { Loader2 } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, ScrollView, View } from "react-native";
import SkeletonImage from "../ImageLoading";

interface MovieListProp {
  list: Movie[];
  isLoading: boolean;
}

const MovieListTop = ({ list, isLoading }: MovieListProp) => {
  // animation xoay
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ScrollView
      style={{ height: 200 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {isLoading && (
        <View className="flex-row">
          {[...Array(4)].map((_, i) => (
            <View
              key={i}
              className="bg-gray-300 items-center justify-center"
              style={{
                width: 200,
                height: 200,
                borderRadius: 12,
                marginRight: 10,
              }}
            >
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Loader2 size={32} color="#666" />
              </Animated.View>
            </View>
          ))}
        </View>
      )}
      {list.map((movie, i) => (
        <View
          className="relative rounded-lg"
          key={i}
          style={{
            width: 200,
            height: 200,
            marginRight: 10,
          }}
        >
          <SkeletonImage uri={movie.thumbnail} width={200} height={220} />
        </View>
      ))}
    </ScrollView>
  );
};

export default MovieListTop;
