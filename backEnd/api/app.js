import express from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors"
import { checkedLoggedin, getDetails, loginUser, refreshAccesstoken, registerUser } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const corsOptions = {
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If you need to send cookies
};

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser())
app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post("/register", async (req, res) => {
    console.log(req.body)
    registerUser(req,res)
});

app.post("/login", async(req,res)=>{
    loginUser(req,res)
})

app.post("/refresh",async(req,res)=>{
    refreshAccesstoken(req,res)
})

app.get("/user", verifyJWT, getDetails)

app.get("/checking",checkedLoggedin)

export {app}