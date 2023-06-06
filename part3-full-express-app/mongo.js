const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const username = encodeURIComponent("jcgentr");
const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://${username}:${password}@fullstackopen.vnsvkfc.mongodb.net/testNoteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
// mongoose
//   .connect("mongodb://127.0.0.1:27017/myapp")
//   .then(() => console.log("connected"))
//   .catch((e) => console.log(e));
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: false,
});

note.save().then(() => {
  console.log("note saved!");
});

Note.find().then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
