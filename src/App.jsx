import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {RecipeHome} from './pages/RecipeHome.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import socket from './socket.js'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { NewRecipeNotification } from './components/NewRecipeNotification.jsx'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from './contexts/AuthContext.jsx'
import { ViewRecipe } from './pages/ViewRecipe.jsx'
import { getRecipeById} from './api/recipes.js'

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
  {
    path: '/recipes/:recipeID',
    loader: async ({ params }) => { 
      const recipeId = params.recipeID
      const queryClient = new QueryClient()
      const recipe = await getRecipeById(recipeId)
      await queryClient.prefetchQuery({
        queryKey: ['recipe', recipeId],
        queryFn: () => recipe,
      })
    if (recipe?.author) { 
      await queryClient.prefetchQuery({ 
         queryKey: ['users', recipe.author], 
        queryFn: () => 
          getUserInfo(recipe.author), 
      }) 
    }      
     return { dehydratedState: dehydrate(queryClient), recipeId } },
    Component() { 
      const { dehydratedState, recipeId } = useLoaderData() 
    return (  
       <HydrationBoundary state={dehydratedState}> 
    <ViewRecipe recipeId={recipeId} /> 
    </HydrationBoundary> 
    ) 
  },   
  },
])

export function App() {
  useEffect(() => {
    // Check connection status
    console.log("Socket connected:", socket.connected);
    console.log("Socket ID:", socket.id || "not connected yet");
    
    // Listen for new recipe events
    socket.on('new-recipe', (data) => {
        console.log('New recipe created:', data, data.userID);

        const notify = () => {
            NewRecipeNotification({
                author: "" + data.userID,
                title: "" + data.title,
            }); };
        notify();
      /*  const [token, setToken] = useAuth();
        const user = jwtDecode(token); 

        console.log("Current login id ", user);
        if(user && data.userID != user){
         notify();
         console.log("Notification sent. not from current user");
        }else{
          console.log("Not posted because user is current");
        }*/
    });

    // Cleanup: remove listener when component unmounts
    return () => {
        socket.off('new-recipe');
    };
}, []);

    return (
        <QueryClientProvider client={queryClient}>  
        <AuthContextProvider>
        <ToastContainer />
        <RouterProvider router={router} />
        </AuthContextProvider>
        </QueryClientProvider>
    )
}
