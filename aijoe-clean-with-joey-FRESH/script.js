function startListening() {
  document.getElementById("response").textContent = "🎙️ Listening...";
}

function stopListening() {
  document.getElementById("response").textContent = "🛑 Stopped.";
}

function getBibleVerse() {
  document.getElementById("response").textContent = "📖 For God so loved the world... (John 3:16)";
}
