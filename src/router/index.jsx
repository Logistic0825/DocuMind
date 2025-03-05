import React from 'react';
import Login from '../pages/Login';

import { createBrowserRouter } from 'react-router-dom';
import LayoutPage from '../pages/Layout';
import DocumentReader from '../pages/DocumentReader';
import ChatRobot from '../pages/ChatRobot';
import NotFoundPage from '@/pages/NotFoundPage';
import ChatMsgExtract from '@/pages/LikeAnalyzer/ChatMsgExtract';
import SentimentAnalysis from '@/pages/LikeAnalyzer/SentimentAnalysis';

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
    },
    {
        path:'/chatrobot',
        element:<ChatRobot/>
    },
    {
        path:'*',
        element:<NotFoundPage/>
    },
    {
        path:'/likeanalyzer/chatmsgextract',
        element:<ChatMsgExtract/>
    },
    {
        path:'/likeanalyzer/analysis',
        element:<SentimentAnalysis/>
    }
])

export default router