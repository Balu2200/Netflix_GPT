import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants"; 
import { useDispatch, useSelector } from "react-redux"; 
import { addNowPlayingMovies } from "../utils/movieSlice"; 

// Custom hook to fetch and manage now playing movies
const useNowPlayingMovies = () => {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Select nowPlayingMovies from Redux store
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  // Function to fetch now playing movies from TMDB API
  const getNowPlayingMovies = async () => {
    try {
      // Make API request to TMDB for now playing movies (page 1)
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );

      // Check if the API response is not successful
      if (!data.ok) {
        throw new Error("Failed to fetch now playing movies");
      }

      // Parse the response JSON
      const json = await data.json();

      // Dispatch action to store fetched movies in Redux
      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      // Log any errors encountered during the fetch
      console.error("Error fetching now playing movies:", error);
    }
  };

  // useEffect to trigger movie fetch on component mount
  useEffect(() => {
    // Only fetch movies if nowPlayingMovies is not already populated
    if (!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, []); // Empty dependency array ensures this runs only once on mount
};

// Export the custom hook for use in components
export default useNowPlayingMovies;
