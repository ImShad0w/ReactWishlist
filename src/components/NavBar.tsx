import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="flex items-center justify-between w-screen h-auto p-5 bg-gray-900">
      <h1 className="text-white text-3xl">Wishlist App</h1>
      <nav className="flex gap-5 list-none text-white text-3xl">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/favourites">Favourites</Link></li>
      </nav>
    </div>
  )
}

export default NavBar;
