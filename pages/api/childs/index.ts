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

    const childs = await prismadb.child.findMany();

    return res.status(200).json(childs);
  } catch (error) {
    return res.status(500).end();
  }
}
