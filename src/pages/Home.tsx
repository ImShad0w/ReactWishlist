import Trending from "../components/Trending.tsx";
import Upcoming from "../components/Upcoming.tsx";

function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-20">Top Anime</h1>
      <Trending />
      <h1 className="text-4xl font-bold mt-20">Upcoming Anime</h1>
      <Upcoming />
    </div>
  )
}

export default Home;
