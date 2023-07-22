import useMovieList from '@/hooks/useMovieList';
import MovieCard from './MovieCard'

const AllMovies = () => {
    const { data: allMovies } = useMovieList();

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-5xl px-12 py-10 '>
                AllMovies
            </div>

            <div className='flex flex-row gap-6 px-12 '>
                {
                    allMovies?.map((item: any) => (
                      
                        <MovieCard key={item?.id} data={item} />
                    ))
                }
            </div>
            <hr className='mx-12' />

        </div>
    )
}

export default AllMovies
