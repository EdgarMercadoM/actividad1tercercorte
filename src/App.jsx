import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";

function App() {
  const [lista, setLista] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await db.collection("usuarios").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLista(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  const agregarUsuario = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }
    try {
      await db.collection("usuarios").add({ nombre, email });
      setNombre("");
      setEmail("");
      actualizarLista();
    } catch (error) {
      console.log(error);
    }
  };

  const editarUsuario = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }
    try {
      await db.collection("usuarios").doc(id).update({ nombre, email });
      setModoEdicion(false);
      setNombre("");
      setEmail("");
      setId("");
      actualizarLista();
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await db.collection("usuarios").doc(id).delete();
      actualizarLista();
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarLista = async () => {
    const data = await db.collection("usuarios").get();
    const arrayData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLista(arrayData);
  };

  const activarEdicion = (usuario) => {
    setModoEdicion(true);
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setId(usuario.id);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">CRUD de Usuarios</h1>
      <div className="row">
        <div className="col-md-4">
          <h4 className="text-center">{modoEdicion ? "Editar Usuario" : "Agregar Usuario"}</h4>
          <form onSubmit={modoEdicion ? editarUsuario : agregarUsuario}>
            <input
              type="text"
              placeholder="Nombre"
              className="form-control mb-2"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-primary btn-block" type="submit">
              {modoEdicion ? "Editar" : "Agregar"}
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <h4 className="text-center">Lista de Usuarios</h4>
          <ul className="list-group">
            {lista.map((usuario) => (
              <li
                key={usuario.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {usuario.nombre} - {usuario.email}
                </span>
                <div>
                  <button className="btn btn-warning btn-sm mx-1" onClick={() => activarEdicion(usuario)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(usuario.id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

