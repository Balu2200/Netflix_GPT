import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";

// Custom hook to fetch and manage upcoming movies
const useUpcomingMovies = () => {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Select upcomingMovies from Redux store
  const upcomingMovies = useSelector((state) => state.movies.upcomingMovies);

  // Function to fetch upcoming movies from TMDB API
  const getUpcomingMovies = async () => {
    try {
      // Make API request to TMDB for upcoming movies (page 1)
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        API_OPTIONS
      );

      // Check if the API response is not successful
      if (!data.ok) {
        throw new Error("Failed to fetch upcoming movies");
      }

      // Parse the response JSON
      const json = await data.json();

      // Dispatch action to store fetched movies in Redux
      dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };

  useEffect(() => {
    // Fetch upcoming movies only if not already populated
    if (!upcomingMovies) {
      getUpcomingMovies();
    }
  }, []);
};

export default useUpcomingMovies;
