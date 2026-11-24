import express from "express"
import { fetchAddresses } from "./address.controller.js";
import { validateToken } from "../middlewares/authenticate.middleware.js";
const router = express.Router(); 
router.get("/", validateToken,fetchAddresses)


export default router; 