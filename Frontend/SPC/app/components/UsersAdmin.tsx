import { useEffect, useState } from "react";
import { getUser, updateUser, toggleEnabled } from "../services/UserService";
import { User } from "../interfaces/UserInterface";

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchDocument, setSearchDocument] = useState<number | "">("");
  const [userFound, setUserFound] = useState<User | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await getUser();
        setUsers(usersData);
      } catch (error) {
        console.error("Error al cargar datos", error);
      }
    };

    loadData();
  }, []);

  const searchUser = () => {
    const user = users.find(
      (user) =>
        user.correo === searchEmail && user.documento === Number(searchDocument)
    );
    if (user) {
      setUserFound(user);
    } else {
      alert("Usuario no encontrado.");
      setUserFound(null);
    }
  };

  const handleUpdateUser = async (newType: User["tipoUsuario"]) => {
    if (!userFound) return;

    try {
      await updateUser(userFound.id, newType);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userFound.id ? { ...user, tipoUsuario: newType } : user
        )
      );
      setUserFound({ ...userFound, tipoUsuario: newType });
    } catch (error) {
      console.error("Error while updating user", error);
    }
  };

  const handleToggleEnabled = async () => {
    if (!userFound) return;

    try {
      await toggleEnabled(userFound.id, !userFound.habilitado);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userFound.id
            ? { ...user, habilitado: !user.habilitado }
            : user
        )
      );
      setUserFound({
        ...userFound,
        habilitado: !userFound.habilitado,
      });
    } catch (error) {
      console.error("Error while changing user status", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg">
      <h3 className="text-2xl font-bold text-[#002847] mb-4">
        Gestionar usuarios
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border border-[#002847] text-[#002847] placeholder-[#002847] bg-white p-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Número de Documento"
          value={searchDocument}
          onChange={(e) =>
            setSearchDocument(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          className="border border-[#002847] text-[#002847] placeholder-[#002847] bg-white p-2 rounded-md"
        />
      </div>

      <button
        className="bg-[#002847] text-white px-4 py-2 rounded mb-6"
        onClick={searchUser}
      >
        Buscar Usuario
      </button>

      {userFound && (
        <div className="border  p-4 rounded-md mb-4 text-black">
          <p>Correo: {userFound.correo}</p>
          <p>Documento: {userFound.documento}</p>
          <p>Tipo de Usuario: {userFound.tipoUsuario}</p>
          <p
            className={userFound.habilitado ? "text-green-600" : "text-red-600"}
          >
            {userFound.habilitado ? "Habilitado" : "Bloqueado"}
          </p>

          <select
            className="border p-2 rounded-md bg-white text-[#002847]"
            value={userFound.tipoUsuario}
            onChange={(e) =>
              handleUpdateUser(e.target.value as User["tipoUsuario"])
            }
          >
            <option value="Estudiante">Estudiante</option>
            <option value="Docente">Docente</option>
            <option value="Administrador/Fundación">
              Administrador/Fundación
            </option>
            <option value="Otro/Externo">Otro/Externo</option>
          </select>

          <button
            className={`mt-4 px-4 py-2 rounded text-white ${
              userFound.habilitado ? "bg-red-600" : "bg-green-600"
            }`}
            onClick={handleToggleEnabled}
          >
            {userFound.habilitado ? "🔒 Bloquear" : "🔓 Desbloquear"}
          </button>
        </div>
      )}
    </div>
  );
}
