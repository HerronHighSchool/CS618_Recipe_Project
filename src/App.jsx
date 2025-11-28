import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {RecipeHome} from './pages/RecipeHome.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import socket from './socket.js'
import { useEffect } from 'react'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <RecipeHome />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export function App() {
useEffect(() => {
        // Check connection status
        console.log("Socket connected:", socket.connected);
        console.log("Socket ID:", socket.id || "not connected yet");
    }, []);
  
    return (
        <QueryClientProvider client={queryClient}>  
        <AuthContextProvider>
        <RouterProvider router={router} />
        </AuthContextProvider>
        </QueryClientProvider>
    )
}   