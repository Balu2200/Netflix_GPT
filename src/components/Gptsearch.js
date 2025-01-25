import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptmovieSuggestions";
import GptSearchBar from "./Gptsearchbar";

const GPTSearch = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <img className="w-full h-full object-cover" src={BG_URL} alt="logo" />
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};
export default GPTSearch;
