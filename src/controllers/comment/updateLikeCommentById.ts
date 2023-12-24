import { Request, Response } from 'express';
import { Comment } from '../../schemas';
import { handlerCheckLikes } from '../../handlers';

const updateLikeCommentById = async (req: Request, res: Response) => {
  try {
    const { User_id } = res.locals
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Missing id' });

    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.likes = comment.likes || [];
    handlerCheckLikes(comment.likes, User_id)

    const likeSaved = await comment.save();
    if (!likeSaved) return res.status(500).json({ message: 'Error saving like' });
    res.status(200).json({ message: 'Like saved successfully', data: likeSaved });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default updateLikeCommentById;
