import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
                    bg-white/10 backdrop-blur-md border border-white/20 
                    rounded-full shadow-xl px-10 py-3 w-[90%] max-w-4xl">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-white drop-shadow hover:text-white">
          CiviCode
        </Link>
        <div className="flex space-x-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-300 hover:text-cyan-300"
                : "text-white/80 hover:text-cyan-200 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/codes"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-300 hover:text-cyan-300"
                : "text-white/80 hover:text-cyan-200 transition"
            }
          >
            IS Codes
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-300"
                : "text-white/80 hover:text-cyan-200 transition"
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
