import { useAnimeStore } from "../stores/animeStore";
import AnimeCard from "../components/AnimeCard";
import AnimeFull from "../components/AnimeFull";

function Favourites() {
  const wishlist = useAnimeStore(state => state.wishlist);

  return (
    <div className="grid grid-cols-4 gap-5">
      {wishlist.length === 0 ? (
        <p>No anime in fav!</p>
      ) : (
        wishlist.map(anime => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))
      )}
    </div>
  )
}

export default Favourites;
