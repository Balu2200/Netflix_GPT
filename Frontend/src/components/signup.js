import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Signup = () => {
    
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [redirect, setredirect] = useState(false);

    const handleSignup = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            name: formData.get("name"),  
            email: formData.get("email"),  
            password: formData.get("password"), 
        };

        axios
            .post("http://localhost:1234/signup", data)
            .then((response) => {
                console.log("Signup successful:", response.data);
                setSuccessMessage("Signup successful! You can now log in.");
                alert("User created u can login");
                setredirect(true);
                setErrorMessage(""); 
            })
            .catch((error) => {
                console.error("Signup error:", error.response?.data || error.message);
                setErrorMessage(
                    error.response?.data?.message || "There was an error signing up!"
                );
                setSuccessMessage(""); 
            });
    };
    if(redirect){
        return <Navigate to='/login'/>;
    }

    return (
        <div className="relative bg-slate-700 min-h-screen flex items-center justify-center">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs')`,
                    filter: "brightness(0.5)",
                }}
            ></div>

            <div className="bg-black bg-opacity-50 relative z-10 p-12 rounded-lg w-full max-w-sm mb-7">
                <h2 className="text-white text-2xl mb-6 font-bold text-center">Signup</h2>

                {errorMessage && (
                    <div className="text-red-500 text-center mb-4">{errorMessage}</div>
                )}
                {successMessage && (
                    <div className="text-green-500 text-center mb-4">{successMessage}</div>
                )}

                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-100"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-100"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-red-600 p-2 w-full rounded-xl text-black font-bold hover:bg-red-400 transition duration-300"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
