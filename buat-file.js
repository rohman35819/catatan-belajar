import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Konfigurasi Supabase
const supabaseUrl = 'https://mryladbndilbpgkfdtzl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yeWxhZGJuZGlsYnBna2ZkdHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDM0OTgsImV4cCI6MjA2MTUxOTQ5OH0.A9Y394QEdbpMzrWvQ-TtGbPVcQG9WFKc8vN4AV48Tsc'; // tetap pakai anon key kamu
const supabase = createClient(supabaseUrl, supabaseKey);

// Fungsi toggle menu
function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  menu.classList.toggle('hidden');
}
window.toggleMenu = toggleMenu;

// Tunggu DOM siap
document.addEventListener('DOMContentLoaded', () => {
  const saveBtn = document.getElementById('saveBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveNote);
  }
});

// Fungsi simpan catatan
async function saveNote() {
  const title = document.getElementById('noteTitle').value.trim();
  const content = document.getElementById('noteContent').value.trim();

  if (!title && !content) {
    alert('Judul atau isi catatan tidak boleh kosong!');
    return;
  }

  const { error } = await supabase.from('notes').insert([{ title, content }]);

  if (error) {
    alert('Gagal menyimpan catatan: ' + error.message);
  } else {
    window.location.href = 'catatan-tersimpan.html';
  }
}
