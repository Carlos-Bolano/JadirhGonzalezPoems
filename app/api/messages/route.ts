import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Message from "../../../models/message";
import { CreateMessageSchema } from "../../../schemas/message.schema";
import connectDB from "../../../lib/mongoose";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const result = CreateMessageSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(result.error);
    }

    const { name, email, message } = result.data;

    const newMessage = new Message({
      name,
      email,
      message,
    });

    const savedMessage = await newMessage.save();

    return NextResponse.json({
      status: 200,
      savedMessage,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
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

export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
