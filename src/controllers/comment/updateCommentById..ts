import { Request, Response } from 'express'
import { Comment } from '../../schemas'

const updateCommentById = async (req: Request, res: Response) => {
  try {
    const { User_id } = res.locals
    const { id } = req.params
    const comment = req.body.comment.trim()

    if (!comment) return res.status(400).json({ message: 'Comment is required' })
    const commentUpdated = await Comment.findOneAndUpdate({ _id: id, User_id: User_id }, { comment }, { new: true })

    res.status(200).json({ message: 'Comment updated successfully', data: commentUpdated })

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}

export default updateCommentById