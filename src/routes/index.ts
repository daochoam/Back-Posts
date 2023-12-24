import { Router } from "express";
import postRoutes from "./postRoutes";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";

const socialNetworkRoutes = Router()

socialNetworkRoutes.use("/auth", authRoutes);
socialNetworkRoutes.use("/post", postRoutes);
socialNetworkRoutes.use("/user", userRoutes);


export default socialNetworkRoutes