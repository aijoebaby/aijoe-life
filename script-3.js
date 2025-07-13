
/* AIJOE script.js - updated with music button support and generic button wiring
   Existing functionality (text input, speech recognition) is preserved.
   NEW: click the button with id="musicBtn" to open an inline YouTube Music player overlay.
   No other visual changes are made to the page.
*/

function sendText() {
  const input = document.getElementById('textInput').value;
  document.getElementById('response').innerText = "AIJOE heard: " + input;
}

// Voice recognition for the microphone button
if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  document.getElementById('micBtn').addEventListener('click', () => {
    const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    rec.lang = 'en-US';
    rec.start();

    rec.onresult = (e) =>
      (document.getElementById('response').innerText =
        "AIJOE heard: " + e.results[0][0].transcript);

    rec.onerror = (e) =>
      (document.getElementById('response').innerText = "Voice error: " + e.error);
  });
}

// -------  NEW MUSIC FEATURE  ---------
window.addEventListener('DOMContentLoaded', () => {
  const musicBtn = document.getElementById('musicBtn');
  if (!musicBtn) return; // If the page has no music button, do nothing

  musicBtn.addEventListener('click', () => {
    // If an overlay already exists, toggle it
    let overlay = document.getElementById('musicOverlay');
    if (overlay) {
      overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
      return;
    }

    // Otherwise, build the overlay with an embedded YouTube Music playlist
    overlay = document.createElement('div');
    overlay.id = 'musicOverlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      width: '320px',
      height: '180px',
      zIndex: 10000,
      backgroundColor: '#000',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 10px rgba(0,0,0,.3)',
    });

    const iframe = document.createElement('iframe');
    // Replace the playlist ID below with your own if you like!
    iframe.src =
      'https://www.youtube.com/embed/videoseries?list=PLFgquLnL59amLtk5wGLwUuY8lG4IzuUyC&autoplay=1';
    iframe.width = '320';
    iframe.height = '180';
    iframe.allow = 'autoplay';
    iframe.loading = 'lazy';
    iframe.style.border = 'none';

    overlay.appendChild(iframe);
    document.body.appendChild(overlay);
  });
});

// -------  OPTIONAL: FALLBACK CLICK HANDLERS  ---------
// This will put a "Working on <action>" message in #response for any
// button that has a data-ai-action="<name>" attribute.
// Handy if some buttons don't have handlers yet.
document.querySelectorAll('[data-ai-action]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const action = btn.getAttribute('data-ai-action');
    const out = document.getElementById('response');
    if (out) out.innerText = `Working on ${action}... (feature coming soon!)`;
  });
});
