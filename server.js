import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import colors from "colors";
import morgan from "morgan";    
import cors from "cors";
import userRoutes from "./routes/user.route.js";

// express initialization
const app = express();

//configuration
dotenv.config();
const PORT = process.env.PORT || 8500;

// start the connection
connection();
app.use(cors({
    origin:"http://localhost:5173",
    credential:true,
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan());

app.use(process.env.API_VERSION,userRoutes);


// get method

// app.get("/fetch-something", (req, res) =>{
   // res.send("you got something!");
//     res.json({message: "you got something!"});
// });

// port listening

app.listen(PORT,() =>{
    console.log(colors.bgYellow(`the app is running on port no:${PORT}`));
    //console.log(colors.blue(`http://localhost:${PORT}`));
});