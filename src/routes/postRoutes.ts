import { Router } from "express";
import * as postController from '../controllers/post';
import { verifyUserSession } from "../middlewares";

const postRoutes: Router = Router();

postRoutes.get('/', postController.getPost);
postRoutes.get('/:id', postController.getPostById);
postRoutes.post('/', verifyUserSession, postController.createPost);
postRoutes.put('/:id', verifyUserSession, postController.updatePostById);
postRoutes.put('/like/:id', postController.moreLikesById);
postRoutes.put('/dislike/:id', postController.minusLikesById);
postRoutes.delete('/:id', verifyUserSession, postController.removePostById);


export default postRoutes;