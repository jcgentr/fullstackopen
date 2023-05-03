import { useState } from "react";
import { notesService } from "../services/notes";

export const NoteForm = (props) => {
  const [newNote, setNewNote] = useState("");

  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: false,
    };
    try {
      const returnedNote = await notesService.create(noteObject);
      props.setNotes((prevNotes) => prevNotes.concat(returnedNote));
      props.setToastMessage({
        type: "success",
        message: "New note created successfully",
      });
      setTimeout(() => props.setToastMessage(null), 5000);
      setNewNote("");
      props.hideForm();
    } catch (exception) {
      console.error(exception);
      props.setToastMessage({
        type: "error",
        message: "Could not create new note",
      });
      setTimeout(() => props.setToastMessage(null), 5000);
    }
  };

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input
          id="newNoteInput"
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="write note content here"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
