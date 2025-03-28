export default function AboutUs() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 bg-[#FFFFFF]"></div>
        <div className="hero-content flex-col lg:flex-row">
          <div className="hero-content flex-col lg:flex-row">
            <div
              className=" min-h-[80vh] shadow-2xl"
              style={{
                backgroundImage: "url('/abUs.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center 50%",
                clipPath:
                  "polygon(0% 0%, 85% 0%, 100% 10%, 95% 30%, 100% 50%, 95% 70%, 100% 90%, 85% 100%, 0% 100%)",

                width: "600px",
                height: "600px",
              }}
            ></div>
            <div className="pt-5 pb-10">
              <h1 className="text-4xl font-bold text-[#002847] font-[Be Vietnam Pro] mb-4">
                Nuestra Biblioteca Digital
              </h1>
              <p className="py-2 font-normal text-[#002847] font-[Literata]">
                Somos la <strong>Biblioteca Digital</strong> de la{" "}
                <strong>Fundación Secretos para Contar</strong>, un espacio
                pensado para llevar el conocimiento a las familias del campo.
                Aquí encontrarás libros y recursos educativos gratuitos,
                diseñados para apoyar a docentes, estudiantes y comunidades
                rurales en su aprendizaje.
              </p>
              <p className="py-0 font-normal text-[#002847] font-[Literata] mb-6">
                A través de esta plataforma, seguimos fortaleciendo la misión de
                la Fundación Secretos para Contar: acercar la lectura y la
                educación a todos, sin importar la distancia, promoviendo el
                desarrollo y el acceso al conocimiento en las zonas rurales.
              </p>
              <div className="flex space-y-6">
                <button className="btn btn-primary bg-[#FA4616] text-white font-bold font-[Be Vietnam Pro] border-none hover:bg-[#d63c10]">
                  Biblioteca digital
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
