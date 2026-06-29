
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter([
  {
    path:'/',
    element: <ProtectedRoute><Home /></ProtectedRoute>
  },

  {
    path: "/profile/:id",
    element: (
      <ProtectedRoute>
        <Profile/>
      </ProtectedRoute>
    ),
  },

  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  }
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
