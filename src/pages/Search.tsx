import { useState } from "react";
import { JikanClient, type Anime } from "@tutkli/jikan-ts";
import AnimeCard from "../components/AnimeCard";
import AnimeFull from "../components/AnimeFull";

function Search() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentAnime, setCurrAnime] = useState<Anime | null>();

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
      return <p>Loading...</p>
    }

    if (results.length === 0) {
      return <p>No animes found!</p>
    }
    return (
      <div className="grid grid-cols-5 gap-5 p-5 mt-20">
        {results.map(anime => {
          return (
            <AnimeCard key={anime.mal_id} anime={anime} onSeeMore={() => setCurrAnime(anime)}>
              <button className="bg-purple-300 p-2 rounded-lg w-full">Add</button>
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
        <div>
          <div>
            <input type="text" value={query} onInput={handleInput} />
            <button onClick={() => queryAnime(query)}>Search</button>
          </div>
          <HandleRender />
        </div>
      )}
    </div>
  )
}

export default Search;
