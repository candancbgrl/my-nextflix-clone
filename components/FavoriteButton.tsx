import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useChildsFavorites from "@/hooks/useChildsFavorites";
import { useRouter } from "next/router";
import useChilds from "@/hooks/useChilds";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const [isChild, setIsChild] = useState(false);

  const { mutate: mutateFavorites } = useFavorites();
  const { mutate: mutateChildsFavorites } = useChildsFavorites();

  const { data: currentUser, mutate } = useCurrentUser();
  const { data: childs, mutate: childMutate } = useChilds();

  const router = useRouter();

  useEffect(() => {
    if (router.query.childUsername) {
      setIsChild(true);
    } else {
      setIsChild(false);
    }
  }, []);
  const [showContent, setShowContent] = useState(false);
  const addFavorites = useCallback(async () => {
    const response = await axios.post("/api/favorite", {
      movieId,
      isChild: isChild,
      childName: router.query.childUsername,
    });
    const updatedFavoritesId = response?.data?.favoritesId;
    if (router.query.childUsername) {
      setShowContent(!showContent);
      // childMutate({
      //   ...childs,
      //   favoritesId: updatedFavoritesId,
      // });
      //mutateChildsFavorites();
    } else {
      mutate({
        ...currentUser,
        favoritesId: updatedFavoritesId,
      });
      mutateFavorites();
    }
  }, [movieId, currentUser, mutate, mutateFavorites]);

  const deleteFavorites = useCallback(async () => {
    const response = await axios.delete("/api/favorite", {
      data: {
        movieId,
        isChild: isChild,
        childName: router.query.childUsername,
      },
    });
    const updatedFavoritesId = response?.data?.favoritesId;

    if (router.query.childUsername) {
      // childMutate({
      //   ...childs,
      //   favoritesId: updatedFavoritesId,
      // });
      // mutateChildsFavorites();
    } else {
      mutate({
        ...currentUser,
        favoritesId: updatedFavoritesId,
      });
      mutateFavorites();
    }
  }, [movieId, currentUser, mutate, mutateFavorites]);

  return (
    <div className="flex flex-row gap-4">
      <div
        onClick={addFavorites}
        className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
      >
        <AiOutlinePlus className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
      </div>
      <div
        onClick={deleteFavorites}
        className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
      >
        <AiTwotoneDelete className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
      </div>
    </div>
  );
};

export default FavoriteButton;
