import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    try {
        if (req.method !== 'GET') {
            return res.status(405).end();
        }
        await serverAuth(req, res);

        const { serie } = req.query;

        const movies = await prismadb.movie.findMany({
            where:{
                genre:serie
            }
        });
        
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).end();
    }
}