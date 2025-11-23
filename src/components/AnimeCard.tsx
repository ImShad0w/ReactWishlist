import { type Anime } from "@tutkli/jikan-ts";
import { type ReactNode } from "react";
//Defined props
interface AnimeCardProps {
  anime: Anime;
  children?: ReactNode;
  onSeeMore?: () => void;
}

export default function AnimeCard({ anime, children, onSeeMore }: AnimeCardProps) {

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-4 rounded-xl shadow-sm gap-2">
      <p className="mt-2 font-semibold text-xl text-center overflow-auto max-h-8">{anime.title}</p>
      <img src={anime.images.jpg.large_image_url} alt={anime.title} className="w-8/12 h-10/12 rounded-lg" />
      <div className="grid grid-cols-2 gap-4 mt-5">
        <button className="bg-cyan-200 p-4 rounded-lg" onClick={onSeeMore}>See more</button>
        {children}
      </div>
    </div>
  )
}
