import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
    userType: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      return "Las contraseñas no coinciden";
    }
    if (!formData.termsAccepted) {
      return "Debes aceptar el tratamiento de datos personales";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    console.log("Usuario registrado:", formData);
    setError("");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 pt-4">
        <div className="card w-full max-w-3xl bg-white shadow-lg p-8">
          <div className="w-full lg:w-2/3 flex flex-col justify-center p-8" />
          <h2 className="text-3xl font-bold text-center text-[#002847] mb-8 font-[Be Vietnam Pro]">
            Crea tu cuenta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-0"
                >
                  Nombres
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-0"
                >
                  Apellidos
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="documentType"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-0"
                >
                  Tipo de documento
                </label>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  className="select select-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black"
                  required
                >
                  <option value="">Selecciona alguno</option>
                  <option value="cedula de ciudadania">CC</option>
                  <option value="registro civil">RC</option>
                  <option value="tarjeta de identidad">TI</option>
                  <option value="cedula de extranjeria">CE</option>
                  <option value="pasaporte">Pasaporte</option>
                  <option value="ppt">PPT</option>
                  <option value="nit">NIT</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="documentNumber"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-0"
                >
                  Número de documento
                </label>
                <input
                  type="text"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="userType"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-0"
                >
                  Tipo de usuario
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="select select-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black"
                  required
                >
                  <option value="">Selecciona alguno</option>
                  <option value="docente">Docente</option>
                  <option value="estudiante">Estudiante</option>
                  <option value="amisnistrador/fundacion">
                    Administrador/Fundación
                  </option>
                  <option value="otro/externo">Otro/Externo</option>
                </select>{" "}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-0"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-0"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-0"
                >
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="cursor-pointer flex items-center">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="checkbox-xl border-2 border-black rounded-sm mr-2 bg-white  accent-white"
                />
                <span className="ml-2 text-black font-normal font-[Be Vietnam Pro]">
                  Acepto el tratamiento de datos personales
                </span>
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="btn bg-[#EB704B] border-none shadow-none w-1/2 text-white font-bold font-[Be Vietnam Pro] mx-auto"
              >
                Registrarse
              </button>
            </div>

            <p className="text-sm text-[#002847] hover:underline text-center">
              ¿Ya tienes cuenta?{" "}
              <a
                href="/login"
                className="text-sm text-[#002847] hover:underline text-center underline"
              >
                Inicia sesión
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
