import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  //States
  const [books, setBooks] = useState(null);
  const [createForm, setCreateForm] = useState({
    titulo: "",
    autor: "",
    genero1: "",
    genero2: "",
    genero3: "",
    resumen: "",
  });

  //useEffects
  useEffect(() => {
    fetchBooks();
  }, []);

  //Functions
  const deleteBook = async (_id) => {
    const res = await axios.delete("http://localhost:3000/libros/" + _id);

    const newBooks = [...books].filter((book) => {
      return book._id !== _id;
    });
    setBooks(newBooks);
  };

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:3000/libros");
    console.log(res);
    setBooks(res.data.libros);
    console.log(books);
  };

  const updateBook = async (_id, estado) => {
    if (estado === "Publicado") {
      const res = await axios.put("http://localhost:3000/libros/" + _id, {
        estado: "Acceso Restringido",
      });
      console.log(res);
      const newBooks = [...books];
      const bookIndex = books.findIndex((book) => {
        return book._id === _id;
      });
      newBooks[bookIndex] = res.data.libros;
      setBooks(newBooks);
      console.log(newBooks[bookIndex]);
    } else {
      const res = await axios.put("http://localhost:3000/libros/" + _id, {
        estado: "Publicado",
      });
      console.log(res);
      const newBooks = [...books];
      const bookIndex = books.findIndex((book) => {
        return book._id === _id;
      });
      newBooks[bookIndex] = res.data.libros;
      setBooks(newBooks);
      console.log(newBooks[bookIndex]);
    }
  };

  const createBook = async (e) => {
    e.preventDefault();
    if (createForm.autor !== "" && createForm.title !== "") {
      let listica = [];
      let listica2 = [];
      listica2.push(createForm.autor);
      if (createForm.genero1 !== "") {
        listica.push(createForm.genero1);
      }
      if (createForm.genero2 !== "") {
        listica.push(createForm.genero2);
      }
      if (createForm.genero3 !== "") {
        listica.push(createForm.genero3);
      }
      const sender = {
        autores: listica2,
        titulo: createForm.titulo,
        generos: listica,
        resumen: createForm.resumen,
        estado: "Publicado",
      };
      console.log(sender);

      const res = await axios.post("http://localhost:3000/libros", sender);
      setCreateForm({
        titulo: "",
        autor: "",
        genero1: "",
        genero2: "",
        genero3: "",
        resumen: "",
      });
      console.log(res);
      location.reload();
      //setBooks(...books, res.data.book);
    }
    console.log("das");
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
    console.log({ name, value });
  };

  return (
    <>
      <div>
        <h2> Libros:</h2>
        {books &&
          books.map((book) => {
            return (
              <div className="cajetin">
                <h2>Título: {book.titulo}</h2>
                <div>
                  {book.autores &&
                    book.autores.map((author) => {
                      return <h3>Autor: {author}</h3>;
                    })}
                  <h3>Generos: </h3>
                  <div className="generos">
                    {book.generos &&
                      book.generos.map((genero) => {
                        // console.log(book);
                        return <h4>{genero}</h4>;
                      })}
                  </div>
                  <h3>Estado: {book.estado}</h3>
                  <h3>Resumen: </h3>
                  <p> {book.resumen}</p>
                  <div className="boton-status">
                    <button
                      className="estado"
                      onClick={() => updateBook(book._id, book.estado)}
                    >
                      Cambiar estado
                    </button>
                    <button
                      className="borrar"
                      onClick={() => deleteBook(book._id)}
                    >
                      Eliminar Libro
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="creator">
          <h1>Crear un libro: </h1>
          <form className="creator-form" onSubmit={createBook}>
            <div className="input">
              <span> Nombre:</span>
              <input
                onChange={updateCreateFormField}
                value={createForm.titulo}
                name="titulo"
              />
            </div>
            <div className="input">
              <span> Autor:</span>
              <input
                value={createForm.autor}
                name="autor"
                onChange={updateCreateFormField}
              />
            </div>
            <div className="input">
              <span> Género:</span>
              <input
                onChange={updateCreateFormField}
                value={createForm.genero1}
                name="genero1"
              />
              <input
                onChange={updateCreateFormField}
                value={createForm.genero2}
                name="genero2"
              />
              <input
                onChange={updateCreateFormField}
                value={createForm.genero3}
                name="genero3"
              />
            </div>
            <div className="input">
              <span> Resumen:</span>
              <textarea
                onChange={updateCreateFormField}
                value={createForm.resumen}
                name="resumen"
              />
            </div>
            <div className="input">
              <button className="enviar" type="submit">
                Crear Libro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
