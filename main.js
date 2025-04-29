function saveNote() {
  const input = document.getElementById('noteInput').value;
  if (input.trim()) {
    let notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.push(input);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    document.getElementById('noteInput').value = '';
  }
}

function displayNotes() {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  const list = document.getElementById('notesList');
  list.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note;
    list.appendChild(li);
  });
}

function displayFileNotes(filter = "") {
  const fileNotes = [
    { title: "Belajar HTML", file: "notes/html.html" },
    { title: "Dasar JavaScript", file: "notes/javascript.html" },
    { title: "Catatan Git", file: "notes/git.html" }
  ];

  const list = document.getElementById('fileNotesList');
  list.innerHTML = '';
  fileNotes
    .filter(note => note.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach(note => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = note.file;
      link.textContent = note.title;
      link.target = "_blank";
      li.appendChild(link);
      list.appendChild(li);
    });
}

document.getElementById('search').addEventListener('input', (e) => {
  displayFileNotes(e.target.value);
});

window.onload = function () {
  displayNotes();
  displayFileNotes();
};
