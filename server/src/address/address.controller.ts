import type { NextFunction , Response} from "express";
import type{ ValidateRequestType } from "../middlewares/authenticate.middleware.js"
import { fetchUserAddress } from "./address.service.js";
export const fetchAddresses = async (req: ValidateRequestType, res: Response, next: NextFunction) => {
    const userId = (req.user as {id: string }).id; 
    try {
        const data  = await fetchUserAddress(userId); 
        res.status(200).json({success: true,data })
    } catch (error) {
        console.log(error)
        next(error)
    }

    
}