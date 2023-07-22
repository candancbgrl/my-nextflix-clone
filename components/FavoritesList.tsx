import React, { useEffect, useState, useCallback } from 'react'
import useFavorites from '@/hooks/useFavorites';
import useCurrentUser from '@/hooks/useCurrentUser';

import MovieCard from './MovieCard'
import axios from 'axios';
import { useRouter } from 'next/router';
import useChilds from '@/hooks/useChilds';
import useChildsFavorites from '@/hooks/useChildsFavorites'
import useMovieList from '@/hooks/useMovieList';


const FavoritesList = () => {
    const { data: favMovies } = useFavorites();
    const { data: currentUser } = useCurrentUser();
    const { data: child } = useChilds();

    //const [childFavMovie, setChildFavMovie] = useState([]);
    //const [childItem, setChildItem] = useState([]);
    const router = useRouter();

    /*useEffect(() => {
        try {
            const childItem = child?.find((item: any) => item?.name === router.query.childUsername);
            setChildItem(childItem)
            //const { data: childFavMovie } = useChildsFavorites(childItem?.id);
            //setChildFavMovie(childFavMovie);
        } catch (error) {
            console.log(error)
        }
    }, [])

    if (!childItem) {
        return null
        

    }
    console.log("childItem", childItem)
    const { data: childFavMovie } = useChildsFavorites(childItem?.id);
    console.log("childFavMovie",childFavMovie)*/
    
        const childItem = child?.find((item: any) => item?.name === router.query.childUsername);
        const { data: childFavMovie } = useChildsFavorites(childItem?.id);





    // verilerin gelmesi tamam, silindiği veya eklendiği zaman güncellenmesi gerek.
    return (
        <div className='flex flex-col gap-4'>
            <div className='text-5xl px-12 py-10 '>
                {router.query.childUsername ? router.query.childUsername : currentUser?.name}' s Favorites List
            </div>
            <div className='flex flex-row gap-6 px-16  '>

                {
                    childFavMovie ?
                        childFavMovie?.map((data: any) => (
                            <MovieCard key={data?.id} data={data} />
                        ))
                        :
                        favMovies?.map((data: any) => (
                            <MovieCard key={data?.id} data={data} />
                        ))
                }



            </div>

        </div>
    )
}

export default FavoritesList
