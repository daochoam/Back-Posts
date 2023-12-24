import { Request, Response } from 'express'
import { Comment } from "../../schemas"
import { handlerCurrentDate } from '../../handlers'

const removeCommentById = async (req: Request, res: Response) => {
  try {
    const { User_id } = res.locals
    const { id } = req.params

    if (!id) return res.status(400).json({ message: 'id is required' })

    const comment = await Comment.findOneAndUpdate(
      { _id: id, User_id: User_id },
      { deleteAt: handlerCurrentDate(), isActive: false },
      { new: true }
    )

    if (!comment) return res.status(404).json({ message: 'The Comment does not belong to the user' })

    if (!comment?.isActive) return res.status(200).json({ message: 'Comment deleted successfully' })
    else res.status(404).json({ message: 'Comment not found' })

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default removeCommentById