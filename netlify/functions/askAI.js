export default async (req, context) => {
  try {
    const { prompt } = await req.json();
    const key = process.env.OPENAI_API_KEY;
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers:{ "Content-Type":"application/json","Authorization":`Bearer ${key}` },
      body:JSON.stringify({ model:"gpt-4o-mini", messages:[{role:"user",content:prompt}], max_tokens:150 })
    });
    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content || "Sorry, I'm stumped.";
    return Response.json({ answer });
  } catch(e){
    return Response.json({ answer:'AI error: '+e.message });
  }
};