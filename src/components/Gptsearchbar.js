import openai from "../utils/openAi";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageconstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie.trim()
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (err) {
      console.error(`Error fetching TMDB data for ${movie}:`, err);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current?.value.trim();
    if (!query) {
      setError("Please enter a movie query.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const gptQuery =
        `Act as a Movie Recommendation system and suggest some movies for the query: "${query}". ` +
        `Only give names of 5 movies, comma separated. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const gptMovies = gptResults.choices?.[0]?.message?.content
        ?.split(",")
        .map((movie) => movie.trim())
        .filter((movie) => movie);
      if (!gptMovies || gptMovies.length === 0) {
        throw new Error("No valid movies returned from GPT.");
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.allSettled(promiseArray);

      const successfulResults = tmdbResults
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

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
      setLoading(false);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-[500px] bg-black flex flex-col items-center p-6 rounded-xl shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-3 mb-4 w-full bg-gray-800 text-white rounded-md border-2 border-gray-700 focus:outline-none focus:border-red-700"
          placeholder={
            lang[langKey]?.gptSearchPlaceholder || "Enter a movie name"
          }
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
