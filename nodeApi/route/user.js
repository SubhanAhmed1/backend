import express from "express";
import { getAllUser, register ,login, getMyProfile,logout} from "../controller/user.js";
import { isAuthentication } from "../middleware/auth.js";

const router=express.Router();


router.post("/new",register);

router.get("/all",getAllUser);
router.post("/login",login);
router.get("/me",isAuthentication,getMyProfile);
router.get("/logout",logout);



export default router;