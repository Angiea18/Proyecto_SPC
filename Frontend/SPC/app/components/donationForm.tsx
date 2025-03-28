import { useState } from "react";

export default function DonationForm({ name }: { name: string }) {
  const [formData, setFormData] = useState({
    name: name || "",
    amount: "",
    date: new Date().toLocaleDateString("en-CA"),
    paymentMethod: "",
    currency: "USD",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de la donación:", formData);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 pt-4">
        <div className="card w-full max-w-3xl bg-white shadow-lg p-8">
          <div className="w-full lg:w-2/3 flex flex-col justify-center p-8" />
          <h2 className="text-3xl font-bold text-center text-[#002847] mb-8 font-[Be Vietnam Pro]">
            Realiza una donación
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-1"
                >
                  Nombres
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="paymentMethod"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-1"
                >
                  Medio de la donación
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  className="select select-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black"
                >
                  <option value="">Seleccione un medio</option>
                  <option value="PSE">PSE</option>
                  <option value="tarjeta">Tarjeta Débito/Crédito</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="amount"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-1"
                >
                  Monto
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  min="1"
                  className="input input-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
                 [&::-moz-number-spin-box]:hidden"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="currency"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-1"
                >
                  Moneda
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                  className="select select-bordered w-full mt-1 border-black bg-transparent placeholder-black text-black"
                >
                  <option value="USD">USD</option>
                  <option value="COP">COP</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="date"
                  className="text-black font-normal font-[Be Vietnam Pro] mb-1"
                >
                  Fecha
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full mt-1 border-black bg-white placeholder-black text-black"
                  style={{
                    colorScheme: "light",
                    WebkitAppearance: "none",
                    appearance: "none",
                    paddingRight: "10px",
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="btn bg-[#EB704B] border-none shadow-none w-1/2 text-white font-bold font-[Be Vietnam Pro] mx-auto"
              >
                Donar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
