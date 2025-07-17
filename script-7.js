window.onload = function() {
  const message = "This is AIJOE";
  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = "en-US";
  speech.pitch = 1;
  speech.rate = 1;
  speech.volume = 1;
  speechSynthesis.speak(speech);
};