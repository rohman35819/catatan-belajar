import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://mryladbndilbpgkfdtzl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yeWxhZGJuZGlsYnBna2ZkdHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDM0OTgsImV4cCI6MjA2MTUxOTQ5OH0.A9Y394QEdbpMzrWvQ-TtGbPVcQG9WFKc8vN4AV48Tsc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function loadSavedNotes() {
  const list = document.getElementById('savedNotesList');
  list.innerHTML = '';

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    list.innerHTML = '<li>Gagal memuat catatan.</li>';
    return;
  }

  data.forEach(note => {
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${note.title || '(Tanpa Judul)'}</h3>
      <p>${note.content || ''}</p>
      <div class="options-menu" onclick="toggleOptions(this)">⋮</div>
      <div class="options-dropdown">
        <button onclick="editNote('${note.id}')">Edit</button>
        <button onclick="deleteNote('${note.id}', this)">Hapus</button>
         <button onclick="copyNote('${note.id}', this)">Copy</button>
      </div>
    `;
    list.appendChild(li);
  });
}

window.toggleOptions = function(el) {
  const dropdown = el.nextElementSibling;
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

window.deleteNote = async function(id, btn) {
  const confirmDelete = confirm('Yakin ingin menghapus catatan ini?');
  if (!confirmDelete) return;

  const { error } = await supabase.from('notes').delete().eq('id', id);
  if (!error) {
    btn.closest('li').remove();
  }
}

window.editNote = function(id) {
  alert('Fitur edit masih dalam pengembangan untuk ID: ' + id);
}

window.copyNote= function(id) {
    alert('Fitur edit masih dalam pengembangan untuk ID: ' + id);
  }

loadSavedNotes();
