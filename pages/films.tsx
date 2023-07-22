import React, { useEffect } from 'react'
import useMovieList from '@/hooks/useMovieList'
import Navbar from '@/components/Navbar'
import FilmCard from '@/components/FilmCard'
import SeriesModal from '@/components/SeriesModal';

import useInfoModalStore from '@/hooks/useInfoModalStore'
import useSeriesModalStore from '@/hooks/useSeriesModalStore'


const Films = () => {
    const { data: films, isLoading } = useMovieList();
    if (isLoading) return <div>Yükleniyor...</div>;
    const { isOpen: isInfoModalOpen, closeModal: closeInfoModal } = useInfoModalStore();
    const { isOpen: isSeriesModalOpen, closeModal: closeSeriesModal } = useSeriesModalStore();
    return (
        <div>
            <SeriesModal visible={isSeriesModalOpen} onClose={closeSeriesModal} />
            <Navbar />

            <div className='flex flex-col gap-6 pt-32 pl-16'>
                <div className='text-7xl'>
                    Films
                </div>
                {films?.map((item: any) => (
                    <FilmCard data={item} />
                ))}
            </div>
        </div>
    )
}

export default Films
