import MovieCard from "./movieCart";

// Component to render a list of movies with a title
const MovieList = ({ title, movies }) => {
  return (
    // Container for the movie list with padding
    <div className="px-6 ">
      {/* Render the list title with responsive font size */}
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      {/* Scrollable container for movie cards */}
      <div className="flex overflow-x-scroll">
        {/* Flex container for movie cards */}
        <div className="flex">
          {/* Map through movies array to render MovieCard components */}
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
