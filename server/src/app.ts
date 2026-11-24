import express from "express"
import cors from "cors"
import { corseOptions } from "../config/cors.js";
import useAuthRouter from "./auth/auth.route.js"
import useAddressRouter from "./address/address.route.js"
import swaggerUi from "swagger-ui-express";
import openApiSpec from "./docs/swagger.js";
import { errorMiddleWare } from "./middlewares/errorMiddlware.js";

const app = express(); 
app.use(express.json()); 
app.use(cors(corseOptions))

app.use("/api/v1/auth", useAuthRouter)
app.use('/api/v1/address',useAddressRouter )
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use(errorMiddleWare);



export default app;