import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

// Component to render the header with logo, user controls, and navigation
const Header = () => {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Initialize navigate function for routing
  const navigate = useNavigate();

  // Select user data from Redux store
  const user = useSelector((store) => store.user);

  // Select GPT search view state from Redux store
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  // Function to handle user sign-out
  const handleSignOut = () => {
    // Sign out from Firebase authentication
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // Navigate to error page if sign-out fails
        navigate("/error");
      });
  };

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is authenticated, extract user details
        const { uid, email, displayName, photoURL } = user;
        // Dispatch action to add user to Redux store
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // Navigate to browse page
        navigate("/browse");
      } else {
        // If no user, remove user from Redux store
        dispatch(removeUser());
        // Navigate to home page
        navigate("/");
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Function to toggle GPT search view
  const handleGptSearchClick = () => {
    // Dispatch action to toggle GPT search visibility
    dispatch(toggleGptSearchView());
  };

  // Function to handle language selection change
  const handleLanguageChange = (e) => {
    // Dispatch action to update selected language in Redux store
    dispatch(changeLanguage(e.target.value));
  };

  return (
    // Header container with gradient background and responsive layout
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      {/* Render logo image */}
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {/* Render user controls if user is authenticated */}
      {user && (
        // Container for user controls with flex layout
        <div className="flex p-2 justify-between">
          {/* Render language selector when GPT search is active */}
          {showGPTSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          {/* Button to toggle between GPT search and homepage */}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGPTSearch ? "Homepage" : "GPT Search"}
          </button>
          {/* Render user avatar for medium and larger screens */}
          <img
            className="hidden md:block w-12 h-12"
            alt="usericon"
            src={USER_AVATAR}
          />
          {/* Sign-out button */}
          <button onClick={handleSignOut} className="font-bold text-white ">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
