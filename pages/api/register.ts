import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end();
        }

        const { email, name, password } = req.body;
        console.log(email,name,password)
        if (email && name && password) {
            // email adres varlığı kontrolu
            const existingUser = await prismadb.user.findUnique({
                where: {
                    email
                }
            })
            // nullse, db de böyle bir email adresi yok demektir.
            if (existingUser) {
                return res.status(422).json({ error: 'Email taken' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await prismadb.user.create({
                data: {
                    email,
                    name,
                    hashedPassword,
                    image: '',
                    emailVerified: new Date(),
                }
            })

            return res.status(200).json(user);
        }else{
            return res.status(422).json({ error: 'Empty input.' });
        }


    } catch (error) {
        return res.status(400).json({ error: `somethind went wrong : ${error} ` })
    }
}