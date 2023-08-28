const addButton = document.querySelector("#add");
const notesContainer = document.querySelector("#notes-container"); // Added a container for notes

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];

  textAreaData.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="operation">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}">${text}</div>
    <textarea class="${text ? "hidden" : ""}">${text}</textarea>
  `;

  note.innerHTML = htmlData;

  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  delButton.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (event) => {
    const value = event.target.value;
    mainDiv.textContent = value;
    updateLSData();
  });

  notesContainer.appendChild(note);
};

const notes = JSON.parse(localStorage.getItem("notes")) || [];

notes.forEach((noteText) => addNewNote(noteText));

addButton.addEventListener("click", () => addNewNote());

