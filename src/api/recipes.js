export const getRecipes = async (queryParams) => {
    const res = await fetch( 
        `${import.meta.env.VITE_BACKEND_URL}/recipes?` + 
        new URLSearchParams(queryParams)
    )
    return await res.json()
}
export const createRecipe = async (token, recipe) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipe),
  })
  return await res.json()
}

export const updateRecipe = async (token, recipeId, recipeData) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/${recipeId}`, {
    method: 'PATCH', // or 'PATCH' if your backend uses that
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  })
  console.log("API Call Sent")
  if (!res.ok) {
    throw new Error('Failed to update recipe')
  }
  
  return await res.json()
}

export const updateRecipeLikes = async (token, recipeId, likes) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/${recipeId}/likes`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ likes }),
  })
  
  if (!res.ok) {
    throw new Error('Failed to update likes')
  }
  
  return await res.json()
}