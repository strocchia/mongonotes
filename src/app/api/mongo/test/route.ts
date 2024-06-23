import clientPromise from "@/lib/db";

export async function GET(request: Request) {
  const client = await clientPromise;
  const db = client.db("test");

  const users = await db.collection("users").find({}).toArray();
  // const accounts = await db.collection("accounts").find({}).toArray();
  const accounts = {};
  const sessions = await db.collection("sessions").find({}).toArray();

  return Response.json({ users, accounts, sessions });
}

export async function POST(request: Request) {}

// import clientPromise from "@/lib/db";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const client = await clientPromise;
//     const db = client.db("sample_mflix");
//     const movies = await db
//       .collection("movies")
//       .find({})
//       .sort({ metacritic: -1 })
//       .limit(10)
//       .toArray();
//     res.json(movies);
//   } catch (e) {
//     console.error(e);
//   }
// };
