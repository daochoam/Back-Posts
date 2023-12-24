import { Request, Response } from 'express'
import moment from 'moment-timezone'
import { Post } from "../../schemas"
import { handlerCurrentDate } from '../../handlers'

const removePostById = async (req: Request, res: Response) => {
  try {
    const { User_id } = res.locals
    const { id } = req.params

    if (!id) return res.status(400).json({ message: 'id is required' })

    const postUser = await Post.find({ _id: id, User_id: User_id })
    if (!postUser) return res.status(404).json({ message: 'The post does not belong to the user' })

    const post = await Post.findOneAndUpdate({ _id: id, User_id: User_id }, {
      deleteAt: handlerCurrentDate(),
      isActive: false
    }, { new: true })

    if (!post?.isActive) return res.status(200).json({ message: 'Post deleted successfully' })
    else res.status(404).json({ message: 'Post not found' })


  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default removePostById