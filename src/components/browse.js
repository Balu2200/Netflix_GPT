import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import MainContainer from "./mainContainer";
import SecondaryContainer from "./secondaryContainer";
import GPTSearch from "./Gptsearch";
import { useSelector } from "react-redux";

// Component to render the main browse page
const Browse = () => {
  // Select GPT search view state from Redux store
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  // Fetch movie data using custom hooks
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpcomingMovies();

  return (
    // Main container for the browse page
    <div>
      {/* Render the header component */}
      <Header />
      {/* Conditionally render GPT search or main/secondary containers */}
      {showGPTSearch ? (
        // Render GPT search component if toggled
        <GPTSearch />
      ) : (
        <>
          {/* Render main movie container */}
          <MainContainer />
          {/* Render secondary movie list container */}
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
