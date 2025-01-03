import React from 'react';
import Login from './login';
import Browse from './browse';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Signup from './signup';

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        },
        {
            path: "/signup",
            element: <Signup />
        }
    ]);
    
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
};

export default Body;
