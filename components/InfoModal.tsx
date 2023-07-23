import React, { useCallback, useEffect, useState } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useMovieId from "@/hooks/useMovieId";
import { useRouter } from "next/router";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  const { movieId } = useInfoModalStore();
  const { data } = useMovieId(movieId);

  const router = useRouter();

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
    <div className="z-50  flex justify-center items-center fixed px-[35rem] py-[12rem]">
      <div className="relative w-auto rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 `}
        >
          <div className="relative h-96">
            <img
              src={data?.thumbnailUrl}
              className="relative w-full brightness-[40%] object-cover h-full"
            />
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-white bg-opacity-70 flex items-center justify-center"
            >
              <FaTimes className="text-black w-6" fontSize={20} />
            </div>
            <div className="absolute bottom-0 left-0 ">
              <p className="text-white font-bold text-xl p-4 pr-52 mb-6">
                {data?.description}
              </p>
              <div className="flex flex-row gap-4">
                <div
                  onClick={() => router.push(`/watch/${data?.id}`)}
                  className="bg-white w-24 rounded-full flex flex-row gap-2 justify-center items-center px-3 py-3 mb-5 ml-4
                                    cursor-pointer hover:bg-gray-300"
                >
                  <FaPlay className="text-black" fontSize={20} />
                  <div className="text-black font-bold">Play</div>
                </div>
                <div className="mt-2 font-bold text-md">{data?.duration} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
