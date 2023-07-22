import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (req.method !== 'POST') {
            return res.status(405).end();
        }
        const { child } = req.body;


        // burdan devam et, childa göre movie id leri al, movie den sorgulayıp movileri dön.
 
        const favoritesMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: child?.favoritesId
                }
            }
        });

        return res.status(200).json(favoritesMovies);
    } catch (error) {
        return res.status(500).end();
    }
}