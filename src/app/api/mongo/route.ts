import clientPromise from "@/lib/db";

import { auth } from "@/auth";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("test");

  const session = await auth();

  const notes = await db
    .collection("notes")
    // .find({ userId: session?.user?.id })
    .find({})
    .toArray();

  return Response.json(notes);
}

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db("test");

  const session = await auth();

  const body = await request.json();

  await db
    .collection("notes")
    .insertOne({ ...body, userId: session?.user?.id });

  return Response.json({ msg: "success" });
}

export async function PUT(request: Request) {
  const client = await clientPromise;
  const db = client.db("test");

  const session = await auth();

  const body = await request.json();
  const { editingId, content, color, timestamp, userId } = body;

  if (userId !== session?.user?.id) {
    console.log("You can't log someone else's note!");
    return Response.json({ msg: "error" });
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

  return Response.json({ msg: "success" });
}
