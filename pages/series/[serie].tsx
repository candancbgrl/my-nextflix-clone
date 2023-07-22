import { useRouter } from 'next/router';
import React from 'react'
import useSerieMovies from '@/hooks/useSerieMovies'
import FilmCard from '@/components/FilmCard'
import Navbar from '@/components/Navbar'

import SeriesModal from '@/components/SeriesModal';

import useInfoModalStore from '@/hooks/useInfoModalStore'
import useSeriesModalStore from '@/hooks/useSeriesModalStore'

const SerieMovies = () => {

    const router = useRouter();
    const { serie } = router.query
    const { data: serieMovies } = useSerieMovies(serie as string);

    const { isOpen: isInfoModalOpen, closeModal: closeInfoModal } = useInfoModalStore();
    const { isOpen: isSeriesModalOpen, closeModal: closeSeriesModal } = useSeriesModalStore();
    return (
        <div>
            <SeriesModal visible={isSeriesModalOpen} onClose={closeSeriesModal} />
            <Navbar/>
            <div className='pt-36 pl-12 pb-12'>
                <div className=' text-6xl hover:text-gray-600'>{serie}</div>
            </div>
            <div className='flex flex-row gap-6 px-12  '>
            {
                serieMovies?.map((item: any) => (
                    <FilmCard data={item} />
                ))
            }
        </div>
        </div>
    )
}

export default SerieMovies