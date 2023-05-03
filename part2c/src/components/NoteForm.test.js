import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { NoteForm } from "./NoteForm";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const mockNote = {
    content: "still works",
    id: "64246e254be7be9cb694b5a2",
    important: false,
  };
  axios.post.mockResolvedValue(mockNote);
  const setNotes = jest.fn();
  const setToastMessage = jest.fn();
  const hideForm = jest.fn();
  const user = userEvent.setup();

  render(
    <NoteForm
      setNotes={setNotes}
      setToastMessage={setToastMessage}
      hideForm={hideForm}
    />
  );

  const input = screen.getByPlaceholderText("write note content here");
  const addButton = screen.getByText("Add");

  await user.type(input, "testing a form...");
  await user.click(addButton);

  expect(setToastMessage.mock.calls).toHaveLength(1);
  expect(setToastMessage.mock.calls[0][0].message).toBe(
    "New note created successfully"
  );
});
