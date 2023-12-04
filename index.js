import express from "express";
import { PORT ,mongodbUrl} from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";




const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("welcome to the Book Library");
})

app.use("/books", booksRoute)

// database connection with books in Mongodb using mongoose
mongoose.connect(mongodbUrl)
.then(() => {
    console.log("App is connected to MongoDB database");
    app.listen(PORT , () => {
        console.log(`App is running on the port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
})