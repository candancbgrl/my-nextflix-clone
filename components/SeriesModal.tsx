import React, { useState, useEffect, useCallback } from "react";
import useMovieList from "@/hooks/useMovieList";
import { data } from "autoprefixer";
import { useRouter } from "next/router";

interface SeriesModalProps {
  visible?: boolean;
  onClose: any;
}

const SeriesModal: React.FC<SeriesModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const { data: movies } = useMovieList();

  const router = useRouter();
  8;
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
    <div className="z-30 flex justify-center items-center fixed top-20 ml-56 px-[10rem] bg-zinc-800  bg-opacity-90 rounded-xl pb-6">
      <div className="flex flex-col gap-3 mt-10 text-center ">
        {movies?.map((item: any) => (
          <div key={item?.id}>
            <span
              onClick={() => {
                router.push(`/series/${item?.genre}`);
                handleClose();
              }}
              className="hover:underline cursor-pointer text-md"
            >
              {item?.genre}
            </span>
          </div>
        ))}
        <div
          onClick={handleClose}
          className="cursor-pointer absolute top-3 right-3 h-8 w-8 rounded-full bg-white bg-opacity-70 text-zinc-800 font-bold flex items-center justify-center"
        >
          X
        </div>
      </div>
    </div>
  );
};

export default SeriesModal;
