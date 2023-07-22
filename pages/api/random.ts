import { NextApiRequest, NextApiResponse } from "next";
// oturum açan kullanıcı bilgilerini getirir.
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

    const moviesCount = await prismadb.movie.count();
    const allMovies = await prismadb.movie.findMany();

    const randomMovie = allMovies[Math.floor(Math.random() * moviesCount)];

    return res.status(200).json(randomMovie);
  } catch (error) {
    return res.status(500).end();
  }
}
