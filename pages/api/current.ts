
import { NextApiRequest, NextApiResponse } from "next";
// oturum açan kullanıcı bilgilerini getirir.
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end();
        }
        const { currentUser } = await serverAuth(req, res);  // kullanıcı bilgilerinin döndürüldüğü kod.
        
        return res.status(200).json(currentUser);
    } catch (error) {
        return res.status(500).end();
    }
}