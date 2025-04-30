const supabaseUrl = 'https://mryladbndilbpgkfdtzl.supabase.co';
const supabaseKey = '[eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yeWxhZGJuZGlsYnBna2ZkdHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDM0OTgsImV4cCI6MjA2MTUxOTQ5OH0.A9Y394QEdbpMzrWvQ-TtGbPVcQG9WFKc8vN4AV48Tsc]'; // Ganti dengan anon key dari Project API
const supabase = supabase.createClient(supabaseUrl, supabaseKey);


function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  menu.classList.toggle('hidden');
}

async function saveNote() {
  const input = document.getElementById('noteInput').value.trim();
  if (!input) return;

  const { error } = await supabase.from('notes').insert([{ content: input }]);
  if (error) {
    alert('Gagal menyimpan catatan: ' + error.message);
  } else {
    document.getElementById('noteInput').value = '';
    displayNotes();
  }
}

async function displayNotes() {
  const list = document.getElementById('notesList');
  list.innerHTML = '';

  const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
  if (error) {
    list.innerHTML = '<li>Gagal memuat catatan</li>';
    return;
  }

  data.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note.content;
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


// Simpan catatan ke Supabase
async function saveNote() {
  const input = document.getElementById('noteInput').value.trim();
  if (!input) return;

  const { error } = await supabase.from('notes').insert([{ content: input }]);
  if (error) {
    alert('Gagal menyimpan catatan: ' + error.message);
  } else {
    document.getElementById('noteInput').value = '';
    displayNotes();
  }
}

// Ambil dan tampilkan catatan dari Supabase
async function displayNotes() {
  const list = document.getElementById('notesList');
  list.innerHTML = '';

  const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });

  if (error) {
    list.innerHTML = '<li>Gagal memuat catatan</li>';
    return;
  }

  data.forEach(note => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = note.content;
    li.appendChild(span);

    const delBtn = document.createElement('button');
    delBtn.textContent = "Hapus";
    delBtn.onclick = async () => {
      await supabase.from('notes').delete().eq('id', note.id);
      displayNotes();
    };
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

// Tampilkan daftar file catatan (manual/hardcoded)
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

// Inisialisasi
document.getElementById('search').addEventListener('input', (e) => {
  displayFileNotes(e.target.value);
});

window.onload = function () {
  displayNotes();
  displayFileNotes();
};
