// app/api/mongo/[colorHash]/route.ts

import clientPromise from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { colorHash: string } }
) {
  const client = await clientPromise;
  const db = client.db("test");

  console.log(params, `#${params.colorHash}`);

  const notes = await db
    .collection("notes")
    .find({
      color: "#" + params.colorHash.toString(),
    })
    .toArray();

  return Response.json(notes);
}
