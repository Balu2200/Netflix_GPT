import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrendingMovies } from "../utils/movieSlice";
import { useSelector } from "react-redux";

const useTrendingMovies = () => {

    const trendingMovies = useSelector((store) => store.movies.trendingMovies);
    const dispatch = useDispatch();

    const getTrendingMovies = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/trending/all/day?page=1",
                API_OPTIONS
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const json = await response.json();
            dispatch(addTrendingMovies(json.results));
        } catch (error) {
            console.error("Failed to fetch trending movies:", error);
        }
    };

    useEffect(() => {
       !trendingMovies &&  getTrendingMovies();
    }, []);
};

export default useTrendingMovies;
