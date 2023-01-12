export const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person)}>delete</button>
        </li>
      ))}
    </ul>
  );
};
