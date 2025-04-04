import { Link, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (Object.keys(parsedUser).length > 0) {
          setUser(parsedUser);
          setRole(parsedUser.role || "user");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setRole(null);
    navigate("/login");
  };
  // useEffect(() => {
  //   // setRole(sessionStorage.getItem("userRole"));
  //   setRole("admin");
  // }, []);

  return (
    <nav className="navbar bg-[#618EB4] px-6 h-24 shadow-md flex justify-between items-center fixed w-full z-50">
      <div className="navbar-start flex items-center">
        <Link to="/" className="flex items-center">
          <img src="\LogoSPC.png" alt="Logo" className="h-20 w-auto px-20" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex ml-[-350px]">
        <ul className="menu menu-horizontal px-1 text-white text-lg font-[Be Vietnam Pro] font-bold space-x-1">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="aboutUs">Nosotros</Link>
          </li>
          <li>
            <details>
              <summary>Biblioteca</summary>
              <ul className="p-2 bg-[#618EB4] text-white rounded-md font-[Be Vietnam Pro] font-bold">
                <li>
                  <Link
                   to="/listBooks">Libros</Link>
                </li>
                <li>
                  <Link to="#">Audiolibros</Link>
                </li>
                <li>
                  <Link to="#">Autores</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link to="/listBookShop">Tienda</Link>
          </li>
          {role === "admin" && (
            <li>
              <Link to="/admin" className="text-white px-4 py-2 rounded">
                Panel Admin
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end space-x-20">
        {!isLoading &&
          (user ? (
            <div className="relative">
              <button
                tabIndex={0}
                className="text-white flex items-center gap-2 text-lg font-[Be Vietnam Pro] font-bold"
              >
                <i className="fas fa-user-circle text-lg"></i>
                {user.name}
              </button>
              <ul className="absolute right-0 mt-2 w-48 bg-[#618EB4] text-white rounded-md shadow-lg">
                <button
                  className="p-2 w-full text-left hover:bg-[#4A769D] cursor-pointer"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white flex items-center gap-2 text-lg font-[Be Vietnam Pro] font-bold"
            >
              <i className="fas fa-user-circle text-lg"></i>
              Mi cuenta
            </Link>
          ))}
        <DarkModeToggle />
      </div>

      <div className="lg:hidden">
        <button
          tabIndex={0}
          className="btn btn-ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fas fa-bars text-white text-2xl"></i>
        </button>
        {isOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-[#618EB4] text-white rounded-md shadow-lg">
            <li className="p-2 hover:bg-[#4A769D]">
              <Link to="/">Inicio</Link>
            </li>
            <li className="p-2 hover:bg-[#4A769D]">
              <Link to="aboutUs">Nosotros</Link>
            </li>
            <li>
              <details>
                <summary>Biblioteca</summary>
                <ul className="p-2 bg-[#618EB4] text-white rounded-md font-[Be Vietnam Pro] font-bold">
                  <li>
                    <Link to="/listLibros">Libros</Link>
                  </li>
                  <li>
                    <Link to="#">Audiolibros</Link>
                  </li>
                  <li>
                    <Link to="#">Autores</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="p-2 hover:bg-[#4A769D]">
              <Link to="#">Tienda</Link>
            </li>
            {role === "admin" && (
              <li className="p-2 hover:bg-[#4A769D]">
                <Link to="/admin">Panel Admin</Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
