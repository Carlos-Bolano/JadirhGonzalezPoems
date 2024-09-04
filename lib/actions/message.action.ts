"use server";

import connectDB from "@/lib/mongoose";
import Message from "@/models/message";
import { CreateMessageSchema } from "@/schemas/message.schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function CreateMessage(request: Request) {
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
    return NextResponse.json({ status: 200, savedMessage });
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

export async function GetMessages() {
  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 });
    return messages;
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
