<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
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
