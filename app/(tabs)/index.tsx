import { useQuery } from "@tanstack/react-query";
import { RefreshControl, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieListTop from "../components/movie/MovieListTop";
import MovieTabs from "../components/movie/MovieTabs";
import SearchBar from "../components/SearchBar";
import { getTopMovies } from "../services/movie.service";

export default function Home() {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getTopMovies(),
    queryKey: ["list-movie-top-10"],
  });

  return (
    <SafeAreaView className="flex-1 bg-black px-4 gap-4">
      <Text className="text-white text-2xl mb-4">Bạn muốn xem gì hôm nay?</Text>
      <SearchBar placeholder="Thần bài tinh gia" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        contentContainerStyle={{ flexDirection: "column", gap: 16 }}
      >
        <MovieListTop isLoading={isLoading} list={data || []} />
        <MovieTabs />
      </ScrollView>
    </SafeAreaView>
  );
}
