import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
// Import the required modules as ES modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import employeeRoute from "./routes/employeeRoute.js";
import AuthRoutes from "./routes/authRoutes.js";
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");


const app = express();

// Enable CORS middleware
// app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
/*
app.use(
  cors({
    origin: ["https://employee-app-delta.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true,
  })
);
*/

app.use(
  cors({})
);

// Use Express middleware
app.use(express.json({ limit: "50mb" }));
mongoose.connect(process.env.MONGO_URI);

//Routes

app.use("/api/employees", employeeRoute);
app.use("/api/auth", AuthRoutes);



admin.initializeApp();
const db = admin.firestore();

// const app = express();

// Example GET endpoint
app.get("/firebase/get", async (req, res) => {
  const userId = req.params.id;
  const userDoc = await db.collection("users").doc(userId).get();
  if (userDoc.exists) {
    res.status(200).json(userDoc.data());
  } else {
    res.status(404).send("User not found");
  }
});

// Example POST endpoint
app.post("/user", async (req, res) => {
  const userData = req.body;
  const newUserRef = db.collection("users").doc();
  await newUserRef.set(userData);
  res.status(201).send(`User created with ID: ${newUserRef.id}`);
});

exports.api = functions.https.onRequest(app);






app.use(express.json({ limit: "50mb" }));
//app.use(cookieParser());
mongoose.connect(process.env.MONGO_URI);

const PORT = 8000;

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
