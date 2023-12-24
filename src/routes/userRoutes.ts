import { Router } from "express";
import * as userControllers from "../controllers/user"
import { verifyUserSession } from "../middlewares";

const userRoutes: Router = Router();

userRoutes.get('/:id', userControllers.getUserById);
userRoutes.post('/', userControllers.createUser);
userRoutes.put('/:id', verifyUserSession, userControllers.updateUserById);
userRoutes.delete('/:id', verifyUserSession, userControllers.removeUserById);


export default userRoutes;