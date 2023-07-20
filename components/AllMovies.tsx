import React, { useCallback, useState } from 'react'
import useMovieList from '@/hooks/useMovieList';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import axios from 'axios'
import { FaPlay } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { IoHeartDislike } from 'react-icons/io5'

import { useRouter } from 'next/router';



const AllMovies = () => {
    const { data: allMovies } = useMovieList();
    const { openModal } = useInfoModalStore();
    const [fav, setFav] = useState(false);

    const router = useRouter();

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-5xl px-12 py-10 '>
                AllMovies
            </div>
            
            <div className='flex flex-row gap-6 px-12 '>
                {
                    allMovies?.map((item: any) => (

                        <div className='group relative h-[15vw]'>
                            <img draggable={false} className=' cursor-pointer
                                object-cover
                                group-hover:opacity-90
                                sm:group-hover:opacity-0
                                w-full
                                h-[12vw]' src={item?.thumbnailUrl} alt="FilmImg" />
                            <div className="
                                    absolute
                                    top-0
                                    duration-200
                                    z-10
                                    w-full
                                    scale-0
                                    group-hover:scale-110
                                    group-hover:-translate-y-[1vw]
                                    group-hover:translate-x-[2vw]
                                ">
                                <img src={item?.thumbnailUrl} alt="Movie" draggable={false} className="
                                    cursor-pointer object-cover transition w-full h-[12vw]"/>
                                <div className="
                                        z-10 bg-zinc-800 p-4 absolute w-full">
                                    <div className="flex flex-row items-center gap-3">
                                        <div  onClick={()=> router.push(`/watch/${item?.id}`)}
                                        className="cursor-pointer w-10 h-6 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
                                            <FaPlay className="text-black w-10 " />
                                        </div>

                                        <div onClick={() => openModal(item?.id)} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
                                            {fav ? <IoHeartDislike fontSize={30} className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
                                                :
                                                <MdFavoriteBorder fontSize={30} className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />}
                                        </div>
                                    </div>
                                    <p className="text-green-400 font-semibold mt-4 mb-2">
                                        {item?.title}
                                    </p>
                                    <hr />
                                    <div className="mt-8 mb-2">
                                        <p className="text-white text-sm">{item?.duration}</p>
                                    </div>
                                    <div className="text-sm text-white ">
                                        <p>{item?.genre}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
            <hr className='mx-12'/>

        </div>
    )
}

export default AllMovies
