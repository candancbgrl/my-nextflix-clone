import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import prismadb from '@/lib/prismadb';


export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        Credentials({
            // id ve name benzersiz kimlik tanımlar
            id: 'credentials',
            name: 'Credentials',
            // kimlik doğr. için kullanılacak bilgiler.
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            
            // Kimlik doğrulama işlemini gerçekleştiren asenkron bir fonksiyon tanımlar.
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log("boşa girdi")
                    
                    throw new Error('Email and password required')
                    
                }
                // email adresine göre kullanıcıyı arar
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user.hashedPassword) {
                    throw new Error('Email does not exist');
                }

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

                if (!isCorrectPassword) {
                    throw new Error('Incorrect password');
                }

                return user;
            }
        })
    ],

    // signIn işlemi /auth altında gerçekleşir.
    pages: {
        signIn: '/auth'
    },
    debug: process.env.NODE_ENV === 'development',
    // kimlik doğrulama için adapter gerekli
    adapter: PrismaAdapter(prismadb),
    // session yönetimi için jwt gerek
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET

}


export default NextAuth(authOptions);
