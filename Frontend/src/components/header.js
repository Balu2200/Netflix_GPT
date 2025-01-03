import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="top-0 left-0 p-4 bg-black flex items-center">
            <div>
                <img
                    className="w-44 relative mt-2"
                    src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                    alt="Netflix Logo"
                />
            </div>
            <div className="flex items-center ml-auto">
                <ul className="p-6 flex space-x-3">
                    <li className="bg-red-500 cursor-pointer font-bold text-white p-2 rounded-xl hover:bg-red-700 transition">
                        Home
                    </li>
                    <li className="bg-red-500 cursor-pointer font-bold text-white p-2 rounded-xl hover:bg-red-700 transition">
                        Contact
                    </li>
                    <li className="bg-red-500 cursor-pointer font-bold text-white p-2 rounded-xl hover:bg-red-700 transition">
                        About
                    </li>
                    <li className="bg-red-500 cursor-pointer font-bold text-white p-2 rounded-xl hover:bg-red-700 transition">
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
