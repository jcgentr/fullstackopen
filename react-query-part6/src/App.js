import { useMutation, useQuery, useQueryClient } from "react-query";
import { Counter } from "./components/Counter";
import { createNote, getNotes, updateNote } from "./requests";

export const App = () => {
  const queryClient = useQueryClient();
  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData("notes");
      queryClient.setQueryData("notes", notes.concat(newNote));
    },
  });
  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });
  const result = useQuery("notes", getNotes, {
    refetchOnWindowFocus: false,
  });
  console.log(result);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const notes = result.data;

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    newNoteMutation.mutate({ content, important: true });
  };

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? "important" : ""}</strong>
        </li>
      ))}
      <Counter />
    </div>
  );
};
