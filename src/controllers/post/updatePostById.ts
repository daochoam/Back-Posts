import { Request, Response } from 'express'
import { Post } from '../../schemas'

const updatePostById = async (req: Request, res: Response) => {
  try {
    const { User_id } = res.locals
    const { id } = req.params
    const { title, content } = req.body

    if (!title || !content) return res.status(400).json({ message: 'Title or content are required' })
    const post = await Post.findOneAndUpdate({ _id: id, User_id: User_id }, { title, content }, { new: true })

    res.status(200).json({ message: 'Post updated successfully', data: post })

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}

export default updatePostById