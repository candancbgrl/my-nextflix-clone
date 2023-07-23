import { useRouter } from "next/router";
import React from "react";

type FilmCardProps = {
  data: any;
};

const FilmCard: React.FC<FilmCardProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className=" h-[30rem] flex flex-row gap-6">
        <img
          onClick={() => router.push(`/watch/${data?.id}`)}
          className="w-1/2 brightness-[60%] rounded-2xl cursor-pointer"
          src={data.thumbnailUrl}
        />
        <div className="flex flex-col gap-6 pr-36 w-1/2 ">
          <div className="text-4xl font-bold">{data?.title}</div>
          <hr />
          <div className="font-bold">
            {data.genre} /{" "}
            <span className=" text-green-500">{data?.duration}</span>
          </div>
          <div className="text-md text-gray-300">{data?.description}</div>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
