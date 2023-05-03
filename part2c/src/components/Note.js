export const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      <strong>{note.user ? note.user.name : "unknown"}:</strong>{" "}
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={() => deleteNote(note.id)}>remove</button>
    </li>
  );
};
