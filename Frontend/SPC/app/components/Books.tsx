import { useState } from "react";

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const books = [
    {
      id: 1,
      title: "Entre cuento y cuento",
      author: "Secretos para contar",
      image: "/portadas/cuentosypasatiempos.png",
    },
    {
      id: 2,
      title: "Entre cuento y cuento",
      author: "Secretos para contar",
      image: "/portadas/entrecuentoycuento.png",
    },
    {
      id: 3,
      title: "Érase una vez en Colombia",
      author: "Secretos para contar",
      image: "/portadas/eraseunavezenColombia.png",
    },
  ];

  return (
    <div className="bg-white min-h-screen w-full px-5 pt-24 overflow-x-hidden">
      {/* Formulario de búsqueda */}
      <form
        onSubmit={handleSearchSubmit}
        className="w-full max-w-4xl mx-auto flex flex-col items-center mb-6"
      >
        <div className="w-full mb-4">
          <label className="input input-bordered w-full flex items-center bg-transparent border border-black">
            <svg
              className="h-6 opacity-50 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </g>
            </svg>
            <input
              type="search"
              placeholder="Título, Autor o ISBN"
              className="input w-full bg-white border-none text-black"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </label>
        </div>

        {/* Filtros y orden */}
        <div className="flex justify-end w-full gap-4 mb-4">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-white text-black border border-black"
            >
              Filtrar
            </div>
            <ul className="dropdown-content menu bg-white text-black rounded-box z-10 w-52 p-2 shadow-sm border border-black">
              <li className="hover:bg-gray-100 hover:shadow-md transition duration-200">
                <a>PDF</a>
             </li>
              <li className="hover:bg-gray-100 hover:shadow-md transition duration-200">
                <a>Audiolibro</a>
             </li>
              <li className="hover:bg-gray-100 hover:shadow-md transition duration-200">
                <a>Video</a>
              </li>
             </ul>

          </div>

          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-white text-black border border-black"
            >
              Ordenar
            </div>
            <ul className="dropdown-content menu bg-white text-black rounded-box z-10 w-52 p-2 shadow-sm border border-black">
              <li className="hover:bg-gray-100 hover:shadow-md transition duration-200">
              <a>Más reciente</a>
              </li>
              <li className="hover:bg-gray-100 hover:shadow-md transition duration-200">
              <a>Más antiguo</a>
              </li>
              <li className="hover:bg-gray-100 hover:shadow-md transition duration-200">
              <a>Título (A-Z)</a>
              </li>
              <li className="hover:bg-gray-100 hover:shadow-md transition duration-200">
              <a>Título (Z-A)</a>
              </li> <li className="hover:bg-gray-100 hover:shadow-md transition duration-200">
              <a>Autor (A-Z)</a>
              </li> <li className="hover:bg-gray-100 hover:shadow-md transition duration-200">
              <a>Autor (Z-A)</a>
              </li>
            </ul>
          </div>
        </div>
      </form>

      {/* Tarjetas de libros */}
      <div className="flex flex-wrap justify-center gap-6 pb-10">
        {books.map((book) => (
          <div
            key={book.id}
            className="card bg-white w-80 text-black font-bold border border-black"
          >
            <figure className="px-10 pt-10">
              <img src={book.image} alt="BookCover" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center text-black">
              <h2 className="card-title">{book.title}</h2>
              <p>Autor: {book.author}</p>
              <div className="card-actions">
                <a
                    href="/DetailsBook"
                    className="btn btn-secondary bg-[#FA4616] px-6 py-2 text-white font-bold rounded-md border-none outline-none hover:bg-[#d63c10]"
                 >
                  Ver más
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




