import { Request, Response } from 'express';
import { Comment } from '../../schemas';
import mongoose from 'mongoose';
import { handlerDataPaginated } from '../../handlers';

const getComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const {
      isActive = true,
      timezone = 'UTC',
      itemXPage = 5,
      page = 1
    } = req.query;

    const skip = (Number(page) - 1) * Number(itemXPage);

    const Parameters: any = []
    Parameters.push({ $match: { _id: new mongoose.Types.ObjectId(id) } });
    Parameters.push({ $match: { isActive: isActive } });

    // Aggregation to count the number of total comments found
    const totalComments = await Comment.countDocuments(Parameters)
    const totalPages = Math.ceil(totalComments / Number(itemXPage));

    if (totalComments === 0) {
      return res.status(404).json({ message: 'Comments not found' });
    }
    if (Number(page) > totalPages) {
      return res.status(404).json({ message: 'Page not found' });
    }
    Parameters.push({ $skip: Number(skip) }, { $limit: Number(itemXPage) });

    // Project the desired properties
    Parameters.push({
      $project: {
        _id: 1,
        comments: 1,
        likes: 1,
        countLikes: { $size: '$likes' },
        formattedCreatedAt: {
          $dateToString: {
            format: "%d/%m/%Y %H:%M:%S",
            date: "$createdAt",
            timezone: timezone as string
          }
        },
        formattedUpdateAt: {
          $dateToString: {
            format: "%d/%m/%Y %H:%M:%S",
            date: "$updateAt",
            timezone: timezone as string
          }
        }
      }
    })

    const comments = await Comment.aggregate(Parameters);

    res.status(200)
      .json(handlerDataPaginated(comments, totalComments, skip, Number(page), totalPages));

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default getComment;
