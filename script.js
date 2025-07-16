/******************************************************************
  AIJOE – voice + button logic  (replace entire script.js with this)
******************************************************************/

/* ---------- 1.  SPEECH SYNTHESIS (cheerful male) --------------- */
const synth   = window.speechSynthesis;
let   pickOne = null;          // will hold the chosen Voice object

function chooseVoice() {
  // Prefer Google US English male voices if they exist
  const all   = synth.getVoices();
  pickOne =
    all.find(v => /Wavenet-D|Neural2-D/i.test(v.name)) ||     // Pixel / Chrome desktop
    all.find(v => /Male/i.test(v.name) && v.lang.startsWith('en')) ||
    all.find(v => v.lang.startsWith('en')) ||                 // any English fallback
    null;
  console.log('[AIJOE] Selected voice:', pickOne ? pickOne.name : 'default');
}

chooseVoice();
synth.onvoiceschanged = chooseVoice;

function speak(text, pitch = 1.1, rate = 1.05) {
  try {
    const u   = new SpeechSynthesisUtterance(text);
    if (pickOne) u.voice = pickOne;
    u.pitch = pitch;
    u.rate  = rate;
    synth.speak(u);
  } catch (err) {
    console.error('Speech error:', err);
  }
}

/* ---------- 2.  BUTTON ACTIONS -------------------------------- */
document.getElementById('musicBtn').onclick = () => {
  window.open('https://www.youtube.com/watch?v=5qap5aO4i9A', '_blank');
  speak('Enjoy the music!');
};

document.getElementById('gpsBtn').onclick = () =>
  navigator.geolocation.getCurrentPosition(
    p => speak(`Latitude ${p.coords.latitude.toFixed(2)}, longitude ${p.coords.longitude.toFixed(2)}.`),
    () => speak('Sorry, location unavailable.')
  );

document.getElementById('weatherBtn').onclick = () =>
  speak('Weather feature coming soon!');

document.getElementById('showListBtn').onclick = () =>
  speak('List feature coming soon!');

document.getElementById('bibleBtn').onclick = () =>
  speak('Bible verse feature coming soon!');

document.getElementById('moodBtn').onclick = () =>
  speak('I feel great today!');

/* ---------- 3.  BASIC SPEECH-TO-TEXT -------------------------- */
const micBtn = document.getElementById('micBtn');
if (micBtn) {
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Rec) {
    micBtn.disabled = true;
    micBtn.textContent = '🎤 Unsupported on this browser';
  } else {
    micBtn.onclick = () => {
      const rec = new Rec();
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.start();
      document.getElementById('log').textContent = '🎙️ Listening…';

      rec.onresult = e => {
        const words = e.results[0][0].transcript.toLowerCase();
        document.getElementById('log').textContent = 'You: ' + words;
        /* very small command router */
        if (words.includes('music'))      document.getElementById('musicBtn').click();
        else if (words.includes('weather')) document.getElementById('weatherBtn').click();
        else if (words.includes('verse'))   document.getElementById('bibleBtn').click();
        else if (words.includes('mood'))    document.getElementById('moodBtn').click();
        else if (words.includes('location') || words.includes('where')) document.getElementById('gpsBtn').click();
        else speak('You said ' + words);
      };

      rec.onerror = err => {
        console.error('Speech-to-text error:', err);
        speak('Microphone error.');
        document.getElementById('log').textContent = 'Error: ' + err.error;
      };
    };
  }
}
 recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.onresult = (event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  if (command.includes("bible verse")) fetchBibleVerse();
  else if (command.includes("joke")) tellJoke();
  // ... (other commands)
};
document.getElementById('voiceButton').addEventListener('click', () => recognition.start());!DOCTYPE html>
<html lang="en">
<head>function fetchBibleVerse() {
  fetch('https://api.bible/verses/random') // Replace with real API key
    .then(response => response.json())
    .then(data => alert(data.verse || "Verse not available"))
    .catch(error => alert("Error fetching verse"));
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(
    position => alert(`Location: ${position.coords.latitude}, ${position.coords.longitude}`),
    error => alert("Location access denied")
  );
}
function callEmergency() {
  window.location.href = 'tel:911';
}
function playMusic() {
  alert("Music feature coming soon!");
}
function fetchWeather() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY') // Replace with real API key
    .then(response => response.json())
    .then(data => alert(`Weather: ${data.weather[0].description}`))
    .catch(error => alert("Error fetching weather"));
}
function trackMood() {
  alert("Mood tracking coming soon!");
}
function manageList() {
  alert("List feature coming soon!");
}
function askAI() {
  fetch('/api/askAI?query=Hello') // Calls Netlify function
    .then(response => response.json())
    .then(data => alert(data.response))
    .catch(error => alert("Error with AI"));
}
function tellJoke() {
  alert("Why did Joey bark? To be your AI hero!");
}
function fixSomething() {
  alert("Fix something feature coming soon!");
}
function findPlace() {
  alert("Find nearby place coming soon!");
}
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.onresult = (event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  if (command.includes("bible verse")) fetchBibleVerse();
  else if (command.includes("gps")) getLocation();
  else if (command.includes("emergency")) callEmergency();
  else if (command.includes("music")) playMusic();
  else if (command.includes("weather")) fetchWeather();
  else if (command.includes("mood")) trackMood();
  else if (command.includes("list")) manageList();
  else if (command.includes("ask ai")) askAI();
  else if (command.includes("joke")) tellJoke();
  else if (command.includes("fix something")) fixSomething();
  else if (command.includes("find place")) findPlace();
  else alert("Command not recognized: " + command);
};
document.getElementById('voiceButton').addEventListener('click', () => recognition.start());  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>AIJOE – Voice Dog Assistant</title>

  <style>
    /* basic styling (you can move this to style.css later) */
    body{
      margin:0;
      font-family:Arial,Helvetica,sans-serif;
      background:url('joey-bg.png') center/cover fixed no-repeat;
      color:#fff;
      display:flex;
      flex-direction:column;
      min-height:100vh;
      text-align:center;
    }
    .download-line{
      position:fixed;top:0;left:0;width:100%;
      background:#156afe;padding:10px 18px;box-sizing:border-box;text-align:right;
    }
    .download-line a{color:#fff;font-weight:bold;text-decoration:none}
    .panel{
      background:rgba(13,17,23,.78);
      padding:20px;border-radius:16px;margin:auto;
      width:90%;max-width:420px;margin-top:60px
    }
    button{
      background:#1e90ff;border:none;border-radius:12px;
      color:#fff;font-size:1em;padding:10px 16px;margin:6px;width:46%
    }
    #log{margin-top:12px;min-height:18px;color:#ffd}
  </style>
</head>
<body>

  <!-- blue download bar -->
  <div class="download-line">
    <a href="index.html" download>⬇️ Download this app (index.html)</a>
  </div>

  <!-- main panel -->
  <div class="panel">
    <h1>🐾 AIJOE</h1>

    <button id="musicBtn">🎵 Music</button>
    <button id="gpsBtn">📍 GPS</button><br>
    <button id="weatherBtn">🌤️ Weather</button>
    <button id="showListBtn">📝 List</button><br>
    <button id="bibleBtn">📖 Verse</button>
    <button id="moodBtn">🎭 Mood</button>

    <div id="log">Ready.</div>
  </div>

  <script src="script.js"></script>
</body>
</html>
 display=m=>document.getElementById('response').innerText=m;document.getElementById('micBtn').onclick=()=>display('Mic pressed');
