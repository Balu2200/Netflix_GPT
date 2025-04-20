import { useSelector } from "react-redux";
import VideoBackground from "./videobackground";
import VideoTitle from "./videotitle";

// Component to render the main movie section with title and background trailer
const MainContainer = () => {
  // Select nowPlayingMovies from Redux store
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  // Return null if movies are not yet loaded to prevent rendering
  if (!movies) return;

  // Select the first movie from the nowPlayingMovies list
  const mainMovie = movies[0];

  // Destructure relevant movie details
  const { original_title, overview, id } = mainMovie;

  return (
    // Container div with responsive padding and black background
    <div className="pt-[30%] bg-black md:pt-0">
      // Render movie title and overview
      <VideoTitle title={original_title} overview={overview} />
      // Render background trailer video using movie ID
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
