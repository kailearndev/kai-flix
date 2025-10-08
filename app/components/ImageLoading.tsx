import React, { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";

interface SkeletonImageProps {
  uri: string;
  width?: number;
  height?: number;
  radius?: number;
}

const SkeletonImage = ({
  uri,
  width = 220,
  height = 280,
  radius = 12,
}: SkeletonImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <View
      className="relative overflow-hidden bg-gray-300 items-center justify-center"
      style={{ width, height, borderRadius: radius }}
    >
      {/* Loading shimmer / spinner */}
      {!loaded && (
        <View className="absolute inset-0 items-center justify-center">
          <ActivityIndicator color="#999" size="small" />
        </View>
      )}

      {/* Actual image */}
      <Image
        source={{ uri }}
        className="absolute inset-0 w-full h-full"
        style={{
          borderRadius: radius,
          opacity: loaded ? 1 : 0,
        }}
        resizeMode="cover"
        onLoad={() => setLoaded(true)}
      />
    </View>
  );
};

export default SkeletonImage;
