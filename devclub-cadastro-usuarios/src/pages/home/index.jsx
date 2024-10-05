import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";
import { useEffect, useState, useRef } from "react";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/users");
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post("/users", {
      email: inputEmail.current.value,
      name: inputName.current.value,
      age: inputAge.current.value,
    });

    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de Usuários</h1>
          <input name="name" type="text" placeholder="Name" ref={inputName} />
          <input name="age" type="number" placeholder="Age" ref={inputAge} />
          <input
            name="email"
            type="email"
            placeholder="Email"
            ref={inputEmail}
          />
          <button type="button" onClick={createUsers}>
            cadastrar
          </button>
        </form>

        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>
                Nome: <span>{user.name}</span>
              </p>
              <p>
                Idade: <span>{user.age}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
            </div>

            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
