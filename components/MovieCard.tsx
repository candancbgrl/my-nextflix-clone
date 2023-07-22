import React, { useMemo } from "react";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import { useRouter } from "next/router";
import { FaPlay } from "react-icons/fa";
import {
  AiOutlineInfoCircle,
  AiOutlinePlus,
  AiTwotoneDelete,
} from "react-icons/ai";
import FavoriteButton from "@/components/FavoriteButton";

interface MovieInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  genre: string;
}

interface MovieCardProps {
  data: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const { openModal } = useInfoModalStore();

  const router = useRouter();

  return (
    <div className="group relative h-[15vw]">
      <img
        draggable={false}
        className=" cursor-pointer object-cover group-hover:opacity-90 sm:group-hover:opacity-0 w-full h-[12vw]"
        src={data?.thumbnailUrl}
        alt="FilmImg"
      />
      <div className="text-2xl text-gray-400 mt-2"> {data.title}</div>
      <div className=" absolute top-0 duration-200 z-10 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[1vw] group-hover:translate-x-[2vw]">
        <img
          src={data?.thumbnailUrl}
          alt="Movie"
          draggable={false}
          className="cursor-pointer object-cover transition w-full h-[12vw]"
        />
        <div className="z-10 bg-zinc-800 p-4 absolute w-full">
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => router.push(`/watch/${data?.id}`)}
              className="cursor-pointer w-10 h-6 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <FaPlay className="text-black w-10 " />
            </div>
            <div onClick={() => openModal(data?.id)}>
              <AiOutlineInfoCircle
                className="text-black w-10 text-white cursor-pointer hover:opacity-50"
                fontSize={40}
              />
            </div>

            <FavoriteButton movieId={data?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
