import { type Anime } from "@tutkli/jikan-ts";
import { useAnimeStore } from "../stores/animeStore";

interface AnimeProps {
  anime: Anime;
  onBack: () => void;
}

export default function AnimeFull({ anime, onBack }: AnimeProps) {

  const removeFromWishlist = useAnimeStore(state => state.removeFromWishlist);
  const addToWishlist = useAnimeStore(state => state.addToWishlist);
  const inWishlist = useAnimeStore(
    state => state.wishlist.some(a => a.mal_id === anime.mal_id)
  );

  return (
    <div className="bg-gray-300 w-10/12 m-auto mt-10 p-10">
      <div className="grid grid-cols-[auto_1fr]">
        <div>
          <img src={anime.images.jpg.large_image_url} alt={anime.title} />
        </div>
        <div className="flex flex-col">
          <div className="h-auto">
            <h1 className="text-5xl font-bold pl-5">{anime.title}</h1>
          </div>
          <div className="h-auto mt-4">
            <p className="text-2xl pl-5 font-bold">Synopsis</p>
            <p className="w-auto p-5 text-ellipsis">{anime.synopsis}</p>
          </div>
          <div className="h-auto">
            <p className="text-2xl pl-4 font-bold">Genres</p>
            <div className="flex ml-4.5 text-xl gap-5 mt-4">
              {anime.genres.map(genre => {
                return (
                  <div className="bg-gray-900 p-2 rounded-lg text-white" key={genre.name}>
                    <p>{genre.name}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="h-auto mt-5">
            <p className="text-2xl pl-4 font-bold">Score: <span className={anime.score > 6 ? "text-red-600" : "text-amber-900"}>{anime.score}</span></p>
          </div>
          <div className="flex gap-4 p-4">
            <button className="bg-cyan-400 p-4.5 rounded-lg" onClick={onBack}>Bo back</button>
            {inWishlist ? <button className="bg-red-400 p-4 rounded-lg" onClick={() => removeFromWishlist(anime.mal_id)}>Remove</button> : <button className="bg-purple-400 p-4 rounded-lg" onClick={() => addToWishlist(anime)}>Add</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
