// netlify/functions/askAI.js
export default async (req, context) => {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "Sorry, I'm stumped.";
    return Response.json({ answer });
  } catch (err) {
    return Response.json({ answer: "API error: " + err.message });
  }
};
