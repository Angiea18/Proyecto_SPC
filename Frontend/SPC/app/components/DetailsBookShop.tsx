export default function DetailsBookShop() {
  const book = {
    id: 1,
    title: "Cuentos y pasatiempos",
    author: "Varios autores",
    image: "/portadas/cuentosypasatiempos.png",
  };

  return (
    <div className="bg-white min-h-screen pt-20 pb-10 flex flex-col items-center px-5 pt-24 overflow-x-hidden">
      <div className="card bg-white w-80 text-black font-bold border border-black">
        <figure className="px-10 pt-10">
          <img src={book.image} alt="BookCover" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center text-black">
          <h2 className="card-title">{book.title}</h2>
          <p>Autor: {book.author}</p>
        </div>
      </div>

      <div className="pt-10 pb-10 text-center w-4/5">
        <h1 className="text-4xl font-bold text-[#002847] font-[Be Vietnam Pro] mb-4">
          Cuentos y pasatiempos
        </h1>
        <p className="py-2 font-normal text-[#002847] font-bold">
          <strong>Cuentos y pasatiempos</strong> es un recorrido literario por las relaciones interpersonales. Cuentos y poemas sobre la pareja, la paternidad y la maternidad, los hermanos, las abuelas, los amigos y los vecinos. Un libro ideal para la lectura de los niños, donde los textos, además de ofrecer lindas reflexiones sobre las relaciones que tejemos con los otros, nos entretienen con historias divertidas y conmovedoras.
        </p>
        <p className="py-0 font-normal text-[#002847] font-bold mb-6">
          Si quieres una accesoria personalizada, ingresa a Whatsapp.
        </p>
      </div>
    </div>
  );
}
