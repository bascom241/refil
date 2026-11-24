import "dotenv/config";
import app from "./app.js";
import { connectToDB } from "../config/db.js";

const port = process.env.PORT || 3000

await connectToDB()
app.listen(port, () => {
    console.log(`Refill Server started, Listening at port ${port}`)
})

