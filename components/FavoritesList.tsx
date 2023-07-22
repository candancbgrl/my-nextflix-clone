import React, { useEffect, useState, useCallback } from "react";
import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";

import MovieCard from "./MovieCard";
import axios from "axios";
import { useRouter } from "next/router";
import useChilds from "@/hooks/useChilds";
import useChildsFavorites from "@/hooks/useChildsFavorites";
import useMovieList from "@/hooks/useMovieList";

const FavoritesList = () => {
  const { data: favMovies } = useFavorites();
  const { data: currentUser } = useCurrentUser();
  const { data: child } = useChilds();

  const router = useRouter();

  const childItem = child?.find(
    (item: any) => item?.name === router.query.childUsername
  );
  const { data: childFavMovie } = useChildsFavorites(childItem?.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-5xl px-12 py-10 text-red-600">
        {router.query.childUsername
          ? router.query.childUsername
          : currentUser?.name}
        ' s Favorites List
      </div>
      <div className="flex flex-row gap-6 px-16  ">
        {childFavMovie
          ? childFavMovie?.map((data: any) => (
              <MovieCard key={data?.id} data={data} />
            ))
          : favMovies?.map((data: any) => (
              <MovieCard key={data?.id} data={data} />
            ))}
      </div>
    </div>
  );
};

export default FavoritesList;
