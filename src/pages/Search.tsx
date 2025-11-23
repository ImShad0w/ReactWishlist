import { useState } from "react";
import { JikanClient, type Anime } from "@tutkli/jikan-ts";
import AnimeCard from "../components/AnimeCard";
import AnimeFull from "../components/AnimeFull";
import { useAnimeStore } from "../stores/animeStore";

function Search() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentAnime, setCurrAnime] = useState<Anime | null>();
  const addToWishlist = useAnimeStore(state => state.addToWishlist);
  const removeFromWishlist = useAnimeStore(state => state.removeFromWishlist);
  const isInWishlist = useAnimeStore(state => state.isInWishlist);
  const wishlist = useAnimeStore(state => state.wishlist);

  function handleInput(e: any) {
    setQuery(e.target.value)
  }

  async function queryAnime(query: string) {
    setLoading(true);

    try {
      const client = new JikanClient();
      const response = await client.anime.getAnimeSearch({
        q: query,
        sfw: true,
      })
      setResults(response.data);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  function HandleRender() {
    if (loading) {
      return <p className="text-gray-400 mt-20 text-2xl">Loading...</p>
    }

    if (results.length === 0) {
      return <p className="text-gray-400 mt-20 text-3xl">No animes found!</p>
    }
    return (
      <div className="grid grid-cols-5 gap-5 mt-20 w-10/12">
        {results.map(anime => {
          return (
            <AnimeCard key={anime.mal_id} anime={anime} onSeeMore={() => setCurrAnime(anime)}>
              {isInWishlist(anime.mal_id) ? <button className="bg-red-400 p-4 rounded-lg" onClick={() => removeFromWishlist(anime.mal_id)}>Remove</button> : <button className="bg-purple-400 p-4 rounded-lg" onClick={() => addToWishlist(anime)}>Add</button>}
            </AnimeCard>
          )
        })}
      </div>
    );
  }

  return (
    <div>
      {currentAnime ? (
        <AnimeFull anime={currentAnime} onBack={() => setCurrAnime(null)} />
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-gray-300 w-10/12 mt-20 h-20 p-5 rounded-xl grid grid-cols-[90%_10%]">
            <input className="text-2xl" type="text" value={query} onInput={handleInput} placeholder="Example: Gachiakuta" />
            <button className="bg-white rounded-lg" onClick={() => queryAnime(query)}>Search</button>
          </div>
          <HandleRender />
        </div>
      )}
    </div>
  )
}

export default Search;
