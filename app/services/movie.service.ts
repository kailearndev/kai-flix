import supabase from "../lib/supabase";
import { Movie } from "../types/movie";

interface GetMoviesParams {
  limit?: number; // số lượng muốn lấy
  orderBy?: keyof Movie; // field muốn sort
  ascending?: boolean; // true: tăng dần, false: giảm dần
  random?: boolean; // true: lấy random
}

/**
 * Lấy phim từ Supabase với params dynamic
 */
export async function getMovies(
  params: GetMoviesParams = {}
): Promise<Movie[]> {
  const {
    limit = 10,
    orderBy = "created_at",
    ascending = false,
    random = false,
  } = params;

  let query = supabase.from("movie").select("*");

  if (random) {
    query = query.order("RANDOM()");
  } else {
    query = query.order(orderBy, { ascending });
  }

  query = query.limit(limit);

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getTopMovies(
  params: GetMoviesParams = {}
): Promise<Movie[]> {
  const { data, error } = await supabase.from("movie").select("*").limit(10);

  if (error) throw error;
  return data;
}
