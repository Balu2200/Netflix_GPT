import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

// Custom hook to fetch and manage trailer video for a specific movie
const useTrailerVideo = (movieId) => {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Select trailerVideo from Redux store
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  // Function to fetch movie videos from TMDB API
  const getMovieVideos = async () => {
    try {
      // Make API request to TMDB for videos of the specified movie
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );

      // Check if the API response is not successful
      if (!data.ok) {
        throw new Error("Failed to fetch movie videos");
      }

      // Parse the response JSON
      const json = await data.json();

      // Filter videos to find trailers
      const filterData = json.results.filter(
        (video) => video.type === "Trailer"
      );

      // Select the first trailer if available, otherwise fallback to the first video
      const trailer = filterData.length ? filterData[0] : json.results[0];

      // Dispatch action to store the trailer in Redux
      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Error fetching trailer video:", error);
    }
  };

  useEffect(() => {
    if (!trailerVideo) {
      getMovieVideos();
    }
  }, []);
};

export default useTrailerVideo;
