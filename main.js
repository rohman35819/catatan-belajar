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
    notes.forEach((note, index) => {
      const li = document.createElement('li');
      li.innerText = note;
      list.appendChild(li);
    });
  }
  
  window.onload = displayNotes;
  