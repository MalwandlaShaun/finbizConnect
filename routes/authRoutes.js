import express from "express";
import { logIn, register } from "../controllers/authController.js";
//import { register } from "../../client/src/features/auth/authSlice.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);


router.get("/user/:id", logIn);
router.post("/login", logIn);




export default router;
