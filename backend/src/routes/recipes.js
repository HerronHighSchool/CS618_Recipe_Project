import {
  listAllRecipes,
  listRecipesByAuthor,
  listRecipesByTag, 
  getRecipeById,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  updateRecipeLikes,  // Add this
} from "../services/recipes.js";
import { requireAuth } from "../middleware/jwt.js";

export function recipeRoutes(app) {
  app.get("/recipes", async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query;
    const options = { sortBy, sortOrder };
    try {
      if (author && tag) {
        return res
          .status(400)
          .json({ error: "query by either author or tag, not both" });
      } else if (author) {
        return res.json(await listRecipesByAuthor(author, options));
      } else if (tag) {
        return res.json(await listRecipesByTag(tag, options));
      } else {
        return res.json(await listAllRecipes(options));
      }
    } catch (err) {
      console.error("error listing posts", err);
      return res.status(500).end();
    }
  });

  app.get("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const post = await getRecipeById(id);
      if (post === null) return res.status(404).end();
      return res.json(post);
    } catch (err) {
      console.error("error getting post", err);
      return res.status(500).end();
    }
  });

  app.post("/recipes", requireAuth, async (req, res) => {
    try {
      const post = await createRecipe(req.auth.sub, req.body);
      return res.json(post);
    } catch (err) {
      console.error("error creating post", err);
      return res.status(500).end();
    }
  });

  app.patch("/recipes/:id", requireAuth, async (req, res) => {
    try {
      const post = await updateRecipe(req.auth.sub, req.params.id, req.body);
      return res.json(post);
    } catch (err) {
      console.error("error updating post", err);
      return res.status(500).end();
    }
  });

  app.delete("/recipes/:id", requireAuth, async (req, res) => {
    try {
      const { deletedCount } = await deleteRecipe(req.auth.sub, req.params.id);
      if (deletedCount === 0) return res.sendStatus(404);
      return res.status(204).end();
    } catch (err) {
      console.error("error deleting post", err);
      return res.status(500).end();
    }
  });

  app.patch("/recipes/:id/likes", requireAuth, async (req, res) => {
    try {
      const post = await updateRecipeLikes(req.params.id, req.body.likes);
      if (!post) return res.status(404).end();
      return res.json(post);
    } catch (err) {
      console.error("error updating likes", err);
      return res.status(500).end();
    }
  });

}
