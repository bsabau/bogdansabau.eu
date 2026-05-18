const openBtn   = document.getElementById('open-contact');
const closeBtn  = document.getElementById('close-contact');
const scrim     = document.getElementById('scrim');
const sheet     = document.getElementById('sheet');
const form      = document.getElementById('contact-form');
const sendBtn   = document.getElementById('send-btn');
const formError = document.getElementById('form-error');
const toast     = document.getElementById('toast');

let toastTimer;

function openSheet() {
  sheet.classList.add('open');
  scrim.classList.add('open');
  document.body.style.overflow = 'hidden';
  formError.classList.remove('show');
  setTimeout(() => document.getElementById('f-name').focus(), 420);
}

function closeSheet() {
  sheet.classList.remove('open');
  scrim.classList.remove('open');
  document.body.style.overflow = '';
  openBtn.focus();
}

function showToast() {
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

openBtn.addEventListener('click', openSheet);
closeBtn.addEventListener('click', closeSheet);
scrim.addEventListener('click', closeSheet);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sheet.classList.contains('open')) closeSheet();
});

// Keep keyboard focus inside the sheet while it is open
sheet.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab' || !sheet.classList.contains('open')) return;
  const focusable = sheet.querySelectorAll(
    'button, input:not([tabindex="-1"]), textarea, a[href]'
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formError.classList.remove('show');
  sendBtn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/xaqknqqe', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.reset();
      closeSheet();
      showToast();
    } else {
      throw new Error('server error');
    }
  } catch {
    formError.classList.add('show');
  } finally {
    sendBtn.disabled = false;
  }
});
