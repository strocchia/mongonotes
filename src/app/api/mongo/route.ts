import clientPromise from "@/lib/db";

import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("test");

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized to proceed", { status: 401 });
  }

  const notes = await db
    .collection("notes")
    .find({ userId })
    // .find({})
    .toArray();

  return NextResponse.json(notes, { status: 200 });
}

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db("test");

  const body = await request.json();

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized to proceed", { status: 401 });
  }

  await db.collection("notes").insertOne({ ...body, userId });

  return NextResponse.json({ msg: "success" }, { status: 200 });
}

export async function PUT(request: Request) {
  const client = await clientPromise;
  const db = client.db("test");

  const body = await request.json();
  const { editingId, content, color, timestamp } = body;

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized to proceed", { status: 401 });
  }

  if (body.userId !== userId) {
    console.log("You can't log someone else's note!");
    return NextResponse.json({ msg: "error" }, { status: 401 });
  }

  await db.collection("notes").updateOne(
    { id: editingId },
    {
      $set: {
        content,
        color,
        timestamp,
      },
    }
  );

  return Response.json({ msg: "success" }, { status: 200 });
}
