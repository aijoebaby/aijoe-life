
function sendText() {
  const input = document.getElementById('textInput').value;
  document.getElementById('response').innerText = "AIJOE heard: " + input;
}

document.getElementById('micBtn').addEventListener('click',()=>{
  const rec=new (window.SpeechRecognition||window.webkitSpeechRecognition)();
  rec.lang='en-US';rec.start();
  rec.onresult=e=>document.getElementById('response').innerText="AIJOE heard: "+e.results[0][0].transcript;
  rec.onerror=e=>document.getElementById('response').innerText="Voice error: "+e.error;
});
