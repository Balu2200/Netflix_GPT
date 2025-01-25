import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

const useTrailerVideo = (movieId) => {

  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS
      );

      if (!data.ok) {
        throw new Error("Failed to fetch movie videos");
      }

      const json = await data.json();
      const filterData = json.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filterData.length ? filterData[0] : json.results[0];

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
