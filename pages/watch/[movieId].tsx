import React from 'react'
import useMovieId from '@/hooks/useMovieId'
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai'

const Movie = () => {
    const router = useRouter();
    const { movieId } = router.query;
    const { data: movie } = useMovieId(movieId as string)

    return (
        <div className="h-screen w-full">
            <video autoPlay muted loop controls className='h-screen' src={movie?.videoUrl}></video>
            <p className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-4">
                <AiOutlineArrowLeft onClick={() => router.push('/')} fontSize={30} />
            </p>
        </div>
    )
}

export default Movie
