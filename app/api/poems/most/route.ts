import { Poem } from "components/PoemCard";
import connectDB from "lib/mongoose";
import PoemsModel from "models/poem";
import { NextResponse } from "next/server";

interface mostpoems {
  mostViewedPoem: Poem;
  mostLikedPoem: Poem;
  mostCommentedPoem: Poem;
  totalViews: number;
  totalLikes: number;
  totalPoems: number;
}

export async function GET() {
  try {
    await connectDB();
    const Poems = await PoemsModel.find().sort({ createdAt: -1 }).exec();
    const mostViewedPoem = await PoemsModel.findOne()
      .sort({ views: -1 })
      .exec();
    const mostLikedPoem = await PoemsModel.findOne().sort({ likes: -1 }).exec();
    const mostCommentedPoem = await PoemsModel.aggregate([
      { $addFields: { commentsCount: { $size: "$comments" } } },
      { $sort: { commentsCount: -1 } },
      { $limit: 1 },
    ]);
    const totalPoems = Poems.length;
    const totalStats = await PoemsModel.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
          totalLikes: { $sum: "$likes" },
        },
      },
    ]);

    const poems: mostpoems = {
      mostViewedPoem,
      mostLikedPoem,
      mostCommentedPoem: mostCommentedPoem[0],
      totalViews: totalStats[0]?.totalViews || 0,
      totalLikes: totalStats[0]?.totalLikes || 0,
      totalPoems,
    };

    return NextResponse.json(poems);
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
