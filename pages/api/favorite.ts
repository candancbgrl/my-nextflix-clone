import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from '@/lib/prismadb';
import { without } from "lodash";
import { useState } from "react";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    var childId = ''
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);

            const { movieId,  childName } = req.body;
            const movies = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            });

            if (!movies) {
                throw new Error('Invalid movie id.')
            }
            const childs = await prismadb.child.findMany();
            childs?.map((item: any) => {
                if (item.name === childName) {
                    childId = (item.id);
                }
            })

            if (childName) {
                try {
                    const child = await prismadb.child.update({
                        where: {
                            id: childId,
                            userId: currentUser?.id
                        },
                        data: {
                            favoritesId: { push: movieId }
                        }
                    });
                    return res.status(200).json(child);
                } catch (error) {
                    console.error('Güncelleme hatası:', error);
                }
                
            }
            else {
                const user = await prismadb.user.update({
                    where: {
                        email: currentUser.email || '',
                    },
                    data: {
                        favoritesId: { push: movieId }
                    }
                })
                return res.status(200).json(user);
            }



        }
        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req, res);

            const { movieId, childName } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });
            if (!existingMovie) {
                throw new Error('Invalid ID');
            }
            const childs = await prismadb.child.findMany();
            childs?.map((item: any) => {
                if (item.name === childName) {
                    childId = (item);
                }
            })
            if(childId){
                const updatedChildsFavoriteIds = without(childId.favoritesId, movieId);
                const updatedUser = await prismadb.child.update({
                    where: {
                        id: childId?.id || '',
                    },
                    data: {
                        favoritesId: updatedChildsFavoriteIds,
                    }
                });
                return res.status(200).json(updatedUser);
            }else{
                const updatedFavoriteIds = without(currentUser.favoritesId, movieId);

                const updatedUser = await prismadb.user.update({
                    where: {
                        email: currentUser.email || '',
                    },
                    data: {
                        favoritesId: updatedFavoriteIds,
                    }
                });
                return res.status(200).json(updatedUser);
            }
            
        }

        return res.status(405).end();



    } catch (error) {
        return res.status(500).end();
    }
}