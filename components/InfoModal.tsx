import React, { useCallback, useEffect, useState } from 'react';
import { FaPlay,FaTimes } from 'react-icons/fa'
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovieId from '@/hooks/useMovieId'

interface InfoModalProps {
    visible?: boolean;
    onClose: any;
}
 
const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState<boolean>(!!visible);

    const { movieId } = useInfoModalStore();
    const { data } = useMovieId(movieId);

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

        <div className="z-30  flex justify-center items-center fixed px-80 py-32">
            <div className="relative w-auto rounded-md overflow-hidden">
                <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 `}>

                    <div className="relative h-86">
                        {/* <video autoPlay muted loop src={data?.videoUrl} className="w-full brightness-[60%] object-cover h-full" /> */}
                        <img src={data?.thumbnailUrl} className="w-full brightness-[60%] object-cover h-full"  />
                        <div onClick={handleClose} className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-white bg-opacity-70 flex items-center justify-center">
                            <FaTimes className="text-black w-6" fontSize={20} /> 
                        </div>
                    </div>

                    <div className="px-12 py-8">
                        <div className="flex flex-row items-center gap-2 mb-8 mt-2">
                            <p className="text-white text-lg ">
                                
                                <div className='bg-white rounded-full flex flex-row gap-2 justify-center items-center px-3 py-3 mb-5
                                    cursor-pointer hover:bg-gray-300'>
                                    <FaPlay className='text-black' fontSize={20} />
                                    <div className='text-black font-bold'>Play</div>
                                </div>
                                {data?.duration}
                            </p>
                        </div>
                        <p className="text-white text-lg">
                            {data?.description}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default InfoModal;
