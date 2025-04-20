import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

// Custom hook to fetch and manage popular movies
const usePopularMovies = () => {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Select popularMovies from Redux store
  const popularMovies = useSelector((state) => state.movies.popularMovies);

  // Function to fetch popular movies from TMDB API
  const getPopularMovies = async () => {
    try {
      // Make API request to TMDB for popular movies (page 1)
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        API_OPTIONS
      );

      // Check if the API response is not successful
      if (!data.ok) {
        throw new Error("Failed to fetch popular movies");
      }

      // Parse the response JSON
      const json = await data.json();

      // Dispatch action to store fetched movies in Redux
      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  useEffect(() => {
    if (!popularMovies) {
      getPopularMovies();
    }
  }, []);
};

export default usePopularMovies;
