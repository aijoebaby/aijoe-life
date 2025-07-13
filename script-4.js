
* AIJOE script.js  — 2025‑07‑12
   --------------------------------
   1. Reliable microphone handling (id="micBtn" or data‑ai‑action="voice").
   2. Continuous listening toggle (click once to start, again to stop).
   3. Adds wake‑word “AIJOE” detection (very light regex check).
   4. Generic dispatcher for buttons marked data‑ai‑action="<action>".
   5. Music button overlay unchanged (id="musicBtn").
   -------------------------------- */

let rec      = null;      // SpeechRecognition instance
let listening = false;    // Is the mic currently active?

// Cross‑browser SpeechRecognition
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

// --- MICROPHONE SETUP ---
function startListening() {
  if (!SR) return updateResponse("SpeechRecognition not supported in this browser.");
  rec = new SR();
  rec.lang = 'en-US';
  rec.continuous = true;
  rec.interimResults = false;

  rec.onstart = () => updateResponse('🎙️ Listening… say “AIJOE …”');
  rec.onerror = (e) => updateResponse('Mic error: ' + e.error);
  rec.onend = () => { listening = false; updateMicIcon(); };

  rec.onresult = (e) => {
    const transcript = e.results[e.results.length - 1][0].transcript.trim();
    console.log('Heard:', transcript);
    handleSpeech(transcript);
  };
  rec.start();
  listening = true;
  updateMicIcon();
}

function stopListening() {
  if (rec) rec.stop();
  listening = false;
  updateMicIcon();
}

function toggleListening() {
  listening ? stopListening() : startListening();
}

function updateMicIcon() {
  const mic = document.querySelector('#micBtn, [data-ai-action="voice"]');
  if (!mic) return;
  mic.textContent = listening ? '🔴 Stop Listening' : '🎤 Talk to Joey';
}

// --- SPEECH HANDLER ---
function handleSpeech(text) {
  // very light wake‑word check
  const lowered = text.toLowerCase();
  if (!lowered.startsWith('aijoe')) {
    updateResponse("(No wake‑word) Heard: " + text);
    return;
  }
  const command = lowered.replace(/^aijoe\s*/, ''); // strip wake‑word
  if (!command) { updateResponse('👋 I’m here!'); return; }

  // basic intent parsing demo
  if (command.includes('music')) document.getElementById('musicBtn')?.click();
  else if (command.includes('joke')) updateResponse('Why did the painter fall?  He lacked proper *support*! 😄');
  else updateResponse('You said: ' + command + ' (feature coming soon)');
}

// --- GENERIC BUTTON DISPATCHER ---
function updateResponse(msg) {
  const r = document.getElementById('response');
  if (r) r.textContent = msg;
}

window.addEventListener('DOMContentLoaded', () => {
  // 1. Mic button wiring
  const mic = document.querySelector('#micBtn, [data-ai-action="voice"]');
  if (mic) {
    mic.addEventListener('click', toggleListening);
    updateMicIcon();
  }

  // 2. Music overlay (same as previous version)
  const musicBtn = document.getElementById('musicBtn');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      let overlay = document.getElementById('musicOverlay');
      if (overlay) { overlay.style.display = (overlay.style.display === 'none' ? 'block' : 'none'); return; }

      overlay = document.createElement('div');
      overlay.id = 'musicOverlay';
      Object.assign(overlay.style, {
        position:'fixed',bottom:'1rem',right:'1rem',width:'320px',height:'180px',
        background:'#000',borderRadius:'12px',overflow:'hidden',boxShadow:'0 4px 10px rgba(0,0,0,.3)',zIndex:10000
      });
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/videoseries?list=PLFgquLnL59amLtk5wGLwUuY8lG4IzuUyC&autoplay=1';
      iframe.width = '320'; iframe.height = '180'; iframe.allow='autoplay'; iframe.loading='lazy'; iframe.style.border='none';
      overlay.appendChild(iframe); document.body.appendChild(overlay);
    });
  }

  // 3. Catch‑all for other buttons
  document.querySelectorAll('[data-ai-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.aiAction;
      if (act === 'voice') return; // the mic already handled
      updateResponse('Working on ' + act + '… (feature coming soon!)');
    });
  });
});
