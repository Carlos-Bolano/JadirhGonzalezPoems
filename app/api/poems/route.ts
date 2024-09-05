import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "../../../lib/mongoose";
import { CreatePoemSchema } from "../../../schemas/poem.schema";
import Poem from "../../../models/poem";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const result = CreatePoemSchema.safeParse(body);

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

    return NextResponse.json({
      message: "Poem created successfully",
      poem: savedPoem,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
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
    return NextResponse.error();
  }
}

export async function GET() {
  try {
    await connectDB();
    const poems = await Poem.find().sort({ createdAt: -1 });
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
    return NextResponse.error();
  }
}
