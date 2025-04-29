function displayNotes() {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  const list = document.getElementById('notesList');
  list.innerHTML = '';

  notes.forEach((note, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = note + " ";
    li.appendChild(span);

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const newNote = prompt("Edit catatan:", note);
      if (newNote !== null && newNote.trim()) {
        notes[index] = newNote;
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
      }
    };
    li.appendChild(editBtn);

    const delBtn = document.createElement('button');
    delBtn.textContent = "Hapus";
    delBtn.onclick = () => {
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
    };
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}
