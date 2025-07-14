// Populate voice list
const voiceSelect = document.getElementById('voiceSelect');
function populateVoices(){
  const voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = voices.map((v,i)=>`<option value="${i}">${v.name} (${v.lang})</option>`).join('');
}
populateVoices();
speechSynthesis.onvoiceschanged = populateVoices;

// Speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec;
if(SpeechRecognition){
  rec = new SpeechRecognition();
  rec.lang = 'en-US';
  rec.interimResults = false;
  rec.onresult = e=>{
    const text = e.results[0][0].transcript;
    displayResponse("You said: " + text);
    speak('You said ' + text);
  };
  rec.onerror = e=>{
    displayResponse('Voice error: ' + e.error);
  };
}else{
  document.getElementById('micBtn').disabled = true;
  displayResponse('Speech Recognition not supported in this browser.');
}

document.getElementById('micBtn').addEventListener('click', ()=>{
  if(rec){
    rec.start();
    displayResponse('Listening...');
  }
});

function speak(text){
  const utter = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const selected = voiceSelect.value;
  if(voices[selected]) utter.voice = voices[selected];
  speechSynthesis.speak(utter);
}

function displayResponse(msg){
  document.getElementById('response').innerText = msg;
}

// Placeholder actions
document.querySelectorAll('.action').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const action = btn.dataset.action;
    displayResponse(action.charAt(0).toUpperCase()+action.slice(1) + ' feature coming soon!');
    speak(action + ' feature coming soon');
  });
});