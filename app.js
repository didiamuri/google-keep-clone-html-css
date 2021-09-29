class Note {
  constructor(id, title, text) {
    this.id = id;
    this.title = title;
    this.text = text;
  }
}

class App {
  constructor() {
    this.notes = [];

    this.$inactiveForm = document.querySelector(".inactive-form");
    this.$activeForm = document.querySelector(".active-form");
    this.$activeForm.style.display = "none";
    this.$noteTitle = document.querySelector(".note-title");
    this.$noteText = document.querySelector("#note-text");
    this.$notes = document.querySelector(".notes");
    this.$modal = document.querySelector(".modal");
    this.$modalCloseButton = document.querySelector(".modal-close");
    this.$modalTitle = document.querySelector(".modal-title");
    this.$modalText = document.querySelector(".modal-text");
    this.selectedNoteId = null;

    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
      this.openModal(event);

      const $selectedNote = document.getElementsByClassName("delete");
      if ($selectedNote)
        for (var i = 0; i < $selectedNote.length; i++) {
          $selectedNote[i].addEventListener("click", (e) => {
            this.deleteNote(e.target.id);
          });
        }
    });

    this.$activeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;
      if (title || text) this.addNote(cuid(), title, text);
      this.closeForm();
    });

    this.$modalCloseButton.addEventListener("click", (e) => {
      this.closeModal(e);
    });
  }

  handleFormClick(event) {
    const isInactiveFormClickedOn = this.$inactiveForm.contains(event.target);
    const activeFormClickedOn = this.$activeForm.contains(event.target);
    const title = this.$noteTitle.value;
    const text = this.$noteText.value;

    if (isInactiveFormClickedOn) {
      this.openForm();
    } else if (!activeFormClickedOn && !isInactiveFormClickedOn) {
      // this.addNote(cuid(), title, text);
      this.closeForm();
    }
  }

  openModal(event) {
    const $selectedNote = event.target.closest(".note-items");
    if ($selectedNote) {
      this.$modal.classList.add("open-modal");
      this.selectedNoteId = $selectedNote.parentNode.id;
      this.$modalTitle.value = $selectedNote.children[1].innerHTML;
      this.$modalText.value = $selectedNote.children[2].innerHTML;
    }
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.renderNotes();
  }

  openForm() {
    this.$activeForm.style.display = "block";
    this.$inactiveForm.style.display = "none";
    this.$noteText.focus();
  }

  closeForm() {
    this.$activeForm.style.display = "none";
    this.$inactiveForm.style.display = "block";
    this.$noteTitle.value = "";
    this.$noteText.value = "";
  }

  closeModal(e) {
    e.preventDefault();
    this.editNote(
      this.selectedNoteId,
      this.$modalTitle.value,
      this.$modalText.value
    );
    this.$modal.classList.toggle("open-modal");
  }

  addNote(id, title, text) {
    const newNote = new Note(id, title, text);
    this.notes = [...this.notes, newNote];
    this.renderNotes();
  }

  editNote(id, title, text) {
    this.notes.map((note) => {
      if (note.id === id) {
        note.title = title;
        note.text = text;
      }
      return note;
    });
    this.renderNotes();
  }

  renderNotes() {
    this.$notes.innerHTML = this.notes
      .map((note) => {
        return `<div class="note" id="${note.id}">
        <div class="note-items">
        <span class="material-icons check-circle">check_circle</span>
        <div class="title">${note.title}</div>
        <div class="text">${note.text}</div>
        </div>
        <div class="note-footer">
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon"
              >add_alert</span
            >
            <span class="tooltip-text">Remind me</span>
          </div>
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon"
              >person_add</span
            >
            <span class="tooltip-text">Collaborator</span>
          </div>
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon"
              >palette</span
            >
            <span class="tooltip-text">Change Color</span>
          </div>
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon"
              >image</span
            >
            <span class="tooltip-text">Add Image</span>
          </div>
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon delete" id="${note.id}">archive</span>
            <span class="tooltip-text">Archive</span>
          </div>
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon"
              >more_vert</span
            >
            <span class="tooltip-text">More</span>
          </div>
        </div>
      </div>`;
      })
      .join("");
  }
}

const app = new App();
