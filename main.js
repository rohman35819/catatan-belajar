console.log("File JS berhasil dimuat");

document.addEventListener('DOMContentLoaded', () => {
  console.log("Halaman sudah dimuat dan JavaScript aktif");
});


// Inisialisasi Supabase
const { createClient } = supabase;
const supabaseClient = createClient('https://mryladbndilbpgkfdtzl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yeWxhZGJuZGlsYnBna2ZkdHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDM0OTgsImV4cCI6MjA2MTUxOTQ5OH0.A9Y394QEdbpMzrWvQ-TtGbPVcQG9WFKc8vN4AV48Tsc'
);


// Tampilkan dan sembunyikan menu samping
function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  menu.classList.toggle('hidden');
}

document.querySelector('.hamburger').addEventListener('click', function () {
  document.querySelector('.side-menu').classList.toggle('active');
});

// Ambil dan tampilkan catatan dari Supabase
async function displayNotes() {
  const list = document.getElementById('notesList');
  list.innerHTML = '';

  const { data, error } = await supabaseClient
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    list.innerHTML = '<li>Gagal memuat catatan.</li>';
    console.error('Supabase error:', error);
    return;
  }

  data.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note.content;
    list.appendChild(li);
  });
}

// Tampilkan daftar file catatan lokal/manual
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
      link.className = "note-link";
      link.target = "_blank";
      li.appendChild(link);
      list.appendChild(li);
    });
}

// Event listener untuk pencarian
document.addEventListener('DOMContentLoaded', () => {
  displayNotes();
  displayFileNotes();

  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      displayFileNotes(e.target.value);
    });
  }
});

window.toggleMenu = toggleMenu;
window.saveNote = saveNote;
