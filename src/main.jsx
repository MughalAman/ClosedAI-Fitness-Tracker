import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Profile from './routes/profile.jsx'
import PlanBuilder from './components/planBuilder.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/planbuilder",
    element: <PlanBuilder />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
