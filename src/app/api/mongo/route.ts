import clientPromise from "@/lib/db";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("test");

  const notes = await db.collection("notes").find({}).toArray();

  return Response.json(notes);
}

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db("test");

  const body = await request.json();

  await db.collection("notes").insertOne(body);

  return Response.json({ msg: "success" });
}

export async function PUT(request: Request) {
  const client = await clientPromise;
  const db = client.db("test");

  const body = await request.json();
  const { editingId, content, color, timestamp } = body;

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
