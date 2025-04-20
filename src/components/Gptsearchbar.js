import openai from "../utils/openAi";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageconstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

// Component to render the GPT-powered movie search bar
const GptSearchBar = () => {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Select current language from Redux store
  const langKey = useSelector((store) => store.config.lang);

  // Reference for the search input field
  const searchText = useRef(null);

  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // State to manage error messages
  const [error, setError] = useState("");

  // Function to search for a movie in TMDB API
  const searchMovieTMDB = async (movie) => {
    try {
      // Fetch movie data from TMDB using the movie name
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie.trim()
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      // Parse the response JSON
      const json = await data.json();
      return json.results;
    } catch (err) {
      console.error(`Error fetching TMDB data for ${movie}:`, err);
      return [];
    }
  };

  // Function to handle GPT search on button click
  const handleGptSearchClick = async () => {
    // Get and trim the search query from input
    const query = searchText.current?.value.trim();
    // Validate query presence
    if (!query) {
      setError("Please enter a movie query.");
      return;
    }
    // Clear any previous error
    setError("");
    // Set loading state to true
    setLoading(true);

    try {
      // Construct GPT query for movie recommendations
      const gptQuery =
        `Act as a Movie Recommendation system and suggest some movies for the query: "${query}". ` +
        `Only give names of 5 movies, comma separated. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

      // Request movie suggestions from OpenAI API
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      // Extract and process movie names from GPT response
      const gptMovies = gptResults.choices?.[0]?.message?.content
        ?.split(",")
        .map((movie) => movie.trim())
        .filter((movie) => movie);
      // Validate GPT response
      if (!gptMovies || gptMovies.length === 0) {
        throw new Error("No valid movies returned from GPT.");
      }

      // Create array of promises for TMDB searches
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      // Execute all TMDB searches concurrently
      const tmdbResults = await Promise.allSettled(promiseArray);

      // Filter successful TMDB results
      const successfulResults = tmdbResults
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      // Dispatch action to store GPT movie names and TMDB results in Redux
      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: successfulResults,
        })
      );
    } catch (err) {
      console.error("Error during GPT search:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    // Container for the search form, centered on the page
    <div className="pt-[10%] flex justify-center">
      {/* Form to handle search input and submission */}
      <form
        className="w-[500px] bg-black flex flex-col items-center p-6 rounded-xl shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Search input field */}
        <input
          ref={searchText}
          type="text"
          className="p-3 mb-4 w-full bg-gray-800 text-white rounded-md border-2 border-gray-700 focus:outline-none focus:border-red-700"
          placeholder={
            lang[langKey]?.gptSearchPlaceholder || "Enter a movie name"
          }
        />
        {/* Display error message if present */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {/* Search button with loading state */}
        <button
          className="w-full py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading
            ? lang[langKey]?.loading || "Loading..."
            : lang[langKey]?.search || "Search"}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
