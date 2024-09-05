"use server";
import PoemModel from "../../models/poem";
import { ObjectId } from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "../mongoose";
import { CreatePoemSchema } from "../../schemas/poem.schema";

interface Comment {
  _id: ObjectId;
  text: string;
  author: string;
}

interface Poem {
  _id: ObjectId;
  title: string;
  content: string;
  readingTime: number;
  author: string;
  likes: number;
  views: number;
  date: Date;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export async function getPoems(): Promise<any[]> {
  try {
    await connectDB();
    const poems = await PoemModel.find().sort({ createdAt: -1 }).lean<Poem[]>();
    const serializablePoems = poems.map((poem) => ({
      _id: poem._id.toString(),
      title: poem.title,
      content: poem.content,
      readingTime: poem.readingTime,
      author: poem.author,
      likes: poem.likes,
      views: poem.views,
      date: poem.date ? poem.date.toISOString() : null,
      comments: poem.comments.map((comment) => ({
        _id: comment._id.toString(),
        text: comment.text,
        author: comment.author,
      })),
      createdAt: poem.createdAt.toISOString(),
      updatedAt: poem.updatedAt.toISOString(),
    }));

    return serializablePoems;
  } catch (error) {
    console.error("Error fetching poems:", error);
    return [];
  }
}

export async function getPoem(id: string) {
  try {
    await connectDB();
    const poem = await PoemModel.findById(id);
    return JSON.parse(JSON.stringify(poem));
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function createPoem(data: any) {
  try {
    await connectDB();
    const poem = JSON.stringify(data);

    const result = CreatePoemSchema.safeParse(poem);

    if (!result.success) {
      return NextResponse.json(result.error);
    }

    const { title, content, readingTime } = result.data;
    const newPoem = new PoemModel({
      title,
      content,
      readingTime,
    });

    const savedPoem = await newPoem.save();

    return savedPoem;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function updatePoem(id: string, data: any) {
  try {
    await connectDB();
    const poem = await PoemModel.findByIdAndUpdate(id, data, { new: true });
    return JSON.parse(JSON.stringify(poem));
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function getMostPoem() {
  try {
    await connectDB();
    const mostViewedPoem = await PoemModel.findOne().sort({ views: -1 }).exec();
    const mostLikedPoem = await PoemModel.findOne().sort({ likes: -1 }).exec();
    const mostCommentedPoem = await PoemModel.aggregate([
      { $addFields: { commentsCount: { $size: "$comments" } } },
      { $sort: { commentsCount: -1 } },
      { $limit: 1 },
    ]);

    const totalStats = await PoemModel.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
          totalLikes: { $sum: "$likes" },
          totalComments: { $sum: { $size: "$comments" } },
        },
      },
    ]);

    const poems = {
      mostViewedPoem,
      mostLikedPoem,
      mostCommentedPoem: mostCommentedPoem[0],
      totalViews: totalStats[0]?.totalViews || 0,
      totalLikes: totalStats[0]?.totalLikes || 0,
      totalComments: totalStats[0]?.totalComments || 0,
    };

    return poems;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function incrementViews(poemId: string) {
  try {
    await connectDB();
    const poem = await PoemModel.findByIdAndUpdate(
      poemId,
      { $inc: { views: 1 } },
      { new: true }
    );
    return poem?.views || 0;
  } catch (error) {
    console.error("Error incrementing views:", error);
    return null;
  }
}

export async function incrementLikes(poemId: string) {
  try {
    await connectDB();

    const poem = await PoemModel.findById(poemId);

    if (!poem) {
      throw new Error("Poem not found");
    }

    poem.likes += 1;
    await poem.save();

    return poem.likes;
  } catch (error) {
    console.error("Error incrementing likes:", error);
    return null;
  }
}

export async function decrementLikes(poemId: string) {
  try {
    await connectDB();

    const poem = await PoemModel.findById(poemId);

    if (!poem) {
      throw new Error("Poem not found");
    }

    poem.likes -= 1;
    await poem.save();

    return poem.likes;
  } catch (error) {
    console.error("Error decrementing likes:", error);
    return null;
  }
}

export async function commentPoem(
  poemId: string,
  comment: {
    name: string;
    comment: string;
  }
) {
  try {
    await connectDB();
    const poem = await PoemModel.findById(poemId);

    if (!poem) {
      throw new Error("Poem not found");
    }

    poem.comments.push({
      author: comment.name,
      text: comment.comment,
    });

    await poem.save();

    return { success: true };
  } catch (error) {
    console.error("Error adding comment:", error);
    return null;
  }
}
