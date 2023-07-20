import React, { useState, useEffect, useCallback } from 'react'
import useMovieList from '@/hooks/useMovieList'

interface SeriesModalProps {
    visible?: boolean;
    onClose: any;
}


const SeriesModal: React.FC<SeriesModalProps> = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState<boolean>(!!visible);
    const { data: movies } = useMovieList();

    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        onClose();
    }, [onClose]);

    if (!visible) {
        return null;
    }
    return (
        <div className='z-30 flex justify-center items-center fixed top-20 ml-56 px-[10rem] bg-zinc-800  bg-opacity-90 rounded-xl pb-6'>
            <div className='flex flex-col gap-3 mt-10 text-center hover:underline'>
                {
                    movies?.map((item:any) =>(
                        <div key={item?.id}> 
                        <span className='hover:underline cursor-pointer text-md'>{item?.genre}</span>
                         </div>
                    ))
                }
                <div onClick={handleClose} className="cursor-pointer absolute top-3 right-3 h-8 w-8 rounded-full bg-white bg-opacity-70 text-zinc-800 font-bold flex items-center justify-center">
                    X
                </div>
            </div>

        </div>
        //     <div className="z-30  flex justify-center items-center fixed px-80 py-32">
        //     <div className="relative w-auto rounded-md overflow-hidden">
        //         <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 `}>

        //             <div className="relative h-86">
        //                 <div onClick={handleClose} className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-white bg-opacity-70 flex items-center justify-center">
        //                 </div>
        //                 <div className="absolute top-56 left-10">
        //                     <p className="text-white text-5xl h-full font-bold">
        //                         dfgdfg
        //                     </p>
        //                     <p className="text-white text-xl h-full mt-3">
        //                        dfgfdgdf
        //                     </p>

        //                     <div className="flex flex-row gap-4 items-center mt-4">
        //                         <div className='bg-white rounded-full flex flex-row gap-3 justify-center items-center px-3 py-3
        //                             pointer-cursor hover:bg-gray-300'>

        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>

        //             <div className="px-12 py-8">
        //                 <div className="flex flex-row items-center gap-2 mb-8">
        //                     <p className="text-white text-lg">
        //                         kdfdljghfd
        //                     </p>
        //                 </div>
        //                 <p className="text-white text-lg">
        //                     fdkgjhfdkghj
        //                 </p>
        //             </div>

        //         </div>
        //     </div>
        // </div>
    )
}

export default SeriesModal
