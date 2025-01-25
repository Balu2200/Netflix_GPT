import OpenAI from "openai";
import { OPENAI_KEY } from "./constants";

if (!OPENAI_KEY) {
  throw new Error("OPENAI_KEY is undefined. Ensure it is set properly.");
}

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true, 
});

export default openai;
