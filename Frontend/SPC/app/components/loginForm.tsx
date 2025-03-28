import { useState } from "react";
import { Link } from "@remix-run/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (localStorage.getItem("username") === formData.email) {
      alert("usuaario correcto");
    } else {
      alert("usuario incorrecto");
    }
    console.log("Datos enviados:", formData);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 pt-24">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-white shadow-none rounded-lg overflow-hidden">
          <div className="w-full lg:w-2/3 flex flex-col justify-center p-8">
            <h2 className="text-3xl font-bold text-center text-black">
              Accede a tu cuenta
            </h2>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-[Be Vietnam Pro] font-normal text-black"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black"
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block font-[Be Vietnam Pro] font-normal text-black"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1 border-black bg-transparent placeholder-black pr-10 text-black"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-black"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      size="sm"
                    />
                  </button>
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="flex items-center text-sm text-black">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className=" checkbox-xl border-2 border-black rounded-sm mr-2 bg-white  accent-black "
                  />
                  Recordarme
                </label>
                <button
                  type="submit"
                  className="btn bg-[#EB704B] border-none shadow-none w-full text-white font-bold"
                >
                  Iniciar sesión
                </button>
                <Link
                  to="#"
                  className="text-sm text-[#002847] hover:underline text-center underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-2/3 h-[70vh] bg-[#EB704B] text-white flex flex-col items-center justify-center p-8">
            <h3 className="text-2xl font-bold font-[Be Vietnam Pro] text-center">
              ¿Aún no tienes cuenta?
            </h3>
            <p className="text-center font-[Be Vietnam Pro] mt-4">
              Únete y lleva la lectura más lejos.
            </p>
            <Link
              to="/register"
              className="btn btn-outline border-white text-white mt-6 font-bold font-[Be Vietnam Pro]  hover:bg-white hover:text-black"
            >
              Regístrate ahora
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
