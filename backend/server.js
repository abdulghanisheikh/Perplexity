import { app } from "./src/app.js";
import "dotenv/config";
import { connectToDB } from "./src/configs/database.config.js";

connectToDB();

app.listen(process.env.PORT, () => {
    console.log(`Server on ${process.env.PORT}`);
});