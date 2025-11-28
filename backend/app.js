import dotenv from "dotenv";
import express from "express";
import { userRoutes } from "./src/routes/users.js";
import { recipeRoutes } from "./src/routes/recipes.js";
import { initDB } from "./src/db/initdb.js";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { handleSocket } from "./socket.js";

dotenv.config();


const app = express();
//modified cors function to allow for use of frontend specific db
app.use(cors());
app.use(bodyParser.json());


//accept requests from different origins
//cors = cross origin resource sharing
//cors is for security reasons, browsers block requests from different origins by default

app.get("/", (req, res) => {
  res.send("Hello World!");
});

await initDB();
recipeRoutes(app);
userRoutes(app);

//edit the following to include socket.io and create a server that is an app, broadcasting server as app. 
//import server
//create server using cors
//handle socket connections
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Your Vite dev server URL
        methods: ["GET", "POST"],
        credentials: true
    }
});
handleSocket(io);

export { server as app };