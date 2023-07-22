import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }
    await serverAuth(req, res);

    const { childId } = req.query;

    const childs = await prismadb.child.findUnique({
      where: {
        id: childId,
      },
    });
    const movies = await prismadb.movie.findMany({
      where: {
        id: {
          in: childs?.favoritesId,
        },
      },
    });
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).end();
  }
}
