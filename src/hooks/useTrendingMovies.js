import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrendingMovies } from "../utils/movieSlice";
import { useSelector } from "react-redux";

// Custom hook to fetch and manage trending movies
const useTrendingMovies = () => {
  // Select trendingMovies from Redux store
  const trendingMovies = useSelector((store) => store.movies.trendingMovies);

  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Function to fetch trending movies from TMDB API
  const getTrendingMovies = async () => {
    try {
      // Make API request to TMDB for daily trending movies (page 1)
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?page=1",
        API_OPTIONS
      );

      // Check if the API response is not successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the response JSON
      const json = await response.json();

      // Dispatch action to store fetched movies in Redux
      dispatch(addTrendingMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
    }
  };

  useEffect(() => {
    // Fetch trending movies only if not already populated
    !trendingMovies && getTrendingMovies();
  }, []);
};

export default useTrendingMovies;
