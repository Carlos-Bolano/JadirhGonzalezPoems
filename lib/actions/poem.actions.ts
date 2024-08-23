"use server";

import connectDB from "@/lib/mongoose";
import Poem from "@/models/poem";
import { CreatePoemSchema } from "@/schemas/poem.schema";
import { NextResponse } from "next/server";

export async function getPoems() {
  try {
    await connectDB();
    const poems = await Poem.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(poems));
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

export async function getRecentPoems(limit: number = 8) {
  try {
    await connectDB();

    const poems = await Poem.find().sort({ createdAt: -1 }).limit(limit);

    return JSON.parse(JSON.stringify(poems));
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
export async function getPoem(id: string) {
  try {
    await connectDB();
    const poem = await Poem.findById(id);
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
    console.log(poem);

    const result = CreatePoemSchema.safeParse(poem);

    if (!result.success) {
      return NextResponse.json(result.error);
    }

    const { title, content, readingTime } = result.data;
    const newPoem = new Poem({
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

export async function getMostPoem() {
  try {
    await connectDB();
    const mostViewedPoem = await Poem.findOne().sort({ views: -1 }).exec();
    const mostLikedPoem = await Poem.findOne().sort({ likes: -1 }).exec();
    const mostCommentedPoem = await Poem.aggregate([
      { $addFields: { commentsCount: { $size: "$comments" } } },
      { $sort: { commentsCount: -1 } },
      { $limit: 1 },
    ]);

    const totalStats = await Poem.aggregate([
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

    return JSON.parse(JSON.stringify(poems));
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
