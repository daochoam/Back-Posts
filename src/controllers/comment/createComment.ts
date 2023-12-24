import { Request, Response } from 'express'
import { Comment } from '../../schemas'

const createComment = async (req: Request, res: Response) => {
  try {
    const { User_id } = res.locals
    const { Post_id, Comment_id, comment, like } = req.body

    if (!Post_id) return res.status(400).json({ message: 'Post_id is require' })
    if (!comment || !like) return res.status(400).json({ message: 'Comment or like is require' })

    const createdComment = await Comment.create({ User_id, Post_id })
    if (!comment) return res.status(404).json({ message: 'Comment not created succesfully' })
    res.status(201).json({ message: 'Comment created successfully', data: createdComment })

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}

export default createComment