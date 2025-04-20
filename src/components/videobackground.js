import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useTrailerVideo";

// Component to display a movieTrailer as a background video
const VideoBackground = ({ movieId }) => {
  // Select trailerVideo from Redux store
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  // Fetch trailer video using custom hook with the provided movieId
  useTrailerVideo(movieId);

  return (
    // Container div for the video, set to full screen width
    <div className="w-screen">
      {/* Embed YouTube iframe for the trailer video */}
      <iframe
        // Set iframe to full screen width with proper aspect ratio
        className="w-screen aspect-video"
        // Construct YouTube embed URL with trailer key, enable autoplay and mute
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
        }
        // Set title for accessibility
        title="YouTube video player"
        // Allow specific features for the iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
