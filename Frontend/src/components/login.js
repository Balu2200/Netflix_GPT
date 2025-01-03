import axios from "axios";
import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";


const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    const email = useRef(null);
    const password = useRef(null);

    const handleLogin = async () => {
        
        const data = {email:email.current.value, password:password.current.value};

        try {
            const response = await axios.post("http://localhost:1234/login", data);
            console.log("Login successful:", response.data);
            setSuccessMessage("Login successful!");
            alert("Login successful");
            setErrorMessage("");
            setRedirect(true);
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            setErrorMessage(
                error.response?.data?.message||"Details or not valid "
            );
            setSuccessMessage("");
        }
    };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-slate-400 min-h-screen flex items-center justify-center relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs')`,
          filter: "brightness(0.5)",
        }}
      ></div>

      <div className="relative z-10 bg-black bg-opacity-60 p-12 rounded-lg w-full max-w-sm mb-14">
        <h2 className="text-white text-2xl mb-6 font-bold text-center">
          Sign In
        </h2>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 text-center mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <input
              ref={email}
              type="text"
              name="email"
              placeholder="Email or phone number"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <input
              ref={password}
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-red-600 text-white p-3 rounded font-bold hover:bg-red-700 transition duration-300"
          >
            Sign In
          </button>
          <div className="mt-4 flex justify-between text-gray-400 text-sm">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <button className="underline hover:text-white">
              Forgot Password?
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-gray-400 text-sm">
          <span>New to NetflixGPT? </span>
          <Link
            className="text-red-600 font-bold hover:bg-blue-400 transition duration-300 underline"
            to="/signup"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
