import { useState, useEffect } from "react";

import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import { Countries } from "./components/Countries";
import { personsService } from "./services/persons";
import { Notification } from "./components/Notification";

const defaultMessage = { text: "", status: null };

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(defaultMessage);

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      persons
        .map((person) => person.name.toLowerCase())
        .includes(newName.toLowerCase())
    ) {
      const existingPerson = persons.find(
        (p) => p.name.toLowerCase() === newName.toLowerCase()
      );
      if (
        existingPerson &&
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(existingPerson.id, { name: newName, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnedPerson
              )
            );
          })
          .catch((err) => {
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
            setMessage({
              text: `${existingPerson.name} has already been removed from the server 😭`,
              status: "error",
            });
            setTimeout(() => {
              setMessage(defaultMessage);
            }, 5000);
          });
        return;
      } else {
        return;
      }
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personsService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setMessage({
        text: `${returnedPerson.name} created successfully!`,
        status: "success",
      });
      setTimeout(() => {
        setMessage(defaultMessage);
      }, 5000);
    });
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(person.id).then((data) => {
        console.log(data);
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterText={filterText} setFilterText={setFilterText} />
      <h2>add a new number</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        newName={newName}
        setNewName={setNewName}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
      <Countries />
    </div>
  );
};

export default App;
