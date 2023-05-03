import { useState, useEffect, useRef } from "react";
import { Footer } from "./components/Footer";
import { LoginForm } from "./components/LoginForm";
import { Note } from "./components/Note";
import { NoteForm } from "./components/NoteForm";
import { Notification } from "./components/Notification";
import { Toggleable } from "./components/Toggleable";
import { notesService } from "./services/notes";

const App = () => {
  const noteFormRef = useRef();
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [user, setUser] = useState(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInNoteAppUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      notesService.setToken(user.token);
      return user;
    } else {
      return null;
    }
  });

  useEffect(() => {
    notesService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInNoteAppUser");
    setUser(null);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    notesService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        console.log(error);
        setToastMessage({
          type: "error",
          message: `Note '${note.content}' was already removed from server`,
        });
        setTimeout(() => {
          setToastMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const deleteNote = async (noteId) => {
    const result = window.confirm("Are you sure you want to delete this note?");
    if (result) {
      // user clicked OK
      try {
        const respData = await notesService.remove(noteId);
        setToastMessage({
          type: "success",
          message: `Note '${noteId}' successfully deleted`,
        });
        setTimeout(() => {
          setToastMessage(null);
        }, 5000);
        console.log(respData);
        setNotes(notes.filter((n) => n.id !== noteId));
      } catch (exception) {
        setToastMessage({
          type: "error",
          message: `Note '${noteId}' could not be deleted`,
        });
        setTimeout(() => {
          setToastMessage(null);
        }, 5000);
      }
    } else {
      // user clicked Cancel
      // do nothing
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification toastMessage={toastMessage} />

      {!user && (
        <Toggleable buttonLabel="log in">
          <LoginForm setUser={setUser} setToastMessage={setToastMessage} />
        </Toggleable>
      )}
      {user && (
        <div>
          <p>
            <strong>{user.name}</strong> logged in{" "}
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Toggleable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm
              setNotes={setNotes}
              setToastMessage={setToastMessage}
              hideForm={() => noteFormRef.current.toggleVisibility()}
            />
          </Toggleable>
        </div>
      )}

      <h2>Notes</h2>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={deleteNote}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
