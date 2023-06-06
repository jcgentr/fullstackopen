const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const middleware = require("../utils/middleware");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user._id, // add userId to note
  });

  const savedNote = await note.save();

  // add new noteId to user's notes array
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  savedNote.user = { ...user };
  console.log(savedNote);

  response.status(201).json(savedNote);
});

notesRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    // is this user the owner of the note to be deleted
    const note = await Note.findById(request.params.id);
    if (note.user && note.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: "🚨 can only delete your own notes!" });
    }
    // delete note
    await Note.findByIdAndRemove(request.params.id);
    // delete note id from user's notes
    await User.updateOne({ _id: user._id }, { $pull: { notes: note._id } });
    response.status(204).end();
  }
);

notesRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
  });
  response.json(updatedNote);
});

module.exports = notesRouter;
