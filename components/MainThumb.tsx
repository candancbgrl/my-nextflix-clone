import useInfoModalStore from '@/hooks/useInfoModalStore';
import useRandomMovie from '@/hooks/useRandomMovie';
import React, { useCallback } from 'react'
import { FaPlay } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Modal from './Modal'
import { useRouter } from 'next/router';



const MainThumb = () => {

    const router = useRouter();
    const { openModal } = useInfoModalStore();

    const { data: randomMovie } = useRandomMovie();

    const handleOpenModal = useCallback(() => {
        openModal(randomMovie?.id);
      }, [openModal, randomMovie?.id]);
    
    const playVideo = useCallback(() => router.push(`/watch/${randomMovie?.id}`), [router, randomMovie?.id]);

    return (
        <div className="relative">
            <video className='w-full h-[69vw] object-cover brightness-[60%] transition duration-500' autoPlay muted loop src={randomMovie?.videoUrl}></video>
            <div className="absolute top-[20rem] left-0 left-4 flex flex-col ">
                <p className='text-white text-6xl font-bold'>{randomMovie?.title}</p>
                <p className='text-white text-md max-w-[45rem] mt-6'>{randomMovie?.description}</p>
                <div className='flex flex-row gap-8 mt-8'>
                    <div onClick={playVideo} className='bg-white rounded-md flex flex-row gap-3 justify-center items-center px-5 py-3
                    pointer-cursor hover:bg-gray-300'>
                        <FaPlay   className='text-black ' fontSize={20} />
                        <button 
                            className='text-black font-bold '>Play</button>
                    </div>
                    <div className='bg-zinc-500 bg-opacity-50 rounded-md flex flex-row justify-center items-center px-4
                    hover:bg-opacity-30'>
                        <AiOutlineInfoCircle className='text-white ' fontSize={25} />
                        <button onClick={handleOpenModal}  className='text-white opacity-100 p-2 font-bold'>More Info</button>
                    </div>
                </div>
            </div> 
        </div>

    )
}

export default MainThumb


/**
 * ayrı ekranda oynatma koduna eklenir.
 * <div className="relative">
            <video controls width="640" height="360" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">
                
            </video>
            <p className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-4">
                Bu bir örnek yazıdır.
            </p>
        </div>
 */