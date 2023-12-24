import { Request, Response } from 'express'
import { Post } from '../../schemas'

const createPost = async (req: Request, res: Response) => {
  try {
    const { User_id } = res.locals
    const { title, content } = req.body

    if (!title || !content) return res.status(404).json({ message: 'Missing title or content' })

    const post = await Post.create({ title, content, User_id })
    if (!post) return res.status(404).json({ message: 'Post not created succesfully' })
    res.status(201).json({ message: 'Post created successfully', data: post })

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}

export default createPost