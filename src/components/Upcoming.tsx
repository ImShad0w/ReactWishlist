import { useState, useEffect } from "react";
import { type Anime, TopClient } from "@tutkli/jikan-ts";
import AnimeCard from "./AnimeCard";
import AnimeFull from "./AnimeFull";

export default function Upcoming() {

  const [upcoming, setUpcoming] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currAnime, setCurrAnime] = useState<Anime | null>(null);

  function HandleRender() {
    if (loading) {
      return <p className="text-gray-400 mt-20 text-2xl">Loading...</p>
    }

    if (upcoming.length === 0) {
      return <p className="text-gray-400 mt-20 text-3xl">No animes found!</p>
    }
    return (
      <div className="grid grid-cols-4 gap-5 mt-20 w-10/12">
        {upcoming.map(anime => {
          return (
            <AnimeCard key={anime.mal_id} anime={anime} onSeeMore={() => setCurrAnime(anime)}>
              <button className="bg-purple-300 p-2 rounded-lg w-full">Add</button>
            </AnimeCard>
          )
        })}
      </div>
    );
  }

  //Only makes 1 API call and renders once
  useEffect(() => {
    (async function getTrending() {
      setLoading(true);
      try {
        const client = new TopClient();
        const response = await client.getTopAnime({
          type: "TV",
          filter: "upcoming",
        });
        setUpcoming(response.data.splice(0, 8));
      } catch (err: any) {
        console.log("An error occured", err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [])

  return (
    <div>
      {currAnime ? (
        <AnimeFull anime={currAnime} onBack={() => setCurrAnime(null)} />
      ) : (
        <div className="flex flex-col items-center">
          <HandleRender />
        </div>
      )}
    </div>
  )
}
