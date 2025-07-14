// Populate voices
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
    askAI(text);
  };
  rec.onerror = e=>displayResponse('Voice error: '+e.error);
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

// Netlify Function call to OpenAI
async function askAI(question){
  displayResponse('Thinking...');
  try{
    const res = await fetch('/.netlify/functions/askAI', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({prompt:question})
    });
    const data = await res.json();
    const answer = data.answer || 'Sorry, I cannot answer that.';
    displayResponse(answer);
    speak(answer);
  }catch(err){
    displayResponse('Error contacting AI.');
    console.error(err);
  }
}

// Placeholder buttons
document.querySelectorAll('.action').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const action = btn.dataset.action;
    askAI('Please help with ' + action);
  });
});