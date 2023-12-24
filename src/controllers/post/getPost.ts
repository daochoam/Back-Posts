import { Request, Response } from 'express';
import { Post } from '../../schemas';
import { handlerDataPaginated } from '../../handlers';

const getPost = async (req: Request, res: Response) => {
  try {
    const {
      title,
      content,
      fullName,
      email,
      search,
      isActive = true,
      timezone = 'UTC',
      itemXPage = 10,
      page = 1
    } = req.query;

    const skip = (Number(page) - 1) * Number(itemXPage);

    const Parameters: typeAggregate[] = [
      {
        $lookup: {
          from: 'users',
          localField: 'User_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $sort: {
          createdAt: -1
        }
      }
    ];

    if (search) {
      Parameters.push({
        $match: {
          $or: [
            { 'title': new RegExp(search as string, 'i') },
            { 'content': new RegExp(search as string, 'i') },
            { 'user.fullName': new RegExp(search as string, 'i') },
            { 'user.email': new RegExp(search as string, 'i') },
          ]
        }
      });
    } else {
      Parameters.push({
        $match: {
          $and: [
            title ? { 'title': new RegExp(title as string, 'i') } : {},
            content ? { 'content': new RegExp(content as string, 'i') } : {},
            fullName ? { 'user.fullName': new RegExp(fullName as string, 'i') } : {},
            email ? { 'user.email': new RegExp(email as string, 'i') } : {},
          ]
        }
      });
    }

    Parameters.push({ $match: { isActive: isActive } });
    // Aggregation to count the number of total posts found
    const totalPosts = await Post.countDocuments(Parameters)
    const totalPages = Math.ceil(totalPosts / Number(itemXPage));

    if (totalPosts === 0) return res.status(404).json({ message: 'Posts not found' });
    if (Number(page) > totalPages) return res.status(404).json({ message: 'Page not found' });

    // Paginated
    Parameters.push({ $skip: Number(skip) }, { $limit: Number(itemXPage) });

    // Project the desired properties
    Parameters.push({
      $project: {
        _id: 1,
        title: 1,
        content: 1,
        likes: 1,
        countLikes: { $size: '$likes' },
        email: '$user.email',
        fullName: '$user.fullName',
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

    const posts = await Post.aggregate(Parameters as any);

    res.status(200)
      .json(handlerDataPaginated(posts, totalPosts, skip, Number(page), totalPages));

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default getPost;
