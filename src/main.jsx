import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Profile from './routes/profile.jsx';
import FriendProfile from './components/friendProfile.jsx';
import PlanBuilder from './components/planBuilder.jsx';
import TrainingGoal from './components/TrainingGoal.jsx';
import TrainingDays from './components/TrainingDays.jsx';
import TrainingExperience from './components/TrainingExperience.jsx';

import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**
 * Create a browser router with specified routes.
 * @type {Object}
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/friendprofile/:id',
    element: <FriendProfile />,
  },
  {
    path: '/planbuilder',
    element: <PlanBuilder />,
  },
  {
    path: '/traininggoal',
    element: <TrainingGoal />,
  },
  {
    path: '/trainingdays',
    element: <TrainingDays />,
  },
  {
    path: '/trainingexperience',
    element: <TrainingExperience />,
  },
]);

/**
 * Render the React app into the root element.
 * @param {JSX.Element} element - React element to render.
 * @returns {void}
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
);

