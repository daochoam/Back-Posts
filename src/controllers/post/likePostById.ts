import { Request, Response } from 'express';
import { Post } from '../../schemas';
import { handlerCheckLikes } from '../../handlers';

const likePostById = async (req: Request, res: Response) => {
  try {
    const { User_id } = res.locals
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Missing id' });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.likes = post.likes || [];
    handlerCheckLikes(post.likes, User_id)

    const likeSaved = await post.save();
    if (!likeSaved) return res.status(500).json({ message: 'Error saving like' });
    res.status(200).json({ message: 'Like saved successfully', data: likeSaved });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default likePostById;