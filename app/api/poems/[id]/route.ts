import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Poem from "../../../../models/poem";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectDB();
    const poem = await Poem.findById(id);

    if (!poem) {
      return NextResponse.json({ message: "Poem not found" }, { status: 404 });
    }

    return NextResponse.json(poem, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch poem:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectDB();
    const { title, content, readingTime } = await req.json();

    const updatedPoem = await Poem.findByIdAndUpdate(
      id,
      { title, content, readingTime },
      { new: true }
    );

    if (!updatedPoem) {
      return NextResponse.json({ message: "Poem not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPoem, { status: 200 });
  } catch (error) {
    console.error("Failed to update poem:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectDB();
    const deletedPoem = await Poem.findByIdAndDelete(id);

    if (!deletedPoem) {
      return NextResponse.json({ message: "Poem not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Poem deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete poem:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
