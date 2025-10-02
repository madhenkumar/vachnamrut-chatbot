import { NextRequest } from "next/server";

const HF_SPACE_URL =
  process.env.HF_SPACE_URL;

export async function POST(request: NextRequest) {
  const { messages }: { messages: Array<{ role: string; parts: any[] }> } =
    await request.json();
  const userMsg = messages.reverse().find((m) => m.role === "user");
  const userText = userMsg?.parts?.[0]?.text;
  if (!userText) {
    return new Response("No user message.", { status: 400 });
  }

  try {
    
    const resp = await fetch(`${HF_SPACE_URL}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: userText }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.error("HF Space Error:", txt);
      return new Response("HF Space error: " + txt, { status: 500 });
    }

    const data = await resp.json();
    
    const answer: string = data.answer || "No answer.";
    
    
   
   const encoder = new TextEncoder();
const stream = new ReadableStream({
  async start(controller) {
    const words = answer.split(" ");
    let id = Date.now().toString();

    for (let i = 0; i < words.length; i++) {
      const chunk = {
        type: "message",
        message: {
          id,
          role: "assistant" as const,
          parts: [
            {
              type: "text" as const,
              text: words.slice(0, i + 1).join(" "),
            },
          ],
        },
      };

      controller.enqueue(encoder.encode(JSON.stringify(chunk) + "\n"));
      await new Promise((r) => setTimeout(r, 40));
    }

    controller.close();
  },
});



    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson",
      },
    });
  } catch (err: any) {
    console.error("Proxy error:", err);
    return new Response("Server error: " + err.message, { status: 500 });
  }
}
