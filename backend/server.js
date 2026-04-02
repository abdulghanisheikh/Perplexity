import { app } from "./src/app.js";
import "dotenv/config";
import { connectToDB } from "./src/configs/database.config.js";
import { initSocket } from "./src/sockets/server.socket.js";
import {createServer} from "http";

const httpServer = createServer(app);
initSocket(httpServer);

connectToDB();

httpServer.listen(process.env.PORT, () => {
    console.log(`Server on ${process.env.PORT}`);
});