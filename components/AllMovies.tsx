import useMovieList from "@/hooks/useMovieList";
import MovieCard from "./MovieCard";

const AllMovies = () => {
  const { data: allMovies } = useMovieList();

  return (
    <div className="flex flex-col gap-4">
      <br />
      <div className="flex flex-row gap-2 px-12 ">
        {allMovies?.map((item: any) => (
          <MovieCard key={item?.id} data={item} />
        ))}
      </div>
      <hr className="mx-12" />
    </div>
  );
};

export default AllMovies;
