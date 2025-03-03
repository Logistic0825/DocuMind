import React from 'react';
import Login from '../pages/Login';

import { createBrowserRouter } from 'react-router-dom';
import LayoutPage from '../pages/Layout';
import DocumentReader from '../pages/DocumentReader';

const router = createBrowserRouter([
    {
        path:'/',
        element:<LayoutPage />
    }, 
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/documentreader',
        element:<DocumentReader />
    }
])

export default router